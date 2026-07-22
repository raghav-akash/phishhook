import joblib
import pandas as pd

from src.services.explainability import ModelExplainer
from src.data.preprocess import extract_features
from src.utils.logger import logger
from src.services.cache import (
    get_cached_result,
    set_cached_result
)


class PhishingPredictor:

    def __init__(
        self,
        model_path: str,
        threshold: float = 0.35
    ):

        self.model = joblib.load(model_path)
        self.threshold = threshold

        self.features = [
            "url_length",
            "dot_count",
            "has_ip",
            "has_https",
            "suspicious_words",
            "domain_length",
            "special_char_count",
            "digit_count",
            "letter_count",
            "url_entropy",
            "has_suspicious_tld",
            "path_depth",
            "subdomain_count"
        ]

        self.explainer = ModelExplainer(
            self.model,
            self.features
        )

    def get_risk_level(
        self,
        probability: float
    ) -> str:

        if probability >= 0.80:
            return "high"

        elif probability >= 0.50:
            return "medium"

        return "low"

    def predict(
        self,
        url: str
    ) -> dict:

        try:

            logger.info(f"Scanning URL: {url}")

            cached_result = get_cached_result(url)

            if cached_result:

                logger.info("Cache hit")

                return cached_result

            logger.info("Cache miss")

            df = pd.DataFrame(
                [
                    {
                        "url": url
                    }
                ]
            )

            df = extract_features(df)

            X = df[self.features]

            probability = self.model.predict_proba(X)[0][1]

            prediction = (
                "phishing"
                if probability > self.threshold
                else "legitimate"
            )

            risk_level = self.get_risk_level(probability)

            top_features = self.explainer.explain(X)

            result = {

                "prediction": prediction,

                "probability": round(float(probability),4),

                "risk_level": risk_level,

                "top_features": top_features

            }

            set_cached_result(
                url,
                result
            )

            logger.info("Prediction cached successfully")

            logger.info(
                f"""
                Prediction Completed

                Prediction : {prediction}

                Probability : {probability:.4f}

                Risk Level : {risk_level}
                
                Top Features : {top_features}
                """
            )

            return result

        except Exception:

            logger.exception("Prediction failed")

            return {

                "prediction": "error",

                "probability": 0.0,

                "risk_level": "unknown",

                "top_features": []

            }