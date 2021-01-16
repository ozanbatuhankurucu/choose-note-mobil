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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
