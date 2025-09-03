export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/auto", // ✅ safe fallback
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return new Response(
        JSON.stringify({ reply: "⚠️ AI request failed: " + (data.error?.message || "Unknown error") }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const reply = data.choices?.[0]?.message?.content || "⚠️ Empty response from AI.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API Error:", err);
    return new Response(
      JSON.stringify({ reply: "⚠️ Server error talking to AI." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
