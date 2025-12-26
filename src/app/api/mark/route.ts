import OpenAI from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";
import { loadCase } from "@/lib/loadCase";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MarkSchema = z.object({
  overall_score_0_100: z.number().min(0).max(100),
  domain_scores: z.object({
    safety: z.number().min(0).max(100),
    structure: z.number().min(0).max(100),
    judgement: z.number().min(0).max(100),
    knowledge: z.number().min(0).max(100),
  }),
  strengths: z.array(z.string()).min(1).max(6),
  missed_key_points: z.array(z.string()).min(0).max(12),
  unsafe_moments: z.array(z.string()).min(0).max(6),
  next_drills: z.array(z.string()).min(1).max(6),
});

export async function POST(req: Request) {
  const { caseId, transcript } = await req.json();
  const c = await loadCase(caseId);

  const response = await client.responses.parse({
    model: "gpt-4o-2024-08-06",
    input: [
      {
        role: "system",
        content:
          "You are an FRCS Tr&Orth Section 2 examiner/marker. Mark strictly but fairly. Output must match schema.",
      },
      {
        role: "user",
        content: [
          `CASE TITLE: ${c.title}`,
          `CASE STEM: ${c.stem}`,
          `EXPECTED KEY POINTS: ${c.expected_points.join(" | ")}`,
          `RUBRIC WEIGHTS: ${JSON.stringify(c.rubric_weights)}`,
          `CANDIDATE TRANSCRIPT: ${transcript}`,
        ].join("\n\n"),
      },
    ],
    text: { format: zodTextFormat(MarkSchema, "mark") },
  });

  return Response.json(response.output_parsed);
}
