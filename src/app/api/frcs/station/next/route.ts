import { stationStore } from "../store";
import { TRAUMA_ANKLE_001 } from "@/frcs/cases/TRAUMA_ANKLE_001";

export async function POST(req: Request) {
  const { stationId, candidateUtterance } = await req.json();

  const st = stationStore.get(stationId);
  if (!st) return new Response("Unknown station", { status: 404 });

  if (candidateUtterance) st.transcript.push(`CANDIDATE: ${candidateUtterance}`);

  const allQs = TRAUMA_ANKLE_001.blocks.flatMap(b => b.questions);
  const question = allQs[st.qIndex] ?? "Summarise your plan and key risks.";
  st.qIndex += 1;

  stationStore.set(stationId, st);
  return Response.json({ question });
}

