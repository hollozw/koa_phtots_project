import { UserInfoType } from "@/types";
import { Context } from "koa";
import path from "node:path";

export const isUserInfo = (
  data: UserInfoType | "" | {},
): data is UserInfoType => {
  if (!data) return false;
  if (typeof data !== "object") return false;
  if (!("id" in data)) return false;
  if (!("user" in data)) return false;
  if (!("password" in data)) return false;
  return true;
};

export function success(ctx: Context, data: any) {
  return (ctx.body = {
    code: 200,
    message: {
      data,
    },
  });
}

export function rootPath(...rest: string[]) {
  return path.join(__dirname, "../../", ...rest);
}

export function throwError(ctx: Context, error: any) {
    console.log(error);
  if (typeof error === "string") return ctx.throw(400, error);
  if (error?.message) return ctx.throw(400, error?.message);
  return ctx.throw(500);
}

