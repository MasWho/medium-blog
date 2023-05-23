// Run this file when setting up the database for the first time
import { STRING } from "sequelize";
import { DBConnection } from "./db";
import initialiseEnv from "../../config";
initialiseEnv();

const dbConnection = DBConnection.getInstance().getConnection();

export const User = dbConnection.define(
  'user', 
  {
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