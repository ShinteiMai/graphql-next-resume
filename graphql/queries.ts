import gql from 'graphql-tag';

/** Profiles */
export const profilesQuery = gql`
  query Profiles($options: QueryOptionsInput!) {
    profiles(options: $options) {
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
export const profileQuery = gql`
query Profile(options: FindOneInput!) {
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

/** Experiences */

/** Experience Points */
