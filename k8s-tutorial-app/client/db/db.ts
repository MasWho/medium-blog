const pg = require('pg');
import { Sequelize } from "sequelize";

const DB_USER = process.env.DB_USER || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'tut-db';
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
const DB_PORT = process.env.DB_PORT || 5432;

export class DBConnection {
  private static instance: DBConnection;
  private connection: Sequelize;

  private constructor() {
    this.connection = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      dialectModule: pg,
    });
    this.connect();
  }

  private async connect(): Promise<void> {
    try {
      await this.connection.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  public static getInstance(): DBConnection {
    if (!DBConnection.instance) {
        DBConnection.instance = new DBConnection();
    }

    return DBConnection.instance;
  }

  public getConnection(): Sequelize {
    return this.connection;
  }
}