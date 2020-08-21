import redis from 'redis';

const redisClient = redis.createClient(
  parseInt(process.env.REDIS_PORT, 10),
  process.env.REDIS_HOST,
);

redisClient.on('error', error => {
  console.log('redis 出错');
  console.log(error);
});

const redisService = {
  redisClient,
  set(key, value) {
    return redisClient.set(key, value);
  },
  async get(key) {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (error, result) => {
        if (error) {
          return reject(error);
        }
        try {
          result = JSON.parse(result);
          return resolve(result);
        } catch (error) {
          return resolve(result);
        }
      });
    });
  },
};

export default redisService;
