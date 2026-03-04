import { DataTypes } from "sequelize";
import { sequelize } from "@/db/seq";
// 创建文件模型
const File = sequelize.define("File", {
  // 文件ID
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  // 图片路径id
  filepathId: { type: DataTypes.STRING, allowNull: false },
  // 文件名
  filename: { type: DataTypes.STRING, allowNull: false },
  // 文件路径
  filepath: { type: DataTypes.STRING, allowNull: false },
  // 文件大小
  filesize: { type: DataTypes.INTEGER, allowNull: true },
  // 文件类型id
  filetypeId: { type: DataTypes.INTEGER, allowNull: true },
  // 上传时间
  uploadTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default File;
