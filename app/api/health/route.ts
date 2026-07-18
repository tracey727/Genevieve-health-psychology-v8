import { databaseMode } from "@/lib/database";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    ok: true,
    app: "GENEVIEVE HEALTH Irene Psychology Practice Safety Demo",
    build: "2026.07.18.8-vercel",
    demoMode: process.env.GENEVIEVE_DEMO_MODE !== "false",
    storage: databaseMode(),
  });
}
