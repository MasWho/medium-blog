// Run this file when setting up the database for the first time
import { Model, STRING, BIGINT } from "sequelize";
import { DBConnection } from "./db";

const dbConnection = DBConnection.getInstance().getConnection();

export const User = dbConnection.define<Model<{id: number, username: string, password: string}, any>>(
  'user', 
  {
    id: {
      type: BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false
    }
  },
  {}
);

(async () => {
  await dbConnection.sync();
})();