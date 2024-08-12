import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./ListTodo.css";

const ListTodo = () => {
  const schema = yup.object().shape({
    todo: yup.string().required("Todo field should not be empty")
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  const addTodoItem = (data) => {
    const { todo } = data;
    const currentTodos = [...todos];

    if (editIndex === -1) {
      setTodos([
        ...currentTodos,
        {
          id: currentTodos.length,
          name: todo,
          completed: false // Add the completed property
        },
      ]);
      reset();
    } else {
      currentTodos[editIndex].name = editText;
      setTodos(currentTodos);
      setEditIndex(-1);
      setEditText("");
    }
  };

  const editTodoItem = (index) => {
    const todoToEdit = todos[index];
    setEditText(todoToEdit.name);
    setEditIndex(index);
  };

  const deleteTodoItem = (index) => {
    const reducedTodo = [...todos];
    reducedTodo.splice(index, 1);
    setTodos(reducedTodo);
  };

  const completeTodoItem = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed; // Toggle the completed state
    setTodos(updatedTodos);
  };

  const saveEdit = () => {
    const currentTodos = [...todos];
    currentTodos[editIndex].name = editText;
    setTodos(currentTodos);
    setEditIndex(-1);
    setEditText("");
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <div className="header">
          <h1>Todo-List 📔</h1>
          {/* Form for adding new todos */}
          <form onSubmit={handleSubmit(addTodoItem)}>
            <input
              type="text"
              placeholder="Enter a Todo"
              className="task-input"
              {...register("todo")}
              disabled={editIndex !== -1}
            />
            <p style={{ color: "white", paddingBottom: "15px" }}>{errors.todo?.message}</p>
            <button className="button-add" type="submit" disabled={editIndex !== -1}>
              Add
            </button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <li key={index} className="list-item">
                {editIndex === index ? (
                  <div>
                    <input
                      className="edit-input"
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      onClick={saveEdit}
                      className="button-save"
                    >
                      ✔
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="list" style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                      {todo.name}
                    </p>
                    <button
                      onClick={() => editTodoItem(index)}
                      className="button-edit"
                    >
                      📝
                    </button>
                  </>
                )}
                <button
                  onClick={() => deleteTodoItem(index)}
                  className="button-delete"
                >
                  ❌
                </button>
                <button
                  onClick={() => completeTodoItem(index)}
                  className="button-complete"
                >
                  ☑
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListTodo;
