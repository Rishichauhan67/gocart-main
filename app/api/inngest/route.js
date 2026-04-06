import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { syncUserCreation, syncUserUpdation, syncUserDeletion } from "@/inngest/functions";

const handler = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion
  ],
});

export const GET = handler;
export const POST = handler;
export const PUT = handler;

export const runtime = "nodejs";