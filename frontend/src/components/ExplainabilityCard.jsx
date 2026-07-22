const featureLabels = {
    url_entropy: "High URL randomness",
    subdomain_count: "Multiple subdomains",
    suspicious_words: "Contains suspicious words",
    has_suspicious_tld: "Suspicious TLD",
    path_depth: "Deep URL path",
    special_char_count: "Many special characters",
    digit_count: "Many numbers",
    domain_length: "Long domain",
    dot_count: "Many dots",
};

function ExplainabilityCard({ result }) {
    return (
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl shadow-xl p-6 mt-6 text-white">

            <h2 className="text-2xl font-bold mb-6">
                Top Risk Factors
            </h2>

            <div className="space-y-4">

                {result.top_features.map((feature, index) => (

                    <div
                        key={index}
                        className="flex justify-between items-center border rounded-lg p-4"
                    >
                        <span>
                            {featureLabels[feature.feature] ?? feature.feature}
                        </span>

                        <span className="font-semibold">
                            {feature.impact.toFixed(4)}
                        </span>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ExplainabilityCard;