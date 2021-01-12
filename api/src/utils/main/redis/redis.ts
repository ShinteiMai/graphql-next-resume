import Redis from "ioredis";
export const redis = new Redis(
  process.env.NODE_ENV === "production"
    ? "redis://redis_session:6379"
    : "127.0.0.1:6379"
);
