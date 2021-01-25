import "jest-extended";
import { gqlCall } from "@utils/test";
import {
  profilesQuery,
  profileQuery,
  createProfileMutation,
  updateProfileMutation,
  deleteProfileMutation,
} from "./gql";
import * as faker from "faker";

describe("Profile Resolver", () => {
  it("should be able to query and paginate list of profiles", async () => {
    const profilesCall = await gqlCall({
      source: profilesQuery,
      variableValues: {
        options: {
          order: "DESC",
          limit: 10,
        },
      },
    });

    const profiles = profilesCall.data?.profiles;
    expect(profiles?.data.length).toBe(10);
    for (const profile of profiles?.data) {
      expect(profile).toEqual({
        id: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.toBeOneOf([expect.any(String), null]),
        biography: expect.any(String),
        shortBiography: expect.any(String),
        profileImageUrl: expect.toBeOneOf([expect.any(String), null]),
        resumeUrl: expect.toBeOneOf([expect.any(String), null]),
        createdAt: expect.any(String),
        updatedAt: expect.toBeOneOf([expect.any(String), null]),
      });
    }
  });

  it("should be able to find a single profile given an id", async () => {
    const profileCall = await gqlCall({
      source: profileQuery,
      variableValues: {
        options: {
          attribute: "id",
          query: "1",
        },
      },
    });
    const data = profileCall.data?.profile;
    expect(data).toEqual({
      id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.toBeOneOf([expect.any(String), null]),
      biography: expect.any(String),
      shortBiography: expect.any(String),
      profileImageUrl: expect.toBeOneOf([expect.any(String), null]),
      resumeUrl: expect.toBeOneOf([expect.any(String), null]),
      createdAt: expect.any(String),
      updatedAt: expect.toBeOneOf([expect.any(String), null]),
    });
  });

  it("should be throw a NotFoundException when a single profile was not found", async () => {
    const profileCall = await gqlCall({
      source: profileQuery,
      variableValues: {
        options: {
          attribute: "id",
          query: "1000",
        },
      },
    });
    const error = profileCall.errors![0];
    expect(error.message).toEqual("Profile with the id of 1000 was not found");
    expect(error.extensions?.code).toEqual("NotFoundException");
  });

  it("should be able to create a new profile", async () => {
    const data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      biography: faker.lorem.paragraphs(4),
      shortBiography: faker.lorem.paragraph(),
      profileImageUrl: faker.image.avatar(),
      resumeUrl: faker.image.nature(),
    };

    const res = await gqlCall({
      source: createProfileMutation,
      variableValues: {
        data,
      },
    });

    const responseObject = res.data?.createProfile;
    expect(responseObject).toEqual({
      ...data,
      id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.toBeOneOf([expect.any(String), null]),
    });
  });

  it("should be able to update a profile and return it", async () => {
    const profileId = "1";
    const profileCall = await gqlCall({
      source: profileQuery,
      variableValues: {
        options: {
          attribute: "id",
          query: profileId,
        },
      },
    });
    const data = profileCall.data?.profile;
    expect(data).toEqual({
      id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.toBeOneOf([expect.any(String), null]),
      biography: expect.any(String),
      shortBiography: expect.any(String),
      profileImageUrl: expect.toBeOneOf([expect.any(String), null]),
      resumeUrl: expect.toBeOneOf([expect.any(String), null]),
      createdAt: expect.any(String),
      updatedAt: expect.toBeOneOf([expect.any(String), null]),
    });
    const mockData = { ...data };

    delete mockData.id;
    delete mockData.createdAt;
    delete mockData.updatedAt;

    const mutatedData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      biography: faker.lorem.paragraphs(4),
      resumeUrl: faker.image.nature(),
    };

    const updateCall = await gqlCall({
      source: updateProfileMutation,
      variableValues: {
        data: {
          ...mockData,
          ...mutatedData,
        },
        id: profileId,
      },
    });
    const updatedData = updateCall.data?.updateProfile;
    expect(updatedData).toEqual({
      ...data,
      ...mutatedData,
      updatedAt: expect.toBeOneOf([expect.any(String), null]),
    });
  });

  it("should be able to delete a profile correctly", async () => {
    const profileId = "1";
    const deleteCall = await gqlCall({
      source: deleteProfileMutation,
      variableValues: {
        id: profileId,
      },
    });

    const data = deleteCall.data?.deleteProfile;
    expect(data).toEqual({
      id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.toBeOneOf([expect.any(String), null]),
      biography: expect.any(String),
      shortBiography: expect.any(String),
      profileImageUrl: expect.toBeOneOf([expect.any(String), null]),
      resumeUrl: expect.toBeOneOf([expect.any(String), null]),
      createdAt: expect.any(String),
      updatedAt: expect.toBeOneOf([expect.any(String), null]),
    });

    const profileCall = await gqlCall({
      source: profileQuery,
      variableValues: {
        options: {
          attribute: "id",
          query: profileId,
        },
      },
    });

    const error = profileCall.errors![0];
    expect(error.message).toEqual(
      `Profile with the id of ${profileId} was not found`
    );
    expect(error.extensions?.code).toEqual("NotFoundException");
  });
});
