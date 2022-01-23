import database from "../database/functions";
import { IUser, IApiResponse } from "../database/interfaces";

const get = async (id: string): Promise<IApiResponse> => {
  try {
    const user = await database.get(id);
    const result: IApiResponse =
      user === null
        ? {
            data: null,
            code: 404,
            message: "User don't found",
          }
        : {
            data: user,
            code: 200,
          };
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};
const list = async (): Promise<IApiResponse> => {
  try {
    const users = await database.list();
    const result: IApiResponse = { data: users, code: 200 };
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

const post = async (user: IUser): Promise<IApiResponse> => {
  try {
    const iUser = await database.create(user);
    const result: IApiResponse =
      iUser !== null
        ? {
            data: { user: iUser },
            code: 201,
            message: "User created successfull",
          }
        : {
            data: null,
            code: 400,
            message: "User is invalid",
          };
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

const put = async (
  userId: string,
  user: Partial<IUser>
): Promise<IApiResponse> => {
  try {
    const updated = await database.update(userId, user);
    const response: IApiResponse = updated
      ? { data: { updated }, code: 200, message: "User updated successfully" }
      : { data: null, code: 400, message: "User doesn't updated" };
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const remove = async (userId: string): Promise<IApiResponse> => {
  try {
    const deleted = await database.remove(userId);
    const response: IApiResponse = deleted
      ? { data: { deleted }, code: 200, message: "User deleted successfully" }
      : { data: { deleted }, code: 400, message: "User didn't deleted" };
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default { get, post, put, list, remove };
