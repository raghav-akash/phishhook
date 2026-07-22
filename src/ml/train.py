import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
from xgboost import XGBClassifier
import joblib

from src.data.loader import *
from src.data.preprocess import extract_features

phish = load_phishtank_data("data/raw/phish.csv")
legit = load_legit_data("data/raw/legit.csv")

df = combine_datasets(phish, legit)

df = extract_features(df)

features = [
    'url_length',
    'dot_count',
    'has_ip',
    'has_https',
    'suspicious_words',
    'domain_length',
    'special_char_count',
    'digit_count',
    'letter_count',
    'url_entropy',
    'has_suspicious_tld',
    'path_depth',
    'subdomain_count'
]

X = df[features]
y = df['label']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = XGBClassifier(
    n_estimators=300,
    max_depth=6,
    learning_rate=0.05,
    scale_pos_weight=1.2
)
model.fit(X_train, y_train)

y_proba = model.predict_proba(X_test)[:, 1]

scale_pos_weight = len(y_train[y_train==0]) / len(y_train[y_train==1])

y_pred = (y_proba > 0.35).astype(int)
print(classification_report(y_test, y_pred))

print("ROC AUC:", roc_auc_score(y_test, y_proba))



joblib.dump(model, "models/xgb_model.pkl")