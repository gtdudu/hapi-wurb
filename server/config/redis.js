import redis from 'redis'

let redisClient;
let redisBufferClient;

if (process.env.NODE_ENV !== 'test') {
  redisClient = redis.createClient(process.env.REDIS_DB_PORT, process.env.REDIS_DB_HOST, {
    password: process.env.REDIS_DB_SECRET
  })

  redisBufferClient = redis.createClient(process.env.REDIS_DB_PORT, process.env.REDIS_DB_HOST, {
    password: process.env.REDIS_DB_SECRET,
    return_buffers: true // eslint-disable-line
  });
}

  export {redisClient, redisBufferClient}
