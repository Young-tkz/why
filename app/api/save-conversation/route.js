import { supabase } from "@/lib/supabase";

export async function POST(req) {
    try {
        const { conversation, remark } = await req.json();

        const { data, error } = await supabase
            .from("conversations")
            .insert([
                {
                    answers: conversation,
                    remark,
                },
            ])
            .select();

        if (error) {
            throw error;
        }

        return Response.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
