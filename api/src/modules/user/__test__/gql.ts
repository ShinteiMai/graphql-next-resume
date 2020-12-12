export const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
    confirmed
  }
}
`;

export const loginMutation = `
mutation Login($data: LoginInput!) {
  login(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
    confirmed
  }
}
`;
