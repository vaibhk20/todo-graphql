import React from "react";

const TodoInput = (props) => {
  const { todo, handleSubmit, onChangeHandler } = props;
  return (
    <>
      <form className="mb-3 drop-shadow-lg">
        <input
          type="text"
          placeholder="What needs to be done?"
          className=" m-0 w-96 py-4 px-2 italic font-thin focus:border-current"
          value={todo}
          onChange={onChangeHandler}
        />
        <button className="bg-white p-4 text-gray-400" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </>
  );
};

export default TodoInput;
