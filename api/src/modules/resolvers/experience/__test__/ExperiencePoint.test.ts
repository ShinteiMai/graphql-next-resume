import { Experience } from '@db/entity';
import { gqlCall } from '@utils/test';
import 'jest-extended';
import { factory, useSeeding } from 'typeorm-seeding';
import {
  createExperiencePointMutation,
  deleteExperiencePointMutation,
  experiencePointQuery,
  experiencePointsQuery,
  updateExperiencePointMutation,
} from './gql';
import * as faker from 'faker';

describe('ExperiencePoint Resolver', () => {
  it('should be able to query and paginate list of experience points', async () => {
    const experiencePointsCall = await gqlCall({
      source: experiencePointsQuery,
      variableValues: {
        options: {
          order: 'ASC',
          limit: 5,
        },
      },
    });

    const points = experiencePointsCall.data?.experiencePoints;
    expect(points?.data.length).toBe(5);
    for (const point of points?.data) {
      expect(point).toEqual({
        id: expect.any(String),
        description: expect.any(String),
      });
    }
    expect(points?.cursor.beforeCursor).toBeOneOf([expect.any(String), null]);
    expect(points?.cursor.afterCursor).toBeOneOf([expect.any(String), null]);

    const secondCall = await gqlCall({
      source: experiencePointsQuery,
      variableValues: {
        options: {
          order: 'ASC',
          limit: 5,
          afterCursor: points?.cursor.afterCursor,
        },
      },
    });

    const nextPoints = secondCall.data?.experiencePoints;
    expect(nextPoints?.data.length).toBe(5);
    for (const point of nextPoints?.data) {
      expect(point).toEqual({
        id: expect.any(String),
        description: expect.any(String),
      });
    }
    expect(nextPoints?.cursor.beforeCursor).toBeOneOf([
      expect.any(String),
      null,
    ]);
    expect(nextPoints?.cursor.afterCursor).toBeOneOf([
      expect.any(String),
      null,
    ]);
  });

  it('should be able to find a single point given an id', async () => {
    const pointCall = await gqlCall({
      source: experiencePointQuery,
      variableValues: {
        options: {
          attribute: 'id',
          query: '1',
        },
      },
    });
    const point = pointCall.data?.experiencePoint;
    expect(point).toEqual({
      id: expect.any(String),
      description: expect.any(String),
    });
  });

  it('should be able to create a new point', async () => {
    await useSeeding();
    const experience = await factory(Experience)().create();

    const data = {
      description: faker.lorem.paragraphs(3),
    };

    const createCall = await gqlCall({
      source: createExperiencePointMutation,
      variableValues: {
        data,
        experienceId: experience.id.toString(),
      },
    });

    const responseObject = createCall.data?.createExperiencePoint;
    expect(responseObject).toEqual({
      ...data,
      id: expect.any(String),
    });
  });

  it('should be able to update a point', async () => {
    const pointId = '1';
    const data = {
      description: faker.lorem.paragraphs(3),
    };

    const updateCall = await gqlCall({
      source: updateExperiencePointMutation,
      variableValues: {
        data,
        id: pointId,
      },
    });
    const responseObject = updateCall.data?.updateExperiencePoint;
    expect(responseObject).toEqual({
      ...data,
      id: pointId,
    });
  });

  it('should be able to delete a point', async () => {
    const pointId = '1';
    const deleteCall = await gqlCall({
      source: deleteExperiencePointMutation,
      variableValues: {
        id: pointId,
      },
    });

    const responseObject = deleteCall.data?.deleteExperiencePoint;
    expect(responseObject).toEqual({
      id: pointId,
      description: expect.any(String),
    });
  });
});
