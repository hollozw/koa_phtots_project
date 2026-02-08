import { TreeData } from "@/types";
import fs from "node:fs";
import path from "node:path";
import { v4 } from "uuid";

class FileList {
  static Instance: FileList;
  private fileList: TreeData[] = [];
  private readonly defaultPath: string = path.resolve(
    __dirname,
    "../../",
    "asserts",
  );
  constructor() {
    if (FileList.Instance) return FileList.Instance;
    this.initFileByPath(this.defaultPath)
      .then((res) => {
        this.fileList = res;
      })
      .catch((err) => {
        console.log(err);
      });
    FileList.Instance = this;
    return this;
  }

  async initFileByPath(filepath: string): Promise<any> {
    try {
      const data = await this.resolveDirNav(filepath);
      if (!Array.isArray(data)) throw new Error("文件读取出错");
      let index = 0;
      const fileList: TreeData[] = [];
      while (index < data.length) {
        const dataList: TreeData = {
          name: data[index]?.name,
          id: v4(),
          path: data[index]?.parentPath,
          isDir: !!data[index]?.isDirectory(),
        };

        if (data[index]?.isDirectory()) {
          const treeFile = path.resolve(filepath, data[index]?.name);
          dataList.children = await this.initFileByPath(treeFile);
        }
        fileList.push(dataList);
        index++;
      }

      return fileList;
    } catch (err) {
      return [];
    }
  }

  resolveDirNav(path: string): Promise<fs.Dirent<string>[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(path, { withFileTypes: true }, (err, data) => {
        resolve(data);
        reject(err);
      });
    });
  }

  async getFileList(): Promise<TreeData[]> {
    return new Promise((resolve, reject) => {
      resolve(this.fileList);
      reject();
    });
  }

  selectFileDir(
    id: string,
    fileList: TreeData[] = this.fileList,
  ): TreeData | undefined {
    for (let item of fileList) {
      if (item.id === id) {
        return item;
      }
      if (item.children && item.children.length) {
        const res = this.selectFileDir(id, item.children);
        if (res) return res;
      }
    }

    return undefined;
  }
}

export default FileList;
