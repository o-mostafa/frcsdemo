export type StationState = {
  stationId: string;
  caseId: string;
  startedAt: number;
  qIndex: number;
  transcript: string[];
};

export const stationStore = new Map<string, StationState>();

