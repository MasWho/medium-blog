import Redis from 'ioredis';

function createRedisInstance() {
  try {
    const redis = new Redis('redis://localhost:6379');
    redis.on('error', (error: unknown) => {
      console.warn('[Redis] Error connecting', error);
    });
 
    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}

const redisClient = createRedisInstance();
export default redisClient;