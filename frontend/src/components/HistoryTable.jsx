function HistoryTable({ history }) {
    const riskBadge = {
        LOW: "bg-green-500/20 text-green-400 border border-green-500/30",
        MEDIUM: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
        HIGH: "bg-red-500/20 text-red-400 border border-red-500/30",
    };

    const predictionBadge = {
        legitimate:
            "bg-green-500/20 text-green-400 border border-green-500/30",
        phishing: "bg-red-500/20 text-red-400 border border-red-500/30",
    };

    const formatDate = (date) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    if (!history.length) {
        return (
            <div className="bg-slate-900 rounded-xl shadow-xl border border-slate-700 p-8 mt-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                    Recent Scan History
                </h2>

                <p className="text-slate-400">
                    No scan history available.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 rounded-xl shadow-xl border border-slate-700 p-6 mt-6">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-white">
                    Recent Scan History
                </h2>

                <span className="text-slate-400 text-sm">
                    Showing {history.length} scans • Newest First ↓
                </span>

            </div>

            <div className="overflow-x-auto rounded-lg">

                <table className="min-w-full">

                    <thead className="bg-slate-800">

                        <tr>

                            <th className="px-5 py-4 text-left text-slate-300 font-semibold">
                                URL
                            </th>

                            <th className="px-5 py-4 text-left text-slate-300 font-semibold">
                                Prediction
                            </th>

                            <th className="px-5 py-4 text-left text-slate-300 font-semibold">
                                Confidence
                            </th>

                            <th className="px-5 py-4 text-left text-slate-300 font-semibold">
                                Risk
                            </th>

                            <th className="px-5 py-4 text-left text-slate-300 font-semibold">
                                Confidence Meter
                            </th>

                            <th className="px-5 py-4 text-left text-slate-300 font-semibold">
                                Scanned At
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {history.map((item) => {

                            const confidence =
                                (item.probability * 100).toFixed(1);

                            return (

                                <tr
                                    key={item.id}
                                    className="border-b border-slate-700 hover:bg-slate-800 transition-all duration-200"
                                >

                                    <td
                                        className="px-5 py-4 max-w-xs truncate text-slate-200"
                                        title={item.url}
                                    >
                                        {item.url}
                                    </td>

                                    <td className="px-5 py-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${predictionBadge[item.prediction]}`}
                                        >
                                            {item.prediction}
                                        </span>

                                    </td>

                                    <td className="px-5 py-4 text-slate-200 font-medium">
                                        {confidence}%
                                    </td>

                                    <td className="px-5 py-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${riskBadge[item.risk_level]}`}
                                        >
                                            {item.risk_level}
                                        </span>

                                    </td>

                                    <td className="px-5 py-4">

                                        <div className="w-36 bg-slate-700 rounded-full h-2">

                                            <div
                                                className={`h-2 rounded-full ${
                                                    confidence >= 80
                                                        ? "bg-red-500"
                                                        : confidence >= 50
                                                        ? "bg-yellow-400"
                                                        : "bg-green-500"
                                                }`}
                                                style={{
                                                    width: `${confidence}%`,
                                                }}
                                            />

                                        </div>

                                    </td>

                                    <td className="px-5 py-4 whitespace-nowrap text-slate-300">
                                        {formatDate(item.created_at)}
                                    </td>

                                </tr>

                            );
                        })}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default HistoryTable;