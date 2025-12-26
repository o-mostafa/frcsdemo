import { stationStore } from "../store";
import { randomUUID } from "crypto";
import { TRAUMA_ANKLE_001 } from "@/frcs/cases/TRAUMA_ANKLE_001";

export async function POST() {
  const stationId = randomUUID();
  stationStore.set(stationId, {
    stationId,
    caseId: TRAUMA_ANKLE_001.caseId,
    startedAt: Date.now(),
    qIndex: 0,
    transcript: [],
  });

  return Response.json({
    stationId,
    case: {
      title: TRAUMA_ANKLE_001.title,
      stem: TRAUMA_ANKLE_001.stem,
      durationSec: TRAUMA_ANKLE_001.durationSec,
    },
  });
}

