import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
    try {
        const { conversation, step } = await req.json();

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `
You are helping a user understand a friendship or relationship situation.

Rules:
- Ask ONLY one follow-up question.
- Keep it under 20 words.
- Be conversational.
- Do not give advice.
- Do not explain your reasoning.
- Question number ${step + 1} out of 5.
`,
                },
                {
                    role: "user",
                    content: JSON.stringify(conversation),
                },
            ],
            temperature: 0.8,
        });

        const question =
            completion.choices[0]?.message?.content ||
            "Can you tell me more?";

        return Response.json({
            question,
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                error: "Failed to generate question",
            },
            {
                status: 500,
            }
        );
    }
}