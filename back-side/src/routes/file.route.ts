import { KoaRouterType } from "@/types";
import { success, throwError } from "@/utils";
import Router from "@koa/router";
import multer from "@koa/multer";
import { dirList } from "@/models/files.models";
import File from "@/db/files.db";
import { rootPath } from "@/utils/index";
import path from "node:path";

export const router = new Router();

let imageId: string | undefined;
let filename: string | undefined;
let filepath: string | undefined = "";

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

    console.log(filename, imageId, "File");

    File.create({
      filename,
      filepathId: imageId,
      filepath: path.join(
        "asserts",
        "backImages",
        imageId ?? "",
        filepath ?? "",
      ),
    });
    success(ctx, {
      files: files.map((file) => ({
        filename: file.filename,
        size: file.size,
      })),
    });

    await next();
  } catch (error) {
    return throwError(ctx, error);
  }
};

const storage = multer.diskStorage({
  destination: async (req: any, _, cb) => {
    imageId = "";
    const { name } = req.body || ({} as any);
    if (!name) throw new Error("文件夹名为空");
    const res = await dirList.addDir(name);
    const dirName = res?.id || "";
    imageId = res?.id;
    filename = res?.name;

    cb(null, rootPath("asserts", "backImages", dirName));
  },
  filename: (req: any, file, cb) => {
    console.log(req, "req");
    const { startName } = req.body || ({} as any);
    const { name, ext } = path.parse(file.originalname);
    const filename = `${name}-${Date.now()}${ext}`;
    if (name === startName) filepath = filename;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post(baseRoute + "/getFile", selectDir);
router.post(baseRoute + "/addDir", addProject);
router.post(baseRoute + "/addFiles", upload.array("images", 10), addFiles);
