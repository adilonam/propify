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

type OrderStatus =
  | "PENDING"
  | "WAITING"
  | "CONFIRMING"
  | "CONFIRMED"
  | "SENDING"
  | "PARTIALLY_PAID"
  | "FINISHED"
  | "FAILED"
  | "REFUNDED"
  | "EXPIRED"

type AdminOrder = {
  id: string
  userId: string
  challengeId: string
  stepNumber: number
  amountCents: number
  currency: string
  status: OrderStatus
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
  challenge: {
    id: string
    title: string
    accountSize: number
    currency: string
  }
  payment: {
    id: string
    nowpaymentsId: string | null
    paymentStatus: string | null
    invoiceUrl: string | null
  } | null
}

type AdminUser = {
  id: string
  name: string
  email: string
}

type AdminChallenge = {
  id: string
  title: string
  accountSize: number
  currency: string
}

type OrdersPayload = {
  orders: AdminOrder[]
  users: AdminUser[]
  challenges: AdminChallenge[]
  statuses: OrderStatus[]
}

type OrderForm = {
  userId: string
  challengeId: string
  stepNumber: string
  amountCents: string
  currency: string
  status: OrderStatus
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "En attente",
  WAITING: "En attente de paiement",
  CONFIRMING: "Confirmation",
  CONFIRMED: "Confirme",
  SENDING: "Envoi",
  PARTIALLY_PAID: "Partiellement paye",
  FINISHED: "Termine",
  FAILED: "Echoue",
  REFUNDED: "Rembourse",
  EXPIRED: "Expire",
}

const STATUS_COLOR: Record<OrderStatus, string> = {
  PENDING: "text-on-surface-variant",
  WAITING: "text-yellow-400",
  CONFIRMING: "text-blue-400",
  CONFIRMED: "text-blue-400",
  SENDING: "text-blue-400",
  PARTIALLY_PAID: "text-yellow-400",
  FINISHED: "text-emerald-400",
  FAILED: "text-red-400",
  REFUNDED: "text-orange-400",
  EXPIRED: "text-red-400",
}

const DEFAULT_FORM: OrderForm = {
  userId: "",
  challengeId: "",
  stepNumber: "1",
  amountCents: "0",
  currency: "EUR",
  status: "PENDING",
}

