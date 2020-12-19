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
      addOnMaps {
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
        addOnMaps {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAddOnMap = /* GraphQL */ `
  query GetAddOnMap($id: ID!) {
    getAddOnMap(id: $id) {
      id
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
        addOnMaps {
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
        addOnMaps {
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
export const listAddOnMaps = /* GraphQL */ `
  query ListAddOnMaps(
    $filter: ModelAddOnMapFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddOnMaps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
        createdAt
        updatedAt
        owner
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
        addOnMaps {
          nextToken
        }
        updatedAt
      }
      addOnMaps {
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
        addOnMaps {
          nextToken
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
          profilePicture
          name
          university
          createdAt
          updatedAt
        }
        addOnMaps {
          nextToken
        }
        updatedAt
      }
      nextToken
      total
    }
  }
`;
