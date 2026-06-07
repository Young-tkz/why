import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
    try {
        const { conversation } = await req.json();

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `
You are an insightful observer.

Analyze the user's answers and provide ONE thoughtful remark.

Rules:
- Maximum 120 words.
- No bullet points.
- No headings.
- No percentages.
- No confidence scores.
- No therapy language.
- Sound thoughtful and human.
- Give a balanced perspective.
- Return only the remark.
          `,
                },
                {
                    role: "user",
                    content: JSON.stringify(conversation),
                },
            ],
            temperature: 0.8,
        });

        const remark =
            completion.choices[0]?.message?.content ||
            "There may be more uncertainty than conflict here, and a direct conversation could bring clarity.";

        return Response.json({
            remark,
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                error: "Failed to generate remark",
            },
            {
                status: 500,
            }
        );
    }
}