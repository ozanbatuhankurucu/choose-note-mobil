export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      owner
      email
      profilePicture {
        bucket
        region
        key
      }
      name
      university
      createdAt
      updatedAt
    }
  }
`;
