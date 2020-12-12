import * as faker from "faker";
import * as argon2 from "argon2";

import { gqlCall } from "@utils/test";
import { User } from "@db/entity";
import { registerMutation } from "./gql";

describe("Register Resolver", () => {
  it("register an user", async () => {
    const data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const call = await gqlCall({
      source: registerMutation,
      variableValues: {
        data,
      },
    });

    expect(call.data).toMatchObject({
      register: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
    });
    const user = await User.findOne({ email: data.email });
    expect(user).toBeDefined();
    expect(user?.confirmed).toBeFalsy();
    expect(user?.firstName).toBe(data.firstName);
    expect(user?.lastName).toBe(data.lastName);
    let isPasswordMatching = false;
    if (user?.password) {
      isPasswordMatching = await argon2.verify(user.password, data.password);
    }
    expect(isPasswordMatching).toBeTruthy();
  }, 30000);

  it("should be able to throw an error if an existing email already exists", async () => {
    // const data = {
    //   firstName: faker.name.firstName(),
    //   lastName: faker.name.lastName(),
    //   email: faker.internet.email(),
    //   password: faker.internet.password(),
    // };
  });
});
