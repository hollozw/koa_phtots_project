import { Next, Context } from "koa";

export type KoaRouterType = (ctx: Context, next: Next) => Promise<any>;

export type UserInfoType = {
  id: number;
  user: string;
  password: string;
};

export type FileDataType = {
  name: string;
  id: string;
  isDir: boolean;
  path: string[];
  children?: FileDataType[];
};

export type DirListType = {
  name: string;
  id: string;
  type?: string[];
  links: string[];
};

export type CategoryType = {
  id: string;
  name: string;
};
