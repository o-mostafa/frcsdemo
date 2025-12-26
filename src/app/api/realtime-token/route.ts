export async function POST() {
  const r = await fetch("https://api.openai.com/v1/realtime/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-realtime",
      modalities: ["audio", "text"],
      instructions:
        "You are an FRCS Tr&Orth examiner. Ask one question at a time. No teaching unless asked.",
    }),
  });

  if (!r.ok) {
    return new Response(await r.text(), { status: 500 });
  }

  const data = await r.json();
  return Response.json({ client_secret: data.client_secret.value });
}
