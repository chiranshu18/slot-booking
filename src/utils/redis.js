const { createClient } = require("redis");

const insertIntoRedis = async (token, userId) => {
  const client = createClient({
    socket: {
      host: "redis",
      port: 6379,
    },
  });

  client.on("error", function (error) {
    console.error(error);
  });

  await client.connect();
  await client.set(token, userId);
  await client.disconnect();
};

const getFromRedis = async (token) => {
  const client = createClient({
    socket: {
      host: "redis",
      port: 6379,
    },
  });
  client.on("error", function (error) {
    console.log(error);
  });

  await client.connect();
  const userId = await client.get(token);
  await client.disconnect();
  return userId;
};

module.exports = { insertIntoRedis, getFromRedis };
