import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs/promises";
import { UserInfoType } from "@/types";
import { isUserInfo } from "@/utils";

export const JWT_SECRET = process.env.JWT_SECRET || "";

const userPath = path.join(__dirname, "../utils/user.json");

export const getUserListByKey = async (
  key: "user" | "id",
  user: string | number,
) => {
  const data: any = JSON.parse(await fs.readFile(userPath, "utf-8"));
  if (!Array.isArray(data)) return {};

  const userInfo: UserInfoType | "" = data.filter((item) => {
    const value = item[key];
    if (user === value) return true;
    return false;
  })[0];

  if (!userInfo || !isUserInfo(userInfo)) return {};
  const passwordHash = await bcrypt.hash(userInfo.password || "", 10);
  userInfo.password = passwordHash;

  console.log("userInfo", userInfo);
  return userInfo;
};

export function generateAccessToken(
  data: { user: string; id: number },
  JWT_SECRET: string,
) {
  return jwt.sign({ user: data.user, id: data.id }, JWT_SECRET, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(
  data: { user: string; id: number },
  JWT_SECRET: string,
) {
  return jwt.sign({ user: data.user, id: data.id }, JWT_SECRET, {
    expiresIn: "7d",
  });
}
