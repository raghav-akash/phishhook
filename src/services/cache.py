import redis
import json

redis_client=redis.Redis(
     host='localhost',
    port=6379,
    decode_responses=True
)

def get_cached_result(url):

    result = redis_client.get(url)

    if result:
        return json.loads(result)

    return None

def set_cached_result(url, data):

    redis_client.setex(
        url,
        CACHE_EXPIRY,
        json.dumps(data)
    )
CACHE_EXPIRY = 3600  # 1 hour