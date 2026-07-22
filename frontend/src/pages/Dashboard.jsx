import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import URLScanner from "../components/URLScanner";
import PredictionCard from "../components/PredictionCard";
import ExplainabilityCard from "../components/ExplainabilityCard";
import HistoryTable from "../components/HistoryTable";
import Loader from "../components/Loader";

import { scanURL, getHistory } from "../services/api";

function Dashboard() {
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const [riskFilter, setRiskFilter] = useState("");
    const [predictionFilter, setPredictionFilter] = useState("");

    const loadHistory = async () => {
        try {
            const data = await getHistory(
                20,
                0,
                riskFilter,
                predictionFilter
            );

            setHistory(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadHistory();
    }, [riskFilter, predictionFilter]);

    const handleScan = async (url) => {
        try {
            setLoading(true);

            const response = await scanURL(url);

            setResult(response);

            await loadHistory();
        } catch (err) {
            console.error(err);
            alert("Unable to scan URL.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <div className="max-w-7xl mx-auto px-8 py-8">

                <StatsCards history={history} />

                <div className="mt-8">
                    <URLScanner onScan={handleScan} />
                </div>

                {loading && <Loader />}

                {!loading && result && (
                    <>
                        <PredictionCard result={result} />
                        <ExplainabilityCard result={result} />
                    </>
                )}

                <div className="flex gap-4 mt-8">

                    <select
                        className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
                        value={riskFilter}
                        onChange={(e) => setRiskFilter(e.target.value)}
                    >
                        <option value="">All Risks</option>
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>

                    <select
                        className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
                        value={predictionFilter}
                        onChange={(e) => setPredictionFilter(e.target.value)}
                    >
                        <option value="">All Predictions</option>
                        <option value="legitimate">Legitimate</option>
                        <option value="phishing">Phishing</option>
                    </select>

                </div>

                <HistoryTable history={history} />

            </div>

        </div>
    );
}

export default Dashboard;