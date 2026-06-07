import db from "@/lib/db";

export async function GET() {
    try {
        const conversations = db
            .prepare(`
        SELECT *
        FROM conversations
        ORDER BY created_at DESC
      `)
            .all();

        return Response.json(conversations);
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to fetch conversations" },
            { status: 500 }
        );
    }
}