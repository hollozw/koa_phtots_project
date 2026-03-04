import path from "node:path";
import fs from "node:fs";

export function createDir() {
  try {
    const dirPath = path.join(__dirname, "../../", "asserts/backImages");

    fs.mkdir(dirPath, (err) => {
      if (err) throw new Error("创建文件夹失败");
    });
    return dirPath;
  } catch (err) {
    console.log(err);
    return err;
  }
}
