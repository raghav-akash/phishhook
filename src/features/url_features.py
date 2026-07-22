import re
from urllib.parse import urlparse
import math
from collections import Counter


def url_length(url):
    return len(url)

def count_dots(url):
    return url.count('.')

def has_ip(url):
    pattern = pattern = r'\d+\.\d+\.\d+\.\d+'
    return int(bool(re.search(pattern, url)))

def has_https(url):
    return int(urlparse(url).scheme == 'https')

def suspicious_words(url):
    words = ['login', 'verify', 'bank', 'secure', 'account']
    return sum([1 for word in words if word in url.lower().split('/')])

def count_special_chars(url):
    return sum([1 for c in url if c in ['@', '-', '_', '?', '=', '&']])

def digit_count(url):
    return sum(c.isdigit() for c in url)

def letter_count(url):
    return sum(c.isalpha() for c in url)

def url_entropy(url):
    prob = [float(url.count(c)) / len(url) for c in dict.fromkeys(list(url))]
    return -sum([p * math.log2(p) for p in prob])

def has_suspicious_tld(url):
    suspicious_tlds = ['.tk', '.ml', '.ga', '.cf']
    return int(any(tld in url for tld in suspicious_tlds))

def path_depth(url):
    return url.count('/')