import 'jest-extended';
import { gqlCall } from '@utils/test';
import {
  createExperienceMutation,
  deleteExperienceMutation,
  experienceQuery,
  experiencesByProfileQuery,
  experiencesQuery,
  updateExperienceMutation,
} from './gql';
import { Profile } from '@db/entity';
import { factory, useSeeding } from 'typeorm-seeding';
import * as faker from 'faker';

describe('Experience Resolver', () => {
  it('should be able to query and paginate list of experiences', async () => {
    const experiencesCall = await gqlCall({
      source: experiencesQuery,
      variableValues: {
        options: {
          order: 'ASC',
          limit: 5,
        },
      },
    });

    const experiences = experiencesCall.data?.experiences;
    expect(experiences?.data.length).toBe(5);
    for (const exp of experiences?.data) {
      expect(exp).toEqual({
        id: expect.any(String),
        role: expect.any(String),
        company: expect.any(String),
        companyUrl: expect.any(String),
        startDate: expect.any(String),
        endDate: expect.toBeOneOf([expect.any(String), null]),
      });
    }
    const paginateCall = await gqlCall({
      source: experiencesQuery,
      variableValues: {
        options: {
          order: 'ASC',
          limit: 5,
          afterCursor: experiences?.cursor.afterCursor,
        },
      },
    });

    const paginate = paginateCall.data?.experiences;
    expect(paginate?.data.length).toBe(5);
  });

  it('should be able to query a list of experience by a profile', async () => {
    const experiencesCall = await gqlCall({
      source: experiencesByProfileQuery,
      variableValues: {
        profileId: '1',
      },
    });
    const experiences = experiencesCall.data?.experiencesByProfile;

    for (const exp of experiences) {
      expect(exp).toEqual({
        id: expect.any(String),
        role: expect.any(String),
        company: expect.any(String),
        companyUrl: expect.any(String),
        startDate: expect.any(String),
        endDate: expect.toBeOneOf([expect.any(String), null]),
      });
    }
  });

  it('should be able to query a single experience', async () => {
    const experienceCall = await gqlCall({
      source: experienceQuery,
      variableValues: {
        options: {
          attribute: 'id',
          query: '2',
        },
      },
    });
    const data = experienceCall.data?.experience;
    expect(data).toEqual({
      id: expect.any(String),
      role: expect.any(String),
      company: expect.any(String),
      companyUrl: expect.any(String),
      startDate: expect.any(String),
      endDate: expect.toBeOneOf([expect.any(String), null]),
    });
  });

  it('should be able to create new experience', async () => {
    await useSeeding();
    const profile = await factory(Profile)().create();

    const data = {
      role: faker.name.jobTitle(),
      company: faker.company.companyName(),
      companyUrl: faker.internet.url(),
      startDate: new Date(faker.date.past()).toISOString(),
      endDate: new Date(faker.date.future()).toISOString(),
    };

    const response = await gqlCall({
      source: createExperienceMutation,
      variableValues: {
        data: {
          ...data,
          profileId: profile.id.toString(),
        },
      },
    });

    const responseObject = response.data?.createExperience;
    expect(responseObject).toEqual({
      ...data,
      id: expect.any(String),
    });
  });

  it('should be able to update an experience', async () => {
    const experienceId = '1';
    const data = {
      role: faker.name.jobTitle(),
      company: faker.company.companyName(),
      companyUrl: faker.internet.url(),
      startDate: new Date(faker.date.past()).toISOString(),
      endDate: new Date(faker.date.future()).toISOString(),
    };

    const updateCall = await gqlCall({
      source: updateExperienceMutation,
      variableValues: {
        id: experienceId,
        data: {
          ...data,
          profileId: '1',
        },
      },
    });

    const responseObject = updateCall.data?.updateExperience;
    expect(responseObject).toEqual({
      ...data,
      id: experienceId,
    });
  });

  it('should be able to delete an experience', async () => {
    const experienceId = '1';
    const deleteCall = await gqlCall({
      source: deleteExperienceMutation,
      variableValues: {
        id: experienceId,
      },
    });

    const responseObject = deleteCall.data?.deleteExperience;
    expect(responseObject).toEqual({
      id: expect.any(String),
      role: expect.any(String),
      company: expect.any(String),
      companyUrl: expect.any(String),
      startDate: expect.any(String),
      endDate: expect.toBeOneOf([expect.any(String), null]),
    });
  });
});
