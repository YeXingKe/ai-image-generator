import "server-only";

/** Server-only env access. Never import from client components. */
export function getServerEnv() {
  return {
    databaseUrl: process.env.DATABASE_URL ?? "",
    hunyuanApiKey: process.env.HUNYUAN_API_KEY ?? "",
    openaiApiKey: process.env.OPENAI_API_KEY ?? "",
  };
}
