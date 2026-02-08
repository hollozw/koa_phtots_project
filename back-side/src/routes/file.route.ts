import { KoaRouterType } from "@/types";
import { success, throwError } from "@/utils";
import upload from "@/config/multer";
import Router from "@koa/router";
import multer from "@koa/multer";
import { dirList } from "@/models/files.models";

export const router = new Router();

const baseRoute = "/file";

const selectDir: KoaRouterType = async (ctx, next) => {
  try {
    const { id } = ctx.request.body || ({} as any);
    success(ctx, id);
    await next();
  } catch (error) {
    if (typeof error === "string") return ctx.throw(400, error);
    return ctx.throw(500);
  }
};

const addProject: KoaRouterType = async (ctx, next) => {
  try {
    const { name } = ctx.request.body || ({} as any);
    if (!name) throw new Error("文件夹名为空");
    const res = await dirList.addDir(name);
    ctx.state.dirInfo = {
      ...res,
    };
    success(ctx, res);
    await next();
  } catch (error: any) {
    return throwError(ctx, error);
  }
};

const addFiles: KoaRouterType = async (ctx, next) => {
  try {
    const files = ctx.files as multer.File[];

    // console.log(files, 'files')
    ctx.body = {
      code: 0,
      msg: "上传成功",
      files: files.map((file) => ({
        filename: file.filename,
        path: `/images/${file.filename}`,
        size: file.size,
      })),
    };

    await next();
  } catch (error) {
    return throwError(ctx, error);
  }
};

router.post(baseRoute + "/getFile", selectDir);
router.post(baseRoute + "/addDir", addProject);
router.post(baseRoute + "/addFiles", upload.array("images", 10), addFiles);
