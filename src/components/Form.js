import React, { useState, useEffect } from "react";
import {
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Pagination,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function Form() {
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initialState);
  const [newTodo, setNewTodo] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo) {
      const newTodoItem = { id: Date.now(), title: newTodo, completed: false };
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

  // Pagination Logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

  const filteredTodos =
    filterStatus === "All"
      ? todos.filter((todo) =>
          todo.title.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      : todos.filter(
          (todo) =>
            todo.completed === (filterStatus === "Completed") &&
            todo.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );

  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleViewAll = () => {
    setViewAllOpen(true); // Open view all dialog
  };

  const handleCloseViewAll = () => {
    setViewAllOpen(false); // Close view all dialog
  };

  // Drag-and-drop handlers
  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const onDrop = (e, targetIndex) => {
    const startIndex = e.dataTransfer.getData("index");
    const newTodos = [...todos];
    const [removedTask] = newTodos.splice(startIndex, 1);
    newTodos.splice(targetIndex, 0, removedTask);
    setTodos(newTodos);
  };

  const onDragOver = (e) => {
    e.preventDefault(); // Prevent default dragging behavior
  };

  return (
    <div>
      <div>
        {/* Search Field */}
        <TextField
          label="Search Tasks"
          placeholder="Search tasks by keyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          sx={{
            mb: 2,
            width: 300,
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "lightgray" },
            },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
          }}
        />

        <Select
          value={filterStatus}
          onChange={handleFilterChange}
          sx={{
            ml: 2,
            mb: 2,
            width: 150,
            color: "white",
            border: "1px solid white", // Directly set border to white

            "& .MuiSelect-icon": { color: "white" }, // Optional: Set the icon color
            "&.Mui-focused fieldset": { borderColor: "white" }, // Set focus border color to white
          }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Incomplete">Incomplete</MenuItem>
        </Select>

        <Button
          variant="contained"
          color="primary"
          onClick={handleViewAll}
          size="large"
          sx={{
            ml: "15px",
            backgroundColor: "white",
            color: "#000000",
            height: "56px",
          }}
        >
          View All Tasks
        </Button>
      </div>
      <Stack display="flex" direction="row">
        {/* TextField for adding new Todo */}
        <TextField
          fullWidth
          size="medium"
          id="outlined-textarea"
          label="Task"
          placeholder="Enter a new task"
          multiline
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          sx={{
            pr: "15px",
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

        <IconButton
          type="submit"
          onClick={addTodo}
          aria-label="complete"
          fontSize
          large
          sx={{ color: "white", mb: "15px" }}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Stack>

      {filteredTodos.length > 0 && (
        <div className="todo-main" style={{ marginTop: "50px" }}>
          <ul>
            {currentTodos.map((todo, index) => (
              <li
                className="list-item"
                key={todo.id}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDrop={(e) => onDrop(e, index)}
                onDragOver={onDragOver}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={todo.title}
                  className="list"
                  style={{
                    textDecoration: todo.completed ? "Line-through" : "none",
                    color: todo.completed ? "gray" : "white",
                    textOverflow: "ellipsis",
                  }}
                  onClick={() => handleEdit(todo)}
                  readOnly
                />
                <div>
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
          <Stack display="flex" direction="row" justifyContent="flex-end">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                marginTop: "16px",
                "& .MuiPaginationItem-root": {
                  color: "white",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
              }}
            />
          </Stack>
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
            backgroundColor: "#12343b",
            marginBottom: "16px",
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "lightgray" },
            },
            "& .MuiInputLabel-root": { color: "white" },
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>Edit Todo</DialogTitle>
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

      {/* Dialog for Viewing All Tasks */}
      <Dialog
        open={viewAllOpen}
        onClose={handleCloseViewAll}
        sx={{
          "& .MuiDialog-paper": {
            width: "500px",
            maxWidth: "none",
            height: "auto",
            backgroundColor: "#12343b",
            marginBottom: "16px",
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "lightgray" },
            },
            "& .MuiInputLabel-root": { color: "white" },
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>View All Tasks</DialogTitle>
        <DialogContent>
          {todos.map((todo, index) => (
            <ul>
              <li
                key={todo.id}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDrop={(e) => onDrop(e, index)}
                onDragOver={onDragOver}
                style={{
                  marginBottom: "8px",
                  backgroundColor: "#1e2a3a",
                  padding: "10px",
                  borderRadius: "5px",
                  color: "white",
                }}
              >
                {todo.title}
              </li>
            </ul>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewAll} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Form;
