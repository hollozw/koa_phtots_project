import { KoaRouterType } from "@/types";
import { isUserInfo, success } from "@/utils";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  JWT_SECRET,
  getUserListByKey,
} from "@/utils/jwt";
import Router from "@koa/router";

export const router = new Router();

const confirmUser: KoaRouterType = async (ctx, next) => {
  try {
    const { user, password } = ctx.request.body || ({} as any);
    const item = await getUserListByKey("user", user);
    if (!isUserInfo(item)) throw new Error("无可用信息");
    const { password: passwordHash, id } = item;
    const ok = await bcrypt.compare(password, passwordHash);
    if (!ok) throw new Error("无可用信息");
    ctx.state.id = id;
    ctx.state.user = user;
    await next();
  } catch (error) {
    ctx.throw(500, {
      code: 500,
      messages: {
        error,
      },
    });
  }
};

const getToken: KoaRouterType = async (ctx, next) => {
  try {
    const { id, user } = ctx.state;
    const accessToken = generateAccessToken({ user, id }, JWT_SECRET);
    const refreshToken = generateRefreshToken({ user, id }, JWT_SECRET);
    success(ctx, {
      accessToken,
      refreshToken,
    });

    await next();
  } catch (error) {
    ctx.throw(500, {
      code: 500,
      messages: {
        error,
      },
    });
  }
};

const getUserInfo: KoaRouterType = async (ctx, next) => {
  try {
    const { authorization } = ctx.header;
    success(ctx, "success");
    await next();
  } catch (error) {
    if (typeof error === "string") return ctx.throw(401, error);
    return ctx.throw(500);
  }
};

const baseRoute = "/user";
router.post(baseRoute + "/login", confirmUser, getToken);
router.post(baseRoute + "/info", getUserInfo);
