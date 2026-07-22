function StatsCards({ history }) {
    const totalScans = history.length;

    const legitimate = history.filter(
        (item) => item.prediction === "legitimate"
    ).length;

    const phishing = history.filter(
        (item) => item.prediction === "phishing"
    ).length;

    const highRisk = history.filter(
        (item) => item.risk_level === "HIGH"
    ).length;

    const mediumRisk = history.filter(
        (item) => item.risk_level === "MEDIUM"
    ).length;

    const lowRisk = history.filter(
        (item) => item.risk_level === "LOW"
    ).length;

    const cards = [
        {
            title: "Total Scans",
            value: totalScans,
            color: "text-blue-400",
            border: "border-blue-500/30",
            icon: "📊",
            footer: `${highRisk} High Risk`,
        },
        {
            title: "Legitimate",
            value: legitimate,
            color: "text-green-400",
            border: "border-green-500/30",
            icon: "🟢",
            footer:
                totalScans > 0
                    ? `${((legitimate / totalScans) * 100).toFixed(1)}%`
                    : "0%",
        },
        {
            title: "Phishing",
            value: phishing,
            color: "text-red-400",
            border: "border-red-500/30",
            icon: "🔴",
            footer:
                totalScans > 0
                    ? `${((phishing / totalScans) * 100).toFixed(1)}%`
                    : "0%",
        },
        {
            title: "Risk Levels",
            value: `${highRisk}/${mediumRisk}/${lowRisk}`,
            color: "text-yellow-400",
            border: "border-yellow-500/30",
            icon: "⚠️",
            footer: "H / M / L",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className={`bg-slate-900 border ${card.border} rounded-xl p-6 shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300`}
                >

                    <div className="flex justify-between items-start">

                        <div>

                            <p className="text-slate-400 text-sm">
                                {card.title}
                            </p>

                            <h2 className={`text-4xl font-bold mt-2 ${card.color}`}>
                                {card.value}
                            </h2>

                        </div>

                        <div className="text-3xl">
                            {card.icon}
                        </div>

                    </div>

                    <div className="mt-5">

                        <div className="w-full bg-slate-700 rounded-full h-1.5">

                            <div
                                className={`h-1.5 rounded-full ${
                                    card.color.replace("text", "bg")
                                }`}
                                style={{
                                    width:
                                        totalScans === 0
                                            ? "0%"
                                            : card.title === "Total Scans"
                                            ? "100%"
                                            : `${Math.min(
                                                  (Number(card.value) / totalScans) * 100,
                                                  100
                                              )}%`,
                                }}
                            />

                        </div>

                        <p className="text-xs text-slate-500 mt-3">
                            {card.footer}
                        </p>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default StatsCards;