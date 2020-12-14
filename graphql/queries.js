/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      noteMaps {
        items {
          id
          createdAt
          updatedAt
          owner
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
        profilePicture
        name
        university
        createdAt
        notes {
          nextToken
        }
        noteMaps {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($owner: String!, $createdAt: AWSDateTime!) {
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
        profilePicture
        name
        university
        createdAt
        notes {
          nextToken
        }
        noteMaps {
          nextToken
        }
        updatedAt
      }
      noteMaps {
        items {
          id
          createdAt
          updatedAt
          owner
        }
        nextToken
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
          profilePicture
          name
          university
          createdAt
          updatedAt
        }
        noteMaps {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNoteMap = /* GraphQL */ `
  query GetNoteMap($id: ID!) {
    getNoteMap(id: $id) {
      id
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
        isPrivate
        owner
        createdAt
        student {
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
        noteMaps {
          nextToken
        }
        updatedAt
      }
      user {
        id
        username
        owner
        email
        profilePicture
        name
        university
        createdAt
        notes {
          nextToken
        }
        noteMaps {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listNoteMaps = /* GraphQL */ `
  query ListNoteMaps(
    $filter: ModelNoteMapFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNoteMaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        note {
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
        user {
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
        createdAt
        updatedAt
        owner
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
          profilePicture
          name
          university
          createdAt
          updatedAt
        }
        noteMaps {
          nextToken
        }
        updatedAt
      }
      nextToken
      total
    }
  }
`;
