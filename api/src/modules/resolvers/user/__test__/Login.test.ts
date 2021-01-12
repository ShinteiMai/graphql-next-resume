import * as faker from "faker";
import * as argon2 from "argon2";
import { User } from "@db/entity";
import { gqlCall } from "@utils/test";
import { loginMutation } from "./gql";

const createUser = async (
  confirmed?: boolean
): Promise<{ data: User; rawPassword: string }> => {
  const user = new User();

  const rawPassword = faker.internet.password();

  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.email = faker.internet.email();
  user.password = await argon2.hash(rawPassword);
  user.confirmed = !!confirmed;

  const data = await user.save();
  return {
    data,
    rawPassword,
  };
};

describe("Login Resolver", () => {
  it("should be able to login to an existing user", async () => {
    const user = await createUser(true);

    const loginCall = await gqlCall({
      source: loginMutation,
      variableValues: {
        data: {
          email: user.data.email,
          password: user.rawPassword,
        },
      },
    });

    expect(loginCall.data).toMatchObject({
      login: {
        id: user.data.id.toString(),
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        email: user.data.email,
        confirmed: user.data.confirmed,
      },
    });
  });
  it("should be able to throw an error if user with the input email was not found", async () => {
    const user = await createUser(true);

    const loginCall = await gqlCall({
      source: loginMutation,
      variableValues: {
        data: {
          email: user.data.email.concat("testtest"),
          password: user.rawPassword,
        },
      },
    });
    expect(loginCall.data?.login).toBeNull();
    expect(loginCall.errors).toBeDefined();
    expect(loginCall.errors![0]?.path![0]).toBe("login");
    expect(loginCall.errors![0]?.extensions?.code).toBe("NOT_FOUND_EXCEPTION");
  });
  it("should be able to throw an error if the user is not confirmed", async () => {
    const user = await createUser(false);

    const loginCall = await gqlCall({
      source: loginMutation,
      variableValues: {
        data: {
          email: user.data.email,
          password: user.rawPassword,
        },
      },
    });
    expect(loginCall.data?.login).toBeNull();
    expect(loginCall.errors).toBeDefined();
    expect(loginCall.errors![0]?.path![0]).toBe("login");
    expect(loginCall.errors![0]?.extensions?.code).toBe(
      "UNAUTHORIZED_EXCEPTION"
    );
  });
  it("should be able to throw an error if the password of the user is not matching", async () => {
    const user = await createUser(true);

    const loginCall = await gqlCall({
      source: loginMutation,
      variableValues: {
        data: {
          email: user.data.email,
          password: user.rawPassword.concat("asd"),
        },
      },
    });
    expect(loginCall.data?.login).toBeNull();
    expect(loginCall.errors).toBeDefined();
    expect(loginCall.errors![0]?.path![0]).toBe("login");
    expect(loginCall.errors![0]?.extensions?.code).toBe(
      "UNAUTHORIZED_EXCEPTION"
    );
  });
});
