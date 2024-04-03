import React from "react";
import { useState, useRef, useEffect } from "react";
// import { TiTick, TiEdit, } from 'react-icons/ti';
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";

const ToDo = () => {
  const [toDo, setTodo] = useState("");
  const [toDos, setTodos] = useState([]);

  // for todoedit 'usestate'
  const [editId, seteditId] = useState(0);

  const addTodo = () => {
    // Prevent adding todo if input is empty or contains only spaces
    if (toDo.trim() !== "") {
      if (!editId) {
        setTodos([...toDos, { list: toDo, id: Date.now(), status: false }]);
      } else {
        const editTodo = toDos.find((todo) => todo.id === editId);
        const updateTodo = toDos.map((to) =>
          to.id === editTodo.id
            ? (to = { id: to.id, list: toDo })
            : (to = { id: to.id, list: to.list })
        );
        setTodos(updateTodo);
        seteditId(0);
      }
      // Clear input field after adding or editing todo
      setTodo("");
    } else {
      // Handle case when input is empty or contains only spaces
      alert("Please enter a valid todo.");
    }
  };

  // to Handle form submit reload;
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //useRef
  const inputRef = useRef("null");

  //useEffect
  useEffect(() => {
    inputRef.current.focus();
  });

  //DELETE
  const onDelete = (id) => {
    setTodos(toDos.filter((to) => to.id !== id));
  };

  //COMPLTE TASK

  const onComplete = (id) => {
    let complete = toDos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };

  //EDIT
  const onEdit = (id) => {
    const editTodo = toDos.find((to) => to.id === id);
    setTodo(editTodo.list);
    seteditId(editTodo.id);
  };

  return (
    <div className="main-body">
      <h2>TODO APP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your todo"
          value={toDo}
          ref={inputRef}
          onChange={(event) => setTodo(event.target.value)}
        />
        <button style={{ backgroundColor: "black" }} onClick={addTodo}>
          {editId ? "EDIT" : "ADD"}
        </button>
      </form>

      <div>
        <ul className="todo-list">
          {toDos.map((to, index) => (
            <li key={index} className="todo-item">
              <div id={to.status ? "list-item" : ""}>{to.list}</div>
              <div className="todo-icons">
                <IoMdDoneAll onClick={() => onComplete(to.id)} />
                <FiEdit onClick={() => onEdit(to.id)} />
                <MdDelete onClick={() => onDelete(to.id)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDo;
