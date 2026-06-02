"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type UserRole = "USER" | "ADMIN"

type AdminUser = {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
  ordersCount: number
}

type UserForm = {
  name: string
  email: string
  role: UserRole
  password: string
}

const INITIAL_FORM: UserForm = {
  name: "",
  email: "",
  role: "USER",
  password: "",
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function UsersAdminClient() {
  const [items, setItems] = React.useState<AdminUser[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<UserForm>(INITIAL_FORM)

  const loadUsers = React.useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed to load users")
      }
      const data = (await res.json()) as AdminUser[]
      setItems(data)
    } catch {
      setError("Impossible de charger les utilisateurs.")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void loadUsers()
  }, [loadUsers])

  function resetForm() {
    setForm(INITIAL_FORM)
    setEditingId(null)
  }

  function closeDialog() {
    setIsDialogOpen(false)
    setSaving(false)
    setError(null)
  }

  function openCreateDialog() {
    resetForm()
    setError(null)
    setIsDialogOpen(true)
  }

  function openEditDialog(user: AdminUser) {
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
    })
    setEditingId(user.id)
    setError(null)
    setIsDialogOpen(true)
  }

  function onChangeField<K extends keyof UserForm>(key: K, value: UserForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    const trimmedPassword = form.password.trim()
    const basePayload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role,
    }

    const payload = editingId
      ? {
          id: editingId,
          ...basePayload,
          ...(trimmedPassword ? { password: trimmedPassword } : {}),
        }
      : {
          ...basePayload,
          password: trimmedPassword,
        }

    try {
      const method = editingId ? "PATCH" : "POST"
      const res = await fetch("/api/admin/users", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? "Request failed")
      }

      await loadUsers()
      closeDialog()
      resetForm()
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : null
      setError(message ?? "Impossible de sauvegarder l'utilisateur.")
    } finally {
      setSaving(false)
    }
  }

  async function onDelete(user: AdminUser) {
    const confirmed = window.confirm(`Supprimer l'utilisateur ${user.email} ?`)
    if (!confirmed) {
      return
    }

    setSaving(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id }),
      })

      if (!res.ok) {
        const data = (await res.json()) as { error?: string }
        throw new Error(data.error ?? "Delete failed")
      }

      if (editingId === user.id) {
        resetForm()
      }

      await loadUsers()
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : null
      setError(message ?? "Impossible de supprimer l'utilisateur.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="space-y-8">
      <header className="flex items-center justify-between gap-3">
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-bold text-on-surface md:text-4xl">
            Users Admin
          </h1>
          <p className="text-on-surface-variant">
            Creer, modifier et supprimer les utilisateurs.
          </p>
        </div>
        <Button onClick={openCreateDialog}>Nouvel utilisateur</Button>
      </header>

      {error && !isDialogOpen && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Modifier un utilisateur" : "Nouvel utilisateur"}
            </DialogTitle>
            <DialogDescription>
              Renseignez les informations du compte. Laissez le mot de passe vide pour ne
              pas le modifier en edition.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="text-on-surface-variant">Nom</span>
                <Input
                  value={form.name}
                  onChange={(e) => onChangeField("name", e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="text-on-surface-variant">Email</span>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => onChangeField("email", e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="text-on-surface-variant">Role</span>
                <select
                  value={form.role}
                  onChange={(e) => onChangeField("role", e.target.value as UserRole)}
                  className={cn(
                    "w-full rounded-lg border border-outline-variant bg-surface-container-high px-4 py-3 text-sm text-on-surface",
                    "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  )}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </label>

              <label className="space-y-2 text-sm">
                <span className="text-on-surface-variant">
                  {editingId ? "Nouveau mot de passe" : "Mot de passe"}
                </span>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => onChangeField("password", e.target.value)}
                  minLength={editingId ? undefined : 6}
                  required={!editingId}
                />
              </label>
            </div>

            <DialogFooter className="justify-end">
              <Button variant="ghost" onClick={closeDialog} disabled={saving}>
                Annuler
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Sauvegarde..." : editingId ? "Mettre a jour" : "Creer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full min-w-[760px] divide-y divide-outline-variant text-sm">
            <thead>
              <tr className="text-left text-on-surface-variant">
                <th className="px-4 py-3 font-label font-semibold">Name</th>
                <th className="px-4 py-3 font-label font-semibold">Email</th>
                <th className="px-4 py-3 font-label font-semibold">Role</th>
                <th className="px-4 py-3 font-label font-semibold">Orders</th>
                <th className="px-4 py-3 font-label font-semibold">Created</th>
                <th className="px-4 py-3 font-label font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {items.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-high/40">
                  <td className="px-4 py-3 text-on-surface">{user.name}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold",
                        user.role === "ADMIN"
                          ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
                          : "border-outline-variant text-on-surface-variant"
                      )}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">{user.ordersCount}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{formatDate(user.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="px-3 py-1 text-xs"
                        onClick={() => openEditDialog(user)}
                        disabled={saving}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="ghost"
                        className="px-3 py-1 text-xs text-red-300 hover:text-red-200"
                        onClick={() => onDelete(user)}
                        disabled={saving}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {items.length === 0 && (
            <div className="px-6 py-10 text-center text-sm text-on-surface-variant">
              Aucun utilisateur trouve.
            </div>
          )}
        </div>
      )}
    </section>
  )
}
