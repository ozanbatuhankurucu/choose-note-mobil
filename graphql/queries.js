/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      notes {
        items {
          id
          university
          termID
          department
          lesson
          description
          isPrivate
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
        profilePicture {
          bucket
          region
          key
        }
        name
        university
        createdAt
        notes {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($owner: String!, $createdAt: String!) {
    getNote(owner: $owner, createdAt: $createdAt) {
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
      isPrivate
      owner
      createdAt
      student {
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
        notes {
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
    $owner: String
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listNotes(
      owner: $owner
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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
        isPrivate
        owner
        createdAt
        student {
          id
          username
          owner
          email
          name
          university
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchNotes = /* GraphQL */ `
  query SearchNotes(
    $filter: SearchableNoteFilterInput
    $sort: SearchableNoteSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchNotes(
      filter: $filter
      sort: $sort
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
        isPrivate
        owner
        createdAt
        student {
          id
          username
          owner
          email
          name
          university
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
      total
    }
  }
`;
