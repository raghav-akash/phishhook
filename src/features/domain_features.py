import tldextract
from urllib.parse import urlparse

def get_domain_length(url):
    ext = tldextract.extract(url)
    domain = ext.domain
    return len(domain)

def subdomain_count(url):
    netloc = urlparse(url).netloc
    return netloc.count('.')