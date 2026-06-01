"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type ChallengeInfoItem = {
  id: string
  stepNumber: number
  profitTargetPercent: string
  dailyLossPercent: string
  maxLossPercent: string
  minTradingDays: number
}

type ChallengeItem = {
  id: string
  title: string
  accountSize: number
  fee: string
  currency: string
  isPopular: boolean
  isBestChoice: boolean
  isActive: boolean
  sortOrder: number
  challengeInfos: ChallengeInfoItem[]
}

type ChallengeFormStep = {
  profitTargetPercent: string
  dailyLossPercent: string
  maxLossPercent: string
  minTradingDays: string
}

type ChallengeForm = {
  title: string
  accountSize: string
  fee: string
  currency: string
  isPopular: boolean
  isBestChoice: boolean
  isActive: boolean
  sortOrder: string
  step1: ChallengeFormStep
  step2: ChallengeFormStep
}

const INITIAL_FORM: ChallengeForm = {
  title: "",
  accountSize: "",
  fee: "",
  currency: "EUR",
  isPopular: false,
  isBestChoice: false,
  isActive: true,
  sortOrder: "0",
  step1: {
    profitTargetPercent: "10",
    dailyLossPercent: "5",
    maxLossPercent: "10",
    minTradingDays: "4",
  },
  step2: {
    profitTargetPercent: "5",
    dailyLossPercent: "5",
    maxLossPercent: "10",
    minTradingDays: "4",
  },
}

function formatFee(fee: string, currency: string): string {
  const amount = Number(fee)
  const symbol = currency === "EUR" ? "EUR" : currency
  return `${amount.toFixed(2)} ${symbol}`
}

export function ChallengesAdminClient() {
  const [items, setItems] = React.useState<ChallengeItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<ChallengeForm>(INITIAL_FORM)

  const loadChallenges = React.useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/challenges", { cache: "no-store" })
      if (!res.ok) {
        throw new Error("Failed to load challenges")
      }
      const data = (await res.json()) as ChallengeItem[]
      setItems(data)
    } catch {
      setError("Impossible de charger les challenges.")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void loadChallenges()
  }, [loadChallenges])

  function resetForm() {
    setForm(INITIAL_FORM)
    setEditingId(null)
    setError(null)
  }

  function fillFormFromChallenge(challenge: ChallengeItem) {
    const step1 =
      challenge.challengeInfos.find((info) => info.stepNumber === 1) ??
      challenge.challengeInfos[0]
    const step2 =
      challenge.challengeInfos.find((info) => info.stepNumber === 2) ??
      challenge.challengeInfos[1]

    setForm({
      title: challenge.title,
      accountSize: String(challenge.accountSize),
      fee: challenge.fee,
      currency: challenge.currency,
      isPopular: challenge.isPopular,
      isBestChoice: challenge.isBestChoice,
      isActive: challenge.isActive,
      sortOrder: String(challenge.sortOrder),
      step1: {
        profitTargetPercent: step1 ? step1.profitTargetPercent : "10",
        dailyLossPercent: step1 ? step1.dailyLossPercent : "5",
        maxLossPercent: step1 ? step1.maxLossPercent : "10",
        minTradingDays: step1 ? String(step1.minTradingDays) : "4",
      },
      step2: {
        profitTargetPercent: step2 ? step2.profitTargetPercent : "5",
        dailyLossPercent: step2 ? step2.dailyLossPercent : "5",
        maxLossPercent: step2 ? step2.maxLossPercent : "10",
        minTradingDays: step2 ? String(step2.minTradingDays) : "4",
      },
    })
    setEditingId(challenge.id)
    setError(null)
  }

  function onChangeField<K extends keyof ChallengeForm>(key: K, value: ChallengeForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function onChangeStep(
    step: "step1" | "step2",
    key: keyof ChallengeFormStep,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [key]: value,
      },
    }))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      title: form.title.trim(),
      accountSize: Number(form.accountSize),
      fee: Number(form.fee),
      currency: form.currency.trim().toUpperCase(),
      isPopular: form.isPopular,
      isBestChoice: form.isBestChoice,
      isActive: form.isActive,
      sortOrder: Number(form.sortOrder),
      steps: [
        {
          stepNumber: 1,
          profitTargetPercent: Number(form.step1.profitTargetPercent),
          dailyLossPercent: Number(form.step1.dailyLossPercent),
          maxLossPercent: Number(form.step1.maxLossPercent),
          minTradingDays: Number(form.step1.minTradingDays),
        },
        {
          stepNumber: 2,
          profitTargetPercent: Number(form.step2.profitTargetPercent),
          dailyLossPercent: Number(form.step2.dailyLossPercent),
          maxLossPercent: Number(form.step2.maxLossPercent),
          minTradingDays: Number(form.step2.minTradingDays),
        },
      ],
    }

    try {
      const method = editingId ? "PATCH" : "POST"
      const body = editingId ? { id: editingId, ...payload } : payload

      const res = await fetch("/api/admin/challenges", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        throw new Error("Request failed")
      }

      await loadChallenges()
      resetForm()
    } catch {
      setError("Impossible de sauvegarder le challenge.")
    } finally {
      setSaving(false)
    }
  }

  async function onDelete(id: string) {
    const confirmed = window.confirm("Supprimer ce challenge et ses informations ?")
    if (!confirmed) {
      return
    }

    setSaving(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/challenges", {
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

      await loadChallenges()
    } catch {
      setError("Impossible de supprimer le challenge.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-bold text-on-surface md:text-4xl">
          Challenges Admin
        </h1>
        <p className="text-on-surface-variant">
          Creer, modifier et supprimer les challenges et leurs informations de step.
        </p>
      </header>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} className="card space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-label text-lg font-bold text-on-surface">
            {editingId ? "Modifier un challenge" : "Nouveau challenge"}
          </h2>
          <Button variant="ghost" onClick={resetForm} type="button">
            Reinitialiser
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <label className="space-y-2 text-sm">
            <span className="text-on-surface-variant">Titre</span>
            <Input
              value={form.title}
              onChange={(e) => onChangeField("title", e.target.value)}
              placeholder="10K Challenge"
              required
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-on-surface-variant">Account size</span>
            <Input
              type="number"
              value={form.accountSize}
              onChange={(e) => onChangeField("accountSize", e.target.value)}
              placeholder="10000"
              required
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-on-surface-variant">Fee</span>
            <Input
              type="number"
              step="0.01"
              value={form.fee}
              onChange={(e) => onChangeField("fee", e.target.value)}
              placeholder="89.00"
              required
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-on-surface-variant">Currency</span>
            <Input
              value={form.currency}
              onChange={(e) => onChangeField("currency", e.target.value.toUpperCase())}
              placeholder="EUR"
              required
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-on-surface-variant">Sort order</span>
            <Input
              type="number"
              value={form.sortOrder}
              onChange={(e) => onChangeField("sortOrder", e.target.value)}
              required
            />
          </label>

          <label className="flex items-center gap-2 pt-8 text-sm text-on-surface-variant">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => onChangeField("isActive", e.target.checked)}
            />
            Active
          </label>

          <label className="flex items-center gap-2 pt-8 text-sm text-on-surface-variant">
            <input
              type="checkbox"
              checked={form.isPopular}
              onChange={(e) => onChangeField("isPopular", e.target.checked)}
            />
            Popular
          </label>

          <label className="flex items-center gap-2 pt-8 text-sm text-on-surface-variant">
            <input
              type="checkbox"
              checked={form.isBestChoice}
              onChange={(e) => onChangeField("isBestChoice", e.target.checked)}
            />
            Best choice
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {([
            { key: "step1", label: "Step 1" },
            { key: "step2", label: "Step 2" },
          ] as const).map((stepConfig) => {
            const step = form[stepConfig.key]

            return (
              <div key={stepConfig.key} className="rounded-lg border border-outline-variant p-4">
                <h3 className="mb-3 font-label text-sm font-bold text-on-surface">
                  {stepConfig.label}
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="space-y-1 text-sm">
                    <span className="text-on-surface-variant">Profit target %</span>
                    <Input
                      type="number"
                      step="0.01"
                      value={step.profitTargetPercent}
                      onChange={(e) =>
                        onChangeStep(stepConfig.key, "profitTargetPercent", e.target.value)
                      }
                      required
                    />
                  </label>

                  <label className="space-y-1 text-sm">
                    <span className="text-on-surface-variant">Daily loss %</span>
                    <Input
                      type="number"
                      step="0.01"
                      value={step.dailyLossPercent}
                      onChange={(e) =>
                        onChangeStep(stepConfig.key, "dailyLossPercent", e.target.value)
                      }
                      required
                    />
                  </label>

                  <label className="space-y-1 text-sm">
                    <span className="text-on-surface-variant">Max loss %</span>
                    <Input
                      type="number"
                      step="0.01"
                      value={step.maxLossPercent}
                      onChange={(e) =>
                        onChangeStep(stepConfig.key, "maxLossPercent", e.target.value)
                      }
                      required
                    />
                  </label>

                  <label className="space-y-1 text-sm">
                    <span className="text-on-surface-variant">Min trading days</span>
                    <Input
                      type="number"
                      value={step.minTradingDays}
                      onChange={(e) =>
                        onChangeStep(stepConfig.key, "minTradingDays", e.target.value)
                      }
                      required
                    />
                  </label>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Sauvegarde..." : editingId ? "Mettre a jour" : "Creer challenge"}
          </Button>
          {editingId && (
            <Button variant="outline" type="button" onClick={resetForm}>
              Annuler edition
            </Button>
          )}
        </div>
      </form>

      <section className="space-y-4">
        <h2 className="font-label text-lg font-bold text-on-surface">
          Challenges existants
        </h2>

        {loading ? (
          <div className="card p-6 text-on-surface-variant">Chargement...</div>
        ) : items.length === 0 ? (
          <div className="card p-6 text-on-surface-variant">Aucun challenge.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {items.map((challenge) => (
              <article
                key={challenge.id}
                className={cn(
                  "card space-y-4 p-5",
                  editingId === challenge.id && "border-primary"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-on-surface">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      {challenge.accountSize.toLocaleString("fr-FR")} - {formatFee(challenge.fee, challenge.currency)}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Sort: {challenge.sortOrder} | Active: {challenge.isActive ? "Oui" : "Non"} | Popular: {challenge.isPopular ? "Oui" : "Non"} | Best: {challenge.isBestChoice ? "Oui" : "Non"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => fillFormFromChallenge(challenge)}
                      disabled={saving}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => {
                        void onDelete(challenge.id)
                      }}
                      disabled={saving}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {challenge.challengeInfos.map((info) => (
                    <div key={info.id} className="rounded-lg border border-outline-variant p-3 text-sm">
                      <p className="font-semibold text-on-surface">Step {info.stepNumber}</p>
                      <p className="text-on-surface-variant">Target: {info.profitTargetPercent}%</p>
                      <p className="text-on-surface-variant">Daily: {info.dailyLossPercent}%</p>
                      <p className="text-on-surface-variant">Max: {info.maxLossPercent}%</p>
                      <p className="text-on-surface-variant">Days: {info.minTradingDays}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  )
}
