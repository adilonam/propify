import { WhopClient, WhopError } from "@whop/sdk"

let client: WhopClient | null = null

export function getWhopClient(): WhopClient {
  const token = process.env.WHOP_API_KEY
  if (!token) {
    throw new Error("WHOP_API_KEY is not set")
  }

  if (!client) {
    const baseUrl = process.env.WHOP_API_BASE_URL
    client = new WhopClient({
      token,
      ...(baseUrl ? { baseUrl } : {}),
    })
  }

  return client
}

/** Whop company / account id, prefixed `biz_`. */
export function getWhopCompanyId(): string {
  const companyId = process.env.WHOP_COMPANY_ID
  if (!companyId) {
    throw new Error("WHOP_COMPANY_ID is not set")
  }
  return companyId
}

export function getWhopWebhookSecret(): string | undefined {
  return process.env.WHOP_WEBHOOK_SECRET || undefined
}

export function isWhopConfigured(): boolean {
  return Boolean(process.env.WHOP_API_KEY && process.env.WHOP_COMPANY_ID)
}

/** Logs the underlying Whop/API error to the server terminal without exposing it to clients. */
export function logWhopError(context: string, error: unknown): void {
  if (error instanceof WhopError) {
    console.error(`[whop] ${context}`, {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      body: error.body,
      requestId: error.requestId,
      cause: error.cause,
      stack: error.stack,
    })
    return
  }

  if (error instanceof Error) {
    console.error(`[whop] ${context}`, {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })
    return
  }

  console.error(`[whop] ${context}`, error)
}
