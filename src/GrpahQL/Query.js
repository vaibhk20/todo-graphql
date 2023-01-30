import { gql } from "@apollo/client";
export const GET_TODOS = gql`
  {
    getTodos(order_by: { id: desc }) {
      id
      task
      isCompleted
    }
  }
`;
