import shap

class ModelExplainer:

    def __init__(self, model, feature_names):
        self.feature_names = feature_names
        self.explainer = shap.TreeExplainer(model)

    def explain(self, X):

        shap_values = self.explainer.shap_values(X)

        contributions = []

        for idx, feature in enumerate(self.feature_names):

            contributions.append({
                "feature": feature,
                "impact": float(shap_values[0][idx])
            })

        contributions.sort(
            key=lambda x: abs(x["impact"]),
            reverse=True
        )

        return contributions[:5]