import { WhopClient, WhopError } from "@whop/sdk"

let client: WhopClient | null = null

export function getWhopClient(): WhopClient {
  const token = process.env.WHOP_API_KEY
  if (!token) {
    throw new Error("WHOP_API_KEY is not set")
  }

  if (!client) {
    client = new WhopClient({
      token,
      ...(process.env.WHOP_API_BASE_URL
        ? { baseUrl: process.env.WHOP_API_BASE_URL }
        : {}),
    })
  }

  return client
}

export function getWhopWebhookSecret(): string | undefined {
  return process.env.WHOP_WEBHOOK_SECRET || undefined
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
