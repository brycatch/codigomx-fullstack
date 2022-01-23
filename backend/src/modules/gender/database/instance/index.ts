import { Sequelize } from "sequelize";
import { Gender } from "..";

class DB {
  private static _instance: DB;
  public sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize({
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_DATABASE || "backend",
      username: process.env.DB_USERNAME || "user",
      password: process.env.DB_PASSWORD || "password",
      dialect: "mysql",
    });
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }
}

const testConnection = async (): Promise<boolean> => {
  try {
    await DB.instance.sequelize.authenticate();
    console.log("Connection authenticated succesfully");
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};

const sync = async () => {
  await Gender.sync({ force: true });
  await Gender.create({ name: "Male" });
  await Gender.create({ name: "Female" });
  return DB.instance.sequelize.sync({ alter: true });
};

export { DB, testConnection, sync };
