function PredictionCard({ result }) {
    const riskColors = {
        LOW: "bg-green-100 text-green-700",
        MEDIUM: "bg-yellow-100 text-yellow-700",
        HIGH: "bg-red-100 text-red-700",
    };

    return (
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl shadow-xl p-6 mt-6 text-white">

            <h2 className="text-2xl font-bold mb-6">
                Prediction Result
            </h2>

            <div className="grid grid-cols-3 gap-6">

                <div>
                    <p className="text-slate-400">Prediction</p>
                    <p className="text-xl font-semibold capitalize">
                        {result.prediction}
                    </p>
                </div>

                <div>
                    <p className="text-slate-400">Confidence</p>
                    <p className="text-xl font-semibold">
                        {(result.probability * 100).toFixed(2)}%
                    </p>
                </div>

                <div>
                    <p className="text-slate-400">Risk</p>

                    <span
                        className={`px-3 py-1 rounded-full font-semibold ${
                            riskColors[result.risk_level.toUpperCase()]
                        }`}
                    >
                        {result.risk_level.toUpperCase()}
                    </span>

                </div>

            </div>

        </div>
    );
}

export default PredictionCard;