import { sequelize } from "@/db/seq";
import File from "./files.db";

// 检查数据库是否连接并在成功后同步模型以自动建表
export async function connectAndSync() {
  try {
    await sequelize.authenticate();
    console.log("数据库连接成功!");

    // 确保在 sync 之前所有模型文件都已被导入
    // 例如：
    // import("../models/files.models");
    // 如果有多个模型，按需 import 它们，或在模型定义的入口处统一导入。
    await File.sync({ alter: true });

    // 同步模型到数据库：不存在的表会被创建，已有表会根据模型进行调整（慎用）
    await sequelize.sync({ alter: true });
    console.log("数据表同步完成（若不存在则已创建）");
  } catch (err) {
    console.error("数据库连接或同步失败:", err);
  }
}

connectAndSync();