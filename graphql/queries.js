/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      owner
      email
      iban
      address
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
      orders {
        items {
          id
          totalPrice
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          owner
          createdAt
          description
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        owner
        email
        iban
        address
        profilePicture
        name
        university
        department
        createdAt
        notes {
          nextToken
        }
        orders {
          nextToken
        }
        comments {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      university
      termID
      department
      lesson
      description
      documents {
        bucket
        region
        key
      }
      documentFiles {
        bucket
        region
        key
      }
      price
      comments {
        items {
          id
          owner
          createdAt
          description
          updatedAt
        }
        nextToken
      }
      owner
      createdAt
      student {
        id
        username
        owner
        email
        iban
        address
        profilePicture
        name
        university
        department
        createdAt
        notes {
          nextToken
        }
        orders {
          nextToken
        }
        comments {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        university
        termID
        department
        lesson
        description
        documents {
          bucket
          region
          key
        }
        documentFiles {
          bucket
          region
          key
        }
        price
        comments {
          nextToken
        }
        owner
        createdAt
        student {
          id
          username
          owner
          email
          iban
          address
          profilePicture
          name
          university
          department
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      user {
        id
        username
        owner
        email
        iban
        address
        profilePicture
        name
        university
        department
        createdAt
        notes {
          nextToken
        }
        orders {
          nextToken
        }
        comments {
          nextToken
        }
        updatedAt
      }
      note {
        id
        university
        termID
        department
        lesson
        description
        documents {
          bucket
          region
          key
        }
        documentFiles {
          bucket
          region
          key
        }
        price
        comments {
          nextToken
        }
        owner
        createdAt
        student {
          id
          username
          owner
          email
          iban
          address
          profilePicture
          name
          university
          department
          createdAt
          updatedAt
        }
        updatedAt
      }
      owner
      createdAt
      description
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          username
          owner
          email
          iban
          address
          profilePicture
          name
          university
          department
          createdAt
          updatedAt
        }
        note {
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
        owner
        createdAt
        description
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      user {
        id
        username
        owner
        email
        iban
        address
        profilePicture
        name
        university
        department
        createdAt
        notes {
          nextToken
        }
        orders {
          nextToken
        }
        comments {
          nextToken
        }
        updatedAt
      }
      notes {
        termID
        university
        createdAt
        department
        description
        documentFiles {
          bucket
          region
          key
        }
        documents {
          bucket
          region
          key
        }
        id
        lesson
        price
      }
      totalPrice
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          username
          owner
          email
          iban
          address
          profilePicture
          name
          university
          department
          createdAt
          updatedAt
        }
        notes {
          termID
          university
          createdAt
          department
          description
          id
          lesson
          price
        }
        totalPrice
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const notesByOwner = /* GraphQL */ `
  query NotesByOwner(
    $owner: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notesByOwner(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        university
        termID
        department
        lesson
        description
        documents {
          bucket
          region
          key
        }
        documentFiles {
          bucket
          region
          key
        }
        price
        comments {
          nextToken
        }
        owner
        createdAt
        student {
          id
          username
          owner
          email
          iban
          address
          profilePicture
          name
          university
          department
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
