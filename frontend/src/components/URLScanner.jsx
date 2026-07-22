import { useState } from "react";

function URLScanner({ onScan }) {
    const [url, setUrl] = useState("");

    return (
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl shadow-xl p-6 mt-6 text-white">

            <h2 className="text-2xl font-semibold mb-4">
                Scan URL
            </h2>

            <div className="flex gap-3">

                <input
                    className="
                    flex-1
                    bg-slate-800
                    border
                    border-slate-700
                    rounded-lg
                    p-3
                    text-white
                    placeholder:text-slate-400
                    "
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <button
                    onClick={() => onScan(url)}
                    className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    font-semibold
                    px-6
                    rounded-lg
                    transition
                    duration-200
                    "
                >
                    Scan
                </button>

            </div>

        </div>
    );
}

export default URLScanner;