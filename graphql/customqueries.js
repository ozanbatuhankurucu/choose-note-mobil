export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      owner
      email
      profilePicture
      name
      university
      createdAt
      updatedAt
    }
  }
`;
