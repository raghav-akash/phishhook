import pandas as pd
from src.features.url_features import *
from src.features.domain_features import *

import pandas as pd
from src.features.url_features import *
from src.features.domain_features import *

def extract_features(df: pd.DataFrame) -> pd.DataFrame:
    df['url_length'] = df['url'].apply(url_length)
    df['dot_count'] = df['url'].apply(count_dots)
    df['has_ip'] = df['url'].apply(has_ip)
    df['has_https'] = df['url'].apply(has_https)
    df['suspicious_words'] = df['url'].apply(suspicious_words)
    df['domain_length'] = df['url'].apply(get_domain_length)
    df['special_char_count'] = df['url'].apply(count_special_chars)
    df['digit_count'] = df['url'].apply(digit_count)
    df['letter_count'] = df['url'].apply(letter_count)
    df['url_entropy'] = df['url'].apply(url_entropy)
    df['has_suspicious_tld'] = df['url'].apply(has_suspicious_tld)
    df['path_depth'] = df['url'].apply(path_depth)
    df['subdomain_count'] = df['url'].apply(subdomain_count)
    return df