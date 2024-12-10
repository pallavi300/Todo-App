import React, { useState } from "react";
import {
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function Form() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [openDialog, setOpenDialog] = useState(false); // To manage Dialog state
  const [selectedTodo, setSelectedTodo] = useState(null); // To hold the todo being edited

  const addTodo = () => {
    if (newTodo) {
      const newTodoItem = { id: Date.now(), title: newTodo };
      setTodos([...todos, newTodoItem]);
      setNewTodo(""); // Clear the input field
    }
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setOpenDialog(true); // Open dialog when clicking on the edit button
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close dialog
    setSelectedTodo(null); // Reset selected todo
  };

  const handleSaveEdit = () => {
    if (selectedTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === selectedTodo.id
          ? { ...todo, title: selectedTodo.title }
          : todo
      );
      setTodos(updatedTodos);
      handleCloseDialog(); // Close the dialog after saving
    }
  };

  const handleComplete = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId)); // Delete the task
  };

  return (
    <div>
      {/* TextField for adding new Todo */}
      <TextField
        id="outlined-textarea"
        label="Task"
        placeholder="Enter a new task"
        multiline
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        sx={{
          pr: "15px",
          width: "300px",
          marginBottom: "16px",
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "lightgray" },
            "&.Mui-focused fieldset": { borderColor: "white" },
          },
          "& .MuiInputLabel-root": { color: "white" },
          "& .MuiInputLabel-root.Mui-focused": { color: "white" },
        }}
      />
      <button className="button-add" type="submit" onClick={addTodo}>
        Add
      </button>

      {todos.length > 0 && (
        <div className="todo-main">
          <ul>
            {todos.map((todo) => (
              <li className="list-item" key={todo.id}>
                <input
                  type="text"
                  value={todo.title}
                  className="list"
                  onClick={() => handleEdit(todo)}
                  readOnly
                />
                <div className="icon">
                  {/* <IconButton
                    onClick={handleComplete}
                    aria-label="complete"
                    sx={{ color: "white" }}
                  > */}
                 <IconButton
                    onClick={() => handleComplete(todo.id)}
                    aria-label="complete"
                    sx={{
                      color: todo.completed ? "green" : "white",
                    }}
                  >
                    
                    <CheckCircleOutlinedIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDelete(todo.id)}
                    aria-label="delete"
                    sx={{ color: "white" }}
                  >
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dialog for editing the Todo */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiDialog-paper": {
            width: "500px",
            maxWidth: "none",
            height: "300px",
            minHeight: "auto",
          },
        }}
      >
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            value={selectedTodo ? selectedTodo.title : ""}
            onChange={(e) =>
              setSelectedTodo({ ...selectedTodo, title: e.target.value })
            }
            label="Task"
            multiline
            sx={{ mt: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Form;
