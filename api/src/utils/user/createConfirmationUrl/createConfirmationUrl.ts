import { confirmUserPrefix } from "@utils/constants";
import { redis } from "@utils/main";
import { v4 as uuid } from "uuid";

export const createConfirmationUrl = async (userId: string) => {
  const id = uuid();
  const key = confirmUserPrefix + id;
  await redis.set(key, userId, "ex", 60 * 60 * 24); // 1 day expiration date.

  return `http://localhost:3000/users/confirm/${id}`;
};
