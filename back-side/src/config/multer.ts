import multer from "@koa/multer";
import { rootPath } from "@/utils/index";
import path from "node:path";
import { dirList } from "@/models/files.models";

const storage = multer.diskStorage({
  destination: async (req: any, file, cb) => {
    const { name } = req.body || ({} as any);
    if (!name) throw new Error("文件夹名为空");
    const res = await dirList.addDir(name);
    const dirName = res?.id || "";

    cb(null, rootPath("asserts", "images", dirName));
  },
  filename: (req, file, cb) => {
    const { name, ext } = path.parse(file.originalname);
    const filename = `${name}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
