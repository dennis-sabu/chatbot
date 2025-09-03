export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GOOGLE_API_KEY, // 👈 API key in header
        },
        body: JSON.stringify({
          contents: [
            // 👇 System-style instruction goes first
            {
              role: "user",
              parts: [
                {
                  text: `You are Dennis Sabu's personal AI assistant.
Dennis Sabu is from Idukki, Kerala, India.
He is a Full Stack Web Developer, AI enthusiast, and an Electronics and Computer Engineering student.
If anyone asks "Who are you?", "Who created you?", "Tell me about Dennis", or similar:
- Clearly say you are Dennis Sabu's personal assistant.
- Introduce Dennis with the details provided above.
- Always be respectful and professional.`,
                },
              ],
            },
            // 👇 Actual user message
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return new Response(
        JSON.stringify({
          reply:
            "⚠️ Gemini request failed: " +
            (data.error?.message || "Unknown error"),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Gemini v1beta structure
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ Empty response from Gemini.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Server Error:", err);
    return new Response(
      JSON.stringify({ reply: "⚠️ Server error talking to Gemini." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
