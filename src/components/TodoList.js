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
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function Form() {
  const [todos, setTodos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // To manage Dialog state
  const [selectedTodo, setSelectedTodo] = useState(null); // To hold the todo being edited



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

  const handleComplete = () => {
    alert("handleComplete button clicked!");
  };

  const handleDelete = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId)); // Delete the task
  };

  return (
    <div>
    

      {/* This section is displayed when todos are added */}
      {todos.length > 0 && (
        <div className="todo-main">
          <ul>
            {todos.map((todo) => (
              <li className="list-item" key={todo.id}>
                <input
                  type="text"
                  value={todo.title}
                  className="list"
                  onClick={() => handleEdit(todo)} // Open dialog on input click
                  readOnly
                />
                <div className="icon">
                  <IconButton
                    onClick={handleComplete}
                    aria-label="complete"
                    sx={{ color: "white" }}
                  >
                    <CheckCircleOutlinedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleEdit(todo)} // Open dialog on edit click
                    aria-label="edit"
                    sx={{ color: "white" }}
                  >
                    <EditNoteOutlinedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(todo.id)} // Delete the todo
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
