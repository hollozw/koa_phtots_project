import { CategoryType, DirListType } from "@/types";
import { rootPath } from "@/utils";
import fs from "fs/promises";
import { v4 } from "uuid";

export class Category {
  public CategoryData: CategoryType[] = [];
  constructor() {
    this.getCatgoryJSON().then((item) => {
      this.CategoryData = item;
    });
  }

  async getCatgoryJSON() {
    try {
      const data = await fs.readFile(
        rootPath("src", "json", "category.json"),
        "utf-8",
      );

      return JSON.parse(data);
    } catch (error) {
      console.error("readfile failed!");
      return [];
    }
  }
}

export class DirList {
  private data: DirListType[] = [];
  private readonly fileJSONPath: string = rootPath("src", "json", "file.json");

  constructor() {
    this.getFIleInfo().then((item) => {
      this.data = item;
    });
  }

  getData(): DirListType[] {
    return this.data;
  }

  async getFIleInfo() {
    try {
      const data = await fs.readFile(this.fileJSONPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async addDir(dirName: string) {
    if (this.data.find((item) => item.name === dirName)) {
      return this.data.find((item) => item.name === dirName);
    }
    const id = v4();
    const dirInfo = {
      id,
      name: dirName,
      type: [],
      links: [],
    };
    this.data.push(dirInfo);
    await fs.mkdir(rootPath("asserts", "images", id), {
      recursive: true,
    });
    return dirInfo;
  }

  async addFiles(blob: Blob) {}
}

const dirList = new DirList();
const category = new Category();
export { dirList, category };