function formatAmount(cents: number, currency: string): string {
  return `${currency} ${(cents / 100).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function formatAccountSize(size: number): string {
  if (size >= 1_000_000) return `${size / 1_000_000}M`
  if (size >= 1_000) return `${size / 1_000}K`
  return String(size)
}

export function OrdersAdminClient() {
  const [orders, setOrders] = React.useState<AdminOrder[]>([])
  const [users, setUsers] = React.useState<AdminUser[]>([])
  const [challenges, setChallenges] = React.useState<AdminChallenge[]>([])
  const [statuses, setStatuses] = React.useState<OrderStatus[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<OrderForm>(DEFAULT_FORM)

  const loadOrders = React.useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed to load orders")
      }

      const data = (await res.json()) as OrdersPayload

      setOrders(data.orders)
      setUsers(data.users)
      setChallenges(data.challenges)
      setStatuses(data.statuses)

      if (data.users.length > 0 && data.challenges.length > 0) {
        setForm((prev) => ({
          ...prev,
          userId: prev.userId || data.users[0].id,
          challengeId: prev.challengeId || data.challenges[0].id,
        }))
      }
    } catch {
      setError("Impossible de charger les commandes.")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void loadOrders()
  }, [loadOrders])

  function resetForm() {
    setForm({
      ...DEFAULT_FORM,
      userId: users[0]?.id ?? "",
      challengeId: challenges[0]?.id ?? "",
      status: statuses[0] ?? "PENDING",
    })
    setEditingId(null)
  }

  function openCreateDialog() {
    resetForm()
    setError(null)
    setIsDialogOpen(true)
  }

  function closeDialog() {
    setIsDialogOpen(false)
    setSaving(false)
    setError(null)
  }

  function onChangeField<K extends keyof OrderForm>(key: K, value: OrderForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function fillForm(order: AdminOrder) {
    setForm({
      userId: order.userId,
      challengeId: order.challengeId,
      stepNumber: String(order.stepNumber),
      amountCents: String(order.amountCents),
      currency: order.currency,
      status: order.status,
    })
    setEditingId(order.id)
    setError(null)
    setIsDialogOpen(true)
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      userId: form.userId,
      challengeId: form.challengeId,
      stepNumber: Number(form.stepNumber),
      amountCents: Number(form.amountCents),
      currency: form.currency.trim().toUpperCase(),
      status: form.status,
    }

    try {
      const method = editingId ? "PATCH" : "POST"
      const body = editingId ? { id: editingId, ...payload } : payload

      const res = await fetch("/api/admin/orders", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        throw new Error("Request failed")
      }

      await loadOrders()
      closeDialog()
      resetForm()
    } catch {
      setError("Impossible de sauvegarder la commande.")
    } finally {
      setSaving(false)
    }
  }

  async function onDelete(id: string) {
    const confirmed = window.confirm("Supprimer cette commande ?")
    if (!confirmed) {
      return
    }

    setSaving(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!res.ok) {
        throw new Error("Delete failed")
      }

      if (editingId === id) {
        resetForm()
      }

      await loadOrders()
    } catch {
      setError("Impossible de supprimer la commande.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="space-y-8">
      <header className="flex items-center justify-between gap-3">
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-bold text-on-surface md:text-4xl">
            Orders Admin
          </h1>
          <p className="text-on-surface-variant">
            Creer, modifier et supprimer les commandes.
          </p>
        </div>

        <Button
          onClick={openCreateDialog}
          disabled={users.length === 0 || challenges.length === 0}
        >
          Nouvelle commande
        </Button>
      </header>

      {error && !isDialogOpen && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Modifier une commande" : "Nouvelle commande"}</DialogTitle>
            <DialogDescription>
              Choisissez l&apos;utilisateur, le challenge et le statut de la commande.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="space-y-2 text-sm">
              <span className="text-on-surface-variant">Utilisateur</span>
              <select
                className="flex h-10 w-full rounded-md border border-outline-variant bg-surface px-3 text-sm text-on-surface"
                value={form.userId}
                onChange={(e) => onChangeField("userId", e.target.value)}
                required
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm">
              <span className="text-on-surface-variant">Challenge</span>
              <select
                className="flex h-10 w-full rounded-md border border-outline-variant bg-surface px-3 text-sm text-on-surface"
                value={form.challengeId}
                onChange={(e) => onChangeField("challengeId", e.target.value)}
                required
              >
                {challenges.map((challenge) => (
                  <option key={challenge.id} value={challenge.id}>
                    {challenge.title} ({formatAccountSize(challenge.accountSize)})
                  </option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="text-on-surface-variant">Step number</span>
                <Input
                  type="number"
                  min="1"
                  value={form.stepNumber}
                  onChange={(e) => onChangeField("stepNumber", e.target.value)}
                  required
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="text-on-surface-variant">Montant (centimes)</span>
                <Input
                  type="number"
                  min="0"
                  value={form.amountCents}
                  onChange={(e) => onChangeField("amountCents", e.target.value)}
                  required
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="text-on-surface-variant">Currency</span>
                <Input
                  value={form.currency}
                  onChange={(e) => onChangeField("currency", e.target.value.toUpperCase())}
                  required
                />
              </label>

              <label className="space-y-2 text-sm">
                <span className="text-on-surface-variant">Status</span>
                <select
                  className="flex h-10 w-full rounded-md border border-outline-variant bg-surface px-3 text-sm text-on-surface"
                  value={form.status}
                  onChange={(e) => onChangeField("status", e.target.value as OrderStatus)}
                  required
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog} disabled={saving}>
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
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : orders.length === 0 ? (
        <section className="card space-y-2 p-6">
          <h2 className="font-label text-lg font-semibold text-on-surface">Aucune commande</h2>
          <p className="text-sm text-on-surface-variant">
            Ajoutez votre premiere commande depuis le bouton en haut.
          </p>
        </section>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order.id} className="card space-y-4 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="font-label text-base font-bold text-on-surface">{order.id}</h2>
                  <p className="text-sm text-on-surface-variant">
                    {order.user.name} ({order.user.email})
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    {order.challenge.title} ({formatAccountSize(order.challenge.accountSize)}) - Step {order.stepNumber}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {new Date(order.createdAt).toLocaleString("fr-FR")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-label text-sm font-bold text-on-surface">
                    {formatAmount(order.amountCents, order.currency)}
                  </p>
                  <p className={cn("font-label text-xs", STATUS_COLOR[order.status])}>
                    {STATUS_LABEL[order.status]}
                  </p>
                  {order.payment?.paymentStatus && (
                    <p className="text-xs text-on-surface-variant">
                      Payment: {order.payment.paymentStatus}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => fillForm(order)} disabled={saving}>
                  Modifier
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500/40 text-red-300 hover:bg-red-500/10"
                  onClick={() => onDelete(order.id)}
                  disabled={saving}
                >
                  Supprimer
                </Button>
                {order.payment?.invoiceUrl && (
                  <a href={order.payment.invoiceUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost">Invoice</Button>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
