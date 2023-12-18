from redis import StrictRedis


redis_connection = StrictRedis(host="localhost", port=6379, db=0)
