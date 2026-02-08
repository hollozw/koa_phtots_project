import { Sequelize } from "sequelize";

const sequelize = new Sequelize("photos_projects", "root", "1359542315", {
  host: "localhost",
  dialect: "mysql",
});

// 检查数据库是否连接
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


export default sequelize;
