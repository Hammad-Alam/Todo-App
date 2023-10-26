import React, { useState } from "react";
import "./ListTodo.css";

const ListTodo = () => {
  const [todos, setTodos] = useState([]); // To keep track of todos item in an array.
  const [currentItem, setCurrentItem] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [editIndex, setEditIndex] = useState(-1); // To track which item is being edited.

  const addTodoItem = (e) => {
    e.preventDefault();
    const currentTodos = [...todos];
    if (editIndex === -1) {
      // If not editing, add a new item.
      setTodos([
        ...currentTodos,
        {
          id: currentTodos.length,
          name: currentItem,
        },
      ]);
    } else {
      // If editing, update the existing item.
      currentTodos[editIndex].name = currentItem;
      setTodos(currentTodos);
      setEditIndex(-1); // Reset editIndex.
    }
    setCurrentItem("");
  };

  const editTodoItem = (index) => {
    const todoToEdit = todos[index];
    setCurrentItem(todoToEdit.name);
    setEditIndex(index);
  };

  const deleteTodoItem = (index) => {
    let reducedTodo = [...todos];
    reducedTodo.splice(index, 1); // Remove only the item at the specified index. Splice remove the value of specific index.
    localStorage.setItem("todos", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <div className="header">
          <h1>Todo-List 📔</h1>
          <form onSubmit={addTodoItem}>
            <input
              type="text"
              value={currentItem}
              onChange={(e) => setCurrentItem(e.target.value)}
              placeholder="Enter a Todo"
              className="task-input"
            />
            <button className="button-add" type="submit">
              {editIndex === -1 ? "Add" : "Save"}{" "}
              {/* Toggle label based on editIndex */}
            </button>
          </form>
          <ul>
            {todos.map((todo, index) => {
              return (
                <li key={index} className="list-item">
                  {editIndex === index ? (
                    <input
                      className="edit-input"
                      type="text"
                      value={currentItem}
                      onChange={(e) => setCurrentItem(e.target.value)}
                    />
                  ) : (
                    <p className="list">{todo.name}</p>
                  )}
                  <button
                    onClick={() => editTodoItem(index)}
                    className="button-edit"
                  >
                    📝
                  </button>
                  <button
                    onClick={() => deleteTodoItem(index)}
                    className="button-delete"
                  >
                    ❌
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListTodo;
