/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
export const createNoteMap = /* GraphQL */ `
  mutation CreateNoteMap(
    $input: CreateNoteMapInput!
    $condition: ModelNoteMapConditionInput
  ) {
    createNoteMap(input: $input, condition: $condition) {
      id
      note {
        id
      }
      user {
        id
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateNoteMap = /* GraphQL */ `
  mutation UpdateNoteMap(
    $input: UpdateNoteMapInput!
    $condition: ModelNoteMapConditionInput
  ) {
    updateNoteMap(input: $input, condition: $condition) {
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
export const deleteNoteMap = /* GraphQL */ `
  mutation DeleteNoteMap(
    $input: DeleteNoteMapInput!
    $condition: ModelNoteMapConditionInput
  ) {
    deleteNoteMap(input: $input, condition: $condition) {
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
