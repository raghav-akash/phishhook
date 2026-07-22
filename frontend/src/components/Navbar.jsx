import { ShieldCheck } from "lucide-react";

function Navbar() {
    return (
        <header className="border-b border-slate-800 bg-slate-950">

            <div className="max-w-7xl mx-auto px-8 py-6">

                <div className="flex items-center gap-4">

                    <div className="p-3 rounded-xl bg-blue-600/20 border border-blue-500">

                        <ShieldCheck
                            size={34}
                            className="text-blue-400"
                        />

                    </div>

                    <div>

                        <h1 className="text-4xl font-bold text-white">
                            PhishHook AI
                        </h1>

                        <p className="text-slate-400 mt-1">
                            Real-Time Phishing Detection Dashboard
                        </p>

                    </div>

                </div>

            </div>

        </header>
    );
}

export default Navbar;