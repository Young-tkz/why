"use client";

import { useEffect, useState } from "react";

export default function ResultPage() {
    const [remark, setRemark] = useState("");

    useEffect(() => {
        const saved = sessionStorage.getItem("finalRemark");

        if (saved) {
            setRemark(saved);
        }
    }, []);

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <div className="max-w-2xl w-full">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                    <h1 className="text-3xl font-bold mb-6">
                        Insight
                    </h1>

                    <p className="text-lg text-zinc-300 leading-relaxed">
                        {remark}
                    </p>
                </div>
            </div>
        </main>
    );
}