"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await fetch(
                "/api/conversations"
            );

            const data = await response.json();

            setConversations(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-bold mb-2">
                    Dashboard
                </h1>

                <p className="text-zinc-500 mb-10">
                    Total Conversations: {conversations.length}
                </p>

                {loading ? (
                    <p>Loading...</p>
                ) : conversations.length === 0 ? (
                    <p>No conversations yet.</p>
                ) : (
                    <div className="space-y-8">
                        {conversations.map((item) => {
                            const answers = item.answers
                                );

                            return (
                                <div
                                    key={item.id}
                                    className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                                >
                                    <div className="flex justify-between mb-6">
                                        <h2 className="text-xl font-semibold">
                                            Conversation #{item.id}
                                        </h2>

                                        <span className="text-zinc-500 text-sm">
                                            {item.created_at}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        {answers.map(
                                            (
                                                qa,
                                                index
                                            ) => (
                                                <div
                                                    key={
                                                        index
                                                    }
                                                >
                                                    <p className="font-semibold text-white">
                                                        {
                                                            qa.question
                                                        }
                                                    </p>

                                                    <p className="text-zinc-400 mt-1">
                                                        {
                                                            qa.answer
                                                        }
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    <div className="mt-8 border-t border-zinc-800 pt-6">
                                        <h3 className="font-semibold mb-2">
                                            Final Insight
                                        </h3>

                                        <p className="text-zinc-300">
                                            {
                                                item.remark
                                            }
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
