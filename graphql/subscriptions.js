/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($owner: String) {
    onCreateNote(owner: $owner) {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($owner: String) {
    onUpdateNote(owner: $owner) {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($owner: String) {
    onDeleteNote(owner: $owner) {
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
export const onCreateNoteMap = /* GraphQL */ `
  subscription OnCreateNoteMap($owner: String) {
    onCreateNoteMap(owner: $owner) {
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
export const onUpdateNoteMap = /* GraphQL */ `
  subscription OnUpdateNoteMap($owner: String) {
    onUpdateNoteMap(owner: $owner) {
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
export const onDeleteNoteMap = /* GraphQL */ `
  subscription OnDeleteNoteMap($owner: String) {
    onDeleteNoteMap(owner: $owner) {
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
