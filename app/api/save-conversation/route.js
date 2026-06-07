import db from "@/lib/db";

export async function POST(req) {
    try {
        const { conversation, remark } = await req.json();

        const stmt = db.prepare(`
      INSERT INTO conversations
      (answers, remark)
      VALUES (?, ?)
    `);

        const result = stmt.run(
            JSON.stringify(conversation),
            remark
        );

        return Response.json({
            success: true,
            id: result.lastInsertRowid,
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "Failed to save conversation" },
            { status: 500 }
        );
    }
}