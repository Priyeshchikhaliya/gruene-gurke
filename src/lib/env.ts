import { z } from "zod";

/**
 * Server-only environment. Parsed lazily so `next build` succeeds without
 * secrets; a clear error is thrown the first time a server action needs them.
 */
const serverSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().min(3).default("Grüne Gurke <onboarding@resend.dev>"),
  RESTAURANT_INBOX_EMAIL: z.email(),
});

export type ServerEnv = z.infer<typeof serverSchema>;

let cached: ServerEnv | undefined;

export function serverEnv(): ServerEnv {
  if (cached) return cached;
  const result = serverSchema.safeParse(process.env);
  if (!result.success) {
    const missing = Object.keys(z.flattenError(result.error).fieldErrors);
    throw new Error(
      `Missing or invalid environment variables: ${missing.join(", ")}. See .env.example.`,
    );
  }
  cached = result.data;
  return cached;
}
