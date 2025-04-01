import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_TODO,
  REMOVE_TODO,
  TODOS_QUERY,
  UPDATE_TODO,
} from "./document_nodes";
import { useState } from "react";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");
  const [filters, setFilters] = useState({});

  const { data, refetch } = useQuery(TODOS_QUERY, {
    variables: { filters },
  });

  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: TODOS_QUERY, variables: { filters } }],
  });

  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: TODOS_QUERY, variables: { filters } }],
  });

  const [removeTodo] = useMutation(REMOVE_TODO, {
    refetchQueries: [{ query: TODOS_QUERY, variables: { filters } }],
  });

  const createHandler = () => {
    if (newTodo.trim() === "") return;
    createTodo({ variables: { input: { title: newTodo, status: "IN_PROGRESS" } } }).then(() =>
      setNewTodo("")
    );
  };

  const updateHandler = (id) => {
    if (editText.trim() === "") return;
    updateTodo({ variables: { input: { id, title: editText } } }).then(() =>
      setEditingTodo(null)
    );
  };

  const updateStatusHandler = (id, status) => {
    updateTodo({ variables: { input: { id, status } } });
  };

  const removeHandler = (id) => {
    removeTodo({ variables: { id: parseInt(id) } }).then(() =>
      console.log("Todo removed")
    );
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo.id);
    setEditText(todo.title);
  };

  return (
    <>
      <h2>Todo List</h2>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by title..."
          value={filters.title || ""}
          onChange={(e) => setFilters({ ...filters, title: e.target.value || undefined })}
        />
        <select
          value={filters.status || ""}
          onChange={(e) => {
            const status = e.target.value === "" ? undefined : e.target.value;
            setFilters({ ...filters, status });
          }}
        >
          <option value="">All</option>
          <option value="NOT_DONE_YET">New</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <button onClick={() => refetch()}>Search</button>
      </div>

      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo..."
        />
        <button onClick={createHandler}>Add Todo</button>
      </div>

      {data &&
        data.findTodos &&
        data.findTodos.map((todo, index) => (
          <div className="todo" key={todo.id}>
            {editingTodo === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="save-btn" onClick={() => updateHandler(todo.id)}>Save</button>
                <button className="cancel-btn" onClick={() => setEditingTodo(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>
                  <strong>{index + 1})</strong> {todo.title}
                </span>
                <select
                  value={todo.status}
                  onChange={(e) => updateStatusHandler(todo.id, e.target.value)}
                >
                  <option value="NOT_DONE_YET">New</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
                <button className="edit-btn" onClick={() => handleEditTodo(todo)}>Edit</button>
                <button className="delete-btn" onClick={() => removeHandler(todo.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
    </>
  );
}

export default App;
