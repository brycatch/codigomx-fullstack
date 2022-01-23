import controller from "../../../../../src/modules/user/controllers";
import Server from "../../../../../src/server";
import { IUser } from "../../../../../src/modules/user/database/interfaces/IUser";
import {
  testConnection as userTestConnection,
  sync as userSync,
} from "../../../../../src/modules/user/database";

import {
  testConnection as genderTestConnection,
  sync as genderSync,
} from "../../../../../src/modules/gender/database";

describe("User controller", () => {
  let user: IUser;

  beforeAll((done) => {
    console.log(`Server is running at port: ${Server.instance.port}`);
    userTestConnection()
      .then(userSync)
      .then(genderTestConnection)
      .then(genderSync)
      .then(() => {
        done();
      });
  });

  describe("Post", () => {
    it("Should be create a user", async () => {
      const insert: IUser = {
        firstName: "firstName",
        lastName: "lastName",
        password: "12345",
        birthday: new Date("03/03/1992"),
        gender: 1,
      };
      const { data, code, message } = await controller.post(insert);
      expect(data).not.toBeNull();
      expect(code).toBe(201);
      expect(message).toBe("User created successfull");
      if (data !== null) user = { ...data["user"] };
    });

    it("Should be return an error / Invalid user", async () => {
      const insert: IUser = {
        firstName: "",
        lastName: "",
        password: "",
        birthday: new Date("03/03/1992"),
        gender: 1,
      };
      const { data, code, message } = await controller.post(insert);
      expect(data).toBeNull();
      expect(code).toBe(400);
      expect(message).toBe("User is invalid");
    });
    it("Should be return an error / invalid date", async () => {
      const insert: IUser = {
        firstName: "firstName",
        lastName: "lastName",
        password: "12345",
        birthday: new Date("date"),
        gender: 1,
      };
      const { data, code, message } = await controller.post(insert);
      expect(data).toBeNull();
      expect(code).toBe(400);
      expect(message).toBe("User is invalid");
    });
  });

  describe("Get", () => {
    it("Should be return a user", async () => {
      const { data, code, message } = await controller.get(`${user.userId}`);
      expect(data).not.toBeNull();
      expect(code).toBe(200);
      expect(message).toBeUndefined();

      if (data !== null) expect(`${data.userId}`).toBe(`${user.userId}`);
    });
    it("Should be return an error / not found", async () => {
      const { data, code, message } = await controller.get("0");
      expect(data).toBeNull();
      expect(code).toBe(404);
      expect(message).toBe("User don't found");
    });
  });

  describe("List", () => {
    it("Should be return a list of users", async () => {
      const { data, code, message } = await controller.list();
      expect(data).toBeDefined();
      expect(message).toBeUndefined();
      expect(data.length).toBeGreaterThan(0);
      expect(code).toBe(200);
    });
  });

  describe("Put", () => {
    it("Should be update a user", async () => {
      const insert: Partial<IUser> = {
        firstName: "firstName",
        birthday: new Date("03/03/1996"),
      };
      const { data, code, message } = await controller.put(
        `${user.userId}`,
        insert
      );
      expect(data).not.toBeNull();
      expect(code).toBe(200);
      expect(message).toBe("User updated successfully");
    });
    it("Should be return an error", async () => {
      const insert: Partial<IUser> = {
        firstName: "",
      };
      const { data, code, message } = await controller.put(
        `${user.userId}`,
        insert
      );
      expect(data).toBeNull();
      expect(code).toBe(400);
      expect(message).toBe("User doesn't updated");
    });
  });

  describe("Delete", () => {
    it("Should be return an error / invalid user", async () => {
      const { data, code, message } = await controller.remove("0");
      expect(data.deleted).toBe(false);
      expect(code).toBe(400);
      expect(message).toBe("User didn't deleted");
    });
    it("Should be return true / user deleted", async () => {
      const { data, code, message } = await controller.remove(`${user.userId}`);
      expect(data.deleted).toBe(true);
      expect(code).toBe(200);
      expect(message).toBe("User deleted successfully");
    });
    it("Should be return an error / user already deleted", async () => {
      const { data, code, message } = await controller.remove(`${user.userId}`);
      expect(data.deleted).toBe(false);
      expect(code).toBe(400);
      expect(message).toBe("User didn't deleted");
    });
  });
});
