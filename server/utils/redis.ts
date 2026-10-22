import Redis from "ioredis";
require("dotenv").config();

const redisClient = () => {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error(
      "Redis connection failed. Ensure REDIS_URL is set in your .env file."
    );
  }

  const client = new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    tls: redisUrl.startsWith("rediss://")
      ? { rejectUnauthorized: false } // ensure Upstash TLS works without issues
      : undefined,
  });

  // handle redis connection events
  client.on("connect", () => {
    console.log("Redis connected successfully.");
  });

  client.on("error", (err) => {
    console.error("Redis connection error:", err.message);
  });

  return client;
};

export const redis = redisClient();
