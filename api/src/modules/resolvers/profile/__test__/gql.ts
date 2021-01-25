export const profilesQuery = `
query Profiles($options: QueryOptionsInput!) {
  profiles(
    options: $options
  ) {
    data {
      id
      firstName
      lastName
      biography
      shortBiography
      profileImageUrl
      resumeUrl
      createdAt
      updatedAt
    }
    cursor {
      beforeCursor
      afterCursor
    }
  }
}
`;

export const profileQuery = `
query Profile($options: FindOneInput!) {
  profile(
    options: $options
  ) {
    id
    firstName
    lastName
    biography
    shortBiography
    profileImageUrl
    resumeUrl
    createdAt
    updatedAt
  }
}
`;

export const createProfileMutation = `
mutation CreateProfile($data: ProfileInput!) {
  createProfile(
    data: $data
  ) {
    id
    firstName
    lastName
    biography
    shortBiography
    profileImageUrl
    resumeUrl
    createdAt
    updatedAt
  }
}
`;

export const updateProfileMutation = `
mutation UpdateProfile($id: String!, $data: ProfileInput!) {
  updateProfile(
    id: $id,
    data: $data
  ) {
    id
    firstName
    lastName
    biography
    shortBiography
    profileImageUrl
    resumeUrl
    createdAt
    updatedAt
  }
}
`;

export const deleteProfileMutation = `
mutation DeleteProfile($id: String!) {
  deleteProfile(
    id: $id
  ) {
    id
    firstName
    lastName
    biography
    shortBiography
    profileImageUrl
    resumeUrl
    createdAt
    updatedAt
  }
}
`;
