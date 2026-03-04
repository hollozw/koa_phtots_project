import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "photos_projects",
  "root",
  "1359542315",
  {
    host: "localhost",
    dialect: "mysql",
  },
);
