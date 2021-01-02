/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($owner: String) {
    onCreateComment(owner: $owner) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($owner: String) {
    onUpdateComment(owner: $owner) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($owner: String) {
    onDeleteComment(owner: $owner) {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($owner: String!) {
    onCreateOrder(owner: $owner) {
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
      totalPrice
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($owner: String!) {
    onUpdateOrder(owner: $owner) {
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
      totalPrice
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($owner: String!) {
    onDeleteOrder(owner: $owner) {
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
      totalPrice
      owner
      createdAt
      updatedAt
    }
  }
`;
