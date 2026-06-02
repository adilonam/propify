import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { UserRole } from "@/generated/prisma/client"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
  password: z.string().min(6),
})

const updateUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
  password: z.string().min(6).optional(),
})

const deleteUserSchema = z.object({
  id: z.string().min(1),
})

async function getAdminSession() {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    return null
  }

  return session
}

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return NextResponse.json(
    users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      ordersCount: user._count.orders,
    }))
  )
}

export async function POST(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const parsed = createUserSchema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const data = parsed.data

  const existing = await prisma.user.findUnique({
    where: { email: data.email.toLowerCase() },
    select: { id: true },
  })

  if (existing) {
    return NextResponse.json({ error: "Email already used" }, { status: 409 })
  }

  const hashedPassword = await bcrypt.hash(data.password, 12)

  const created = await prisma.user.create({
    data: {
      name: data.name.trim(),
      email: data.email.toLowerCase(),
      role: data.role,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
  })

  return NextResponse.json({
    id: created.id,
    name: created.name,
    email: created.email,
    role: created.role,
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString(),
    ordersCount: created._count.orders,
  })
}

export async function PATCH(req: NextRequest) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const parsed = updateUserSchema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const { id, ...data } = parsed.data

  const existing = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true },
  })

  if (!existing) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const normalizedEmail = data.email.toLowerCase()

  if (normalizedEmail !== existing.email) {
    const emailOwner = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    })

    if (emailOwner) {
      return NextResponse.json({ error: "Email already used" }, { status: 409 })
    }
  }

  const updateData: {
    name: string
    email: string
    role: UserRole
    password?: string
  } = {
    name: data.name.trim(),
    email: normalizedEmail,
    role: data.role,
  }

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 12)
  }

  const updated = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
  })

  return NextResponse.json({
    id: updated.id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
    ordersCount: updated._count.orders,
  })
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const parsed = deleteUserSchema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const { id } = parsed.data

  if (session.user.id === id) {
    return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 })
  }

  try {
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
