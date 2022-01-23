import database from "../../../../../../src/modules/user/database/functions";
import { IUser } from "../../../../../../src/modules/user/database/interfaces/IUser";
import {
  testConnection as userTestConnection,
  sync as userSync,
} from "../../../../../../src/modules/user/database";

import {
  testConnection as genderTestConnection,
  sync as genderSync,
} from "../../../../../../src/modules/gender/database";

describe("User database", () => {
  let user: IUser;

  beforeAll((done) => {
    userTestConnection()
      .then(userSync)
      .then(genderTestConnection)
      .then(genderSync)
      .then(() => {
        done();
      });
  });

  describe("Create", () => {
    it("Should be create a user", async () => {
      const insert: IUser = {
        firstName: "firstName",
        lastName: "lastName",
        password: "12345",
        birthday: new Date("03/03/1995"),
        gender: 1,
      };
      const result = await database.create(insert);
      expect(result).not.toBeNull();
      if (result) {
        expect(`${result.userId}`).toBeDefined();
        user = { ...(result as IUser) };
      }
    });
    it("Should be return null / invalid user", async () => {
      const insert: IUser = {
        firstName: "",
        lastName: "",
        password: "",
        birthday: new Date("03/03/1995"),
        gender: 1,
      };
      const result = await database.create(insert);
      expect(result).toBeNull();
    });
  });

  describe("Get", () => {
    it("Should be return a user", async () => {
      const result = await database.get(`${user.userId}`);
      expect(result).not.toBeNull();
    });
    it("Should be return null / invalid id", async () => {
      const result = await database.get("0");
      expect(result).toBeNull();
    });
  });

  describe("List", () => {
    it("Should be return an array of users", async () => {
      const result = await database.list();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("Update", () => {
    it("Should be return true / user updated", async () => {
      const update: Partial<IUser> = { firstName: "firstName" };
      const result = await database.update(`1`, update);
      expect(result).toBe(true);
    });

    it("Should be return false / invalid user id", async () => {
      const update: Partial<IUser> = { firstName: "firstName" };
      const result = await database.update("0", update);
      expect(result).toBe(false);
    });

    it("Should be return false / invalid user ", async () => {
      const update: Partial<IUser> = { firstName: "" };
      const result = await database.update(`${user.userId}`, update);
      expect(result).toBe(false);
    });
  });

  describe("Remove", () => {
    it("Should be return true / User removed", async () => {
      const deleted = await database.remove(`${user.userId}`);
      expect(deleted).toBe(true);
    });
    it("Should be return false / invalid user", async () => {
      const deleted = await database.remove(``);
      expect(deleted).toBe(false);
    });
    it("Should be return false / User already removed", async () => {
      const deleted = await database.remove(`${user.userId}`);
      expect(deleted).toBe(false);
    });
  });
});
