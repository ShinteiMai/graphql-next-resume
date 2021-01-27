export const experiencesQuery = `
query experiences($options: QueryOptionsInput!) {
  experiences(options: $options) {
    data {
      id
      role
      company
      companyUrl
      startDate
      endDate
    }   
    cursor {
      beforeCursor
      afterCursor
    }
  }
}
`;

export const experiencesByProfileQuery = `
query experiencesByProfile($profileId: String!) {
  experiencesByProfile(profileId: $profileId) {
    id
    role
    company
    companyUrl
    startDate
    endDate
  }
} 
`;

export const experienceQuery = `
query experience($options: FindOneInput!) {
  experience(options: $options) {
    id
    role
    company
    companyUrl
    startDate
    endDate
  }
}
`;

export const createExperienceMutation = `
mutation createExperience($data: ExperienceInput!) {
  createExperience(data: $data) {
    id
    role
    company
    companyUrl
    startDate
    endDate
  }
}
`;

export const updateExperienceMutation = `
mutation updateExperience($id: String!, $data: ExperienceInput!) {
  updateExperience(id: $id, data: $data) {
    id
    role
    company
    companyUrl
    startDate
    endDate
  }
}
`;
export const deleteExperienceMutation = `
mutation deleteExperience($id: String!) {
  deleteExperience(id: $id) {
    id
    role
    company
    companyUrl
    startDate
    endDate
  }
}
`;

export const experiencePointsQuery = `
query ExperiencePoints($options: QueryOptionsInput!) {
  experiencePoints(
    options: $options
  ) {
    data {
      id
      description
    }
    cursor {
      beforeCursor
      afterCursor
    }
  }
}
`;

export const experiencePointQuery = `
query ExperiencePoint($options: FindOneInput!) {
  experiencePoint(
    options: $options
  ) {
    id
    description
  }
}
`;

export const createExperiencePointMutation = `
mutation createExperiencePoint($data: ExperiencePointInput!, $experienceId: String!) {
  createExperiencePoint(data: $data, experienceId: $experienceId) {
    id
    description
  }
}
`;

export const updateExperiencePointMutation = `
mutation updateExperiencePoint($data: ExperiencePointInput!, $id: String!) {
  updateExperiencePoint(data: $data, id: $id) {
    id
    description
  }
}
`;

export const deleteExperiencePointMutation = `
mutation deleteExperiencePoint($id: String!) {
  deleteExperiencePoint(id: $id) {
    id
    description
  }
}
`;
