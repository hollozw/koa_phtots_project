import { DataTypes, Sequelize } from "sequelize";
// 创建文件模型
const File = (sequelize: Sequelize) => {
  return sequelize.define("File", {
    // 文件ID
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
};

export default File;
