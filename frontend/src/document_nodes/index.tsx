import { gql } from "@apollo/client";

export const TODOS_QUERY = gql`
  query FindTodos($filters: FindTodoInput) {
    findTodos(filters: $filters) {
      id
      title
      status
      createdAt
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(createTodoInput: $input) {
      id
      title
      status
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(updateTodoInput: $input) {
      id
      title
      status
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation RemoveTodo($id: Int!) {
    removeTodo(id: $id) {
      id
    }
  }
`;
