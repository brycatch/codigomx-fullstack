import { Sequelize } from 'sequelize';
import { User } from '..';

class DB {
  private static _instance: DB;
  public sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize({
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_DATABASE || 'backend',
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || 'password',
      dialect: 'mysql',
    });
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }
}

const testConnection = async (): Promise<boolean> => {
  try {
    await DB.instance.sequelize.authenticate();
    console.log('Connection authenticated succesfully');
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};

const sync = async () => {
  await User.sync({ alter: true });
  await User.create({
    firstName: 'User 1',
    lastName: 'Male',
    password: '$2b$10$7SrKm1aJwG2yhl6i8ftZV.QwQDflP1D70yEr3VaqHCa0REV.W21PC',
    birthday: '01/01/1990',
    gender: 1,
  });
  await User.create({
    firstName: 'User 1',
    lastName: 'Female',
    password: '$2b$10$7SrKm1aJwG2yhl6i8ftZV.QwQDflP1D70yEr3VaqHCa0REV.W21PC',
    birthday: '01/01/1990',
    gender: 2,
  });
  return DB.instance.sequelize.sync({ alter: true });
};

export { DB, testConnection, sync };
