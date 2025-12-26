import { stationStore } from "../store";

export async function POST(req: Request) {
  const { stationId } = await req.json();
  const st = stationStore.get(stationId);
  if (!st) return new Response("Unknown station", { status: 404 });

  return Response.json({ transcript: st.transcript.join("\n") });
}

