import React, { useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { GET_TODOS } from "../GrpahQL/Query";
import {
  ADD_TODO,
  DEL_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
} from "../GrpahQL/Mutations";

const Todo = () => {
  const [todoItem, setTodoItem] = useState("");
  const [editedItem, setEdited] = useState("");
  const labelRef = useRef();
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  const [insert_getTodos_one] = useMutation(ADD_TODO, {
    onCompleted: () => {
      refetch();
    },
  });
  const [delete_getTodos_by_pk] = useMutation(DEL_TODO, {
    onCompleted: () => {
      refetch();
    },
  });
  const [update_getTodos] = useMutation(TOGGLE_TODO, {
    onCompleted: () => {
      refetch();
    },
  });
  const [updateMutation] = useMutation(UPDATE_TODO, {
    onCompleted: () => {
      refetch();
    },
  });

  const onChangeInput = (e) => {
    setTodoItem(e.target.value);
  };

  const addTodoState = (e) => {
    e.preventDefault();
    setTodoItem(e.target.value);
    if (todoItem !== " " || /^\s*$/.test(todoItem)) {
      let temp_id = Date.now();
      insert_getTodos_one({
        variables: {
          id: temp_id,
          task: todoItem,
          isCompleted: false,
        },
      });
    }
  };

  const handleDelete = (id) => {
    delete_getTodos_by_pk({
      variables: {
        id: id,
      },
    });
  };

  const handleChange = (id) => {
    data.getTodos.map((todo) => {
      if (todo.id === id) {
        let newToggle = !todo.isCompleted;
        update_getTodos({
          variables: {
            _eq: id,
            isCompleted: newToggle,
          },
        });
      }
    });
  };

  const handleEdit = (e) => {
    setEdited(e.target.textContent);
  };

  const handleEditKey = (e) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const handleBlurSubmit = (id) => {
    updateTodo(id);
  };

  const updateTodo = (id) => {
    if (!editedItem) {
      delete_getTodos_by_pk({
        variables: {
          id: id,
        },
      });
      return;
    }
    updateMutation({
      variables: { _eq: id, task: editedItem },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <h1 className="text-center text-9xl text-[#e8d4d5] font-thin">todo</h1>
      <TodoInput
        todo={todoItem}
        handleSubmit={addTodoState}
        onChangeHandler={onChangeInput}
      />
      {data?.getTodos?.map((todo) => {
        if (loading) {
          return <h5>loading..</h5>;
        }
        if (error) {
          console.log(error.message);
        } else {
          return (
            <TodoList
              value={todo.task}
              key={todo.id}
              isCompleted={todo.isCompleted}
              handleDelete={() => handleDelete(todo.id)}
              handleChange={() => handleChange(todo.id)}
              handleEdit={handleEdit}
              handleEditKey={(e) => handleEditKey(e)}
              handleBlurSubmit={() => handleBlurSubmit(todo.id)}
              labelRef={labelRef}
            />
          );
        }
      })}
    </div>
  );
};

export default Todo;
