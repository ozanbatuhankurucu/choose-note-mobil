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
      department
      createdAt
      notes {
        items {
          id
          university
          termID
          department
          lesson
          description
          price
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
