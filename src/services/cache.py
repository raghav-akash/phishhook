import os
import json
import redis
import logging

logger = logging.getLogger(__name__)

CACHE_EXPIRY = 3600  # 1 hour

redis_client = None

try:
    redis_host = os.getenv("REDIS_HOST", "localhost")
    redis_port = int(os.getenv("REDIS_PORT", 6379))
    redis_password = os.getenv("REDIS_PASSWORD")

    redis_client = redis.Redis(
        host=redis_host,
        port=redis_port,
        password=redis_password,
        decode_responses=True,
        socket_connect_timeout=2,
    )

    # Verify Redis connection
    redis_client.ping()

    logger.info("Connected to Redis.")

except Exception as e:
    logger.warning(f"Redis unavailable. Continuing without cache. Reason: {e}")
    redis_client = None


def get_cached_result(url):
    """
    Returns cached prediction if available.
    Returns None if Redis is unavailable or the key doesn't exist.
    """

    if redis_client is None:
        return None

    try:
        result = redis_client.get(url)

        if result:
            return json.loads(result)

    except Exception as e:
        logger.warning(f"Redis GET failed: {e}")

    return None


def set_cached_result(url, data):
    """
    Stores prediction in Redis.
    Silently skips caching if Redis is unavailable.
    """

    if redis_client is None:
        return

    try:
        redis_client.setex(
            url,
            CACHE_EXPIRY,
            json.dumps(data)
        )

    except Exception as e:
        logger.warning(f"Redis SET failed: {e}")