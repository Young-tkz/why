"use client";

import { useState } from "react";

export default function ChatPage() {
    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState(null);
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const [conversation, setConversation] = useState([]);

    const [currentQuestion, setCurrentQuestion] =
        useState("Are we okay?");

    const handleContinue = async () => {
        if (loading) return;

        if (!answer.trim() && step > 1) return;

        setLoading(true);

        try {
            // Question 1
            if (step === 1) {
                const q1Answer =
                    selected === "yes" ? "Yes" : "No";

                const updatedConversation = [
                    {
                        question: "Are we okay?",
                        answer: q1Answer,
                    },
                ];

                setConversation(updatedConversation);

                setCurrentQuestion(
                    selected === "yes"
                        ? "Then why did you leave me on seen for 22 hours while posting?"
                        : "What happened?"
                );

                setStep(2);
                return;
            }

            // Save current answer
            const updatedConversation = [
                ...conversation,
                {
                    question: currentQuestion,
                    answer,
                },
            ];

            setConversation(updatedConversation);

            // Finished Q5
            if (step === 5) {
                const response = await fetch(
                    "/api/remark",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            conversation:
                            updatedConversation,
                        }),
                    }
                );

                const data = await response.json();

                // Save to SQLite
                await fetch(
                    "/api/save-conversation",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            conversation:
                            updatedConversation,
                            remark: data.remark,
                        }),
                    }
                );

                // Store for result page
                sessionStorage.setItem(
                    "finalRemark",
                    data.remark
                );

                window.location.href = "/result";

                return;
            }

            // Generate next AI question
            const response = await fetch(
                "/api/question",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        conversation:
                        updatedConversation,
                        step,
                    }),
                }
            );

            const data = await response.json();

            setCurrentQuestion(data.question);

            setAnswer("");

            setStep((prev) => prev + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <div className="w-full max-w-2xl">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                    <p className="text-sm text-zinc-500 mb-4">
                        Question {step} of 5
                    </p>

                    <h1 className="text-3xl font-bold mb-8">
                        {currentQuestion}
                    </h1>

                    {step === 1 ? (
                        <div className="flex gap-4">
                            <button
                                onClick={() =>
                                    setSelected("yes")
                                }
                                className={`px-6 py-3 rounded-xl transition ${
                                    selected === "yes"
                                        ? "bg-white text-black"
                                        : "bg-zinc-800"
                                }`}
                            >
                                Yes
                            </button>

                            <button
                                onClick={() =>
                                    setSelected("no")
                                }
                                className={`px-6 py-3 rounded-xl transition ${
                                    selected === "no"
                                        ? "bg-white text-black"
                                        : "bg-zinc-800"
                                }`}
                            >
                                No
                            </button>

                            <button
                                disabled={
                                    !selected || loading
                                }
                                onClick={
                                    handleContinue
                                }
                                className="ml-auto px-6 py-3 bg-white text-black rounded-xl font-semibold disabled:opacity-50"
                            >
                                {loading
                                    ? "Thinking..."
                                    : "Continue"}
                            </button>
                        </div>
                    ) : (
                        <>
                            <textarea
                                value={answer}
                                onChange={(e) =>
                                    setAnswer(
                                        e.target.value
                                    )
                                }
                                placeholder="Type your answer..."
                                className="w-full h-40 bg-zinc-800 rounded-xl p-4 resize-none outline-none"
                            />

                            <button
                                onClick={
                                    handleContinue
                                }
                                disabled={loading}
                                className="mt-6 px-6 py-3 bg-white text-black rounded-xl font-semibold disabled:opacity-50"
                            >
                                {loading
                                    ? "Thinking..."
                                    : step === 5
                                        ? "Finish"
                                        : "Continue"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}