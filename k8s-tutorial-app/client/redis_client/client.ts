import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL;

export function createRedisInstance() {
  try {
    const redis = new Redis(REDIS_URL!);
    redis.on('error', (error: unknown) => {
      console.warn('[Redis] Error connecting', error);
    });
    
    console.log(`[Redis] Redis instance created successfully, connection @ ${REDIS_URL}`)
    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}

const redisClient = createRedisInstance();
export default redisClient;