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
  Box,
  List,
  ListItem,
  Divider,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function Form() {
  // const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  // const [todos, setTodos] = useState(initialState);
  const [newTodo, setNewTodo] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");


  const loggedInUser = localStorage.getItem("loggedin"); 
  const initialState = JSON.parse(localStorage.getItem(`${loggedInUser}-todos`)) || [];
  const [todos, setTodos] = useState(initialState);
  
  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem(`${loggedInUser}-todos`, JSON.stringify(todos));
    }
  }, [todos, loggedInUser]);
  

  const addTodo = () => {
    if (newTodo) {
      const newTodoItem = { id: Date.now(), title: newTodo, completed: false };
      setTodos([newTodoItem, ...todos]); 

      setNewTodo(""); 
    }
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setOpenDialog(true); 
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); 
    setSelectedTodo(null);
  };

  const handleSaveEdit = () => {
    if (selectedTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === selectedTodo.id
          ? { ...todo, title: selectedTodo.title }
          : todo
      );
      setTodos(updatedTodos);
      handleCloseDialog(); 
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
    setTodos(todos.filter((todo) => todo.id !== todoId)); 
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
    setViewAllOpen(true); 
  };

  const handleCloseViewAll = () => {
    setViewAllOpen(false); 
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
    e.preventDefault(); 
  };

  


  return (
    
    <Box>
      {/* TextField for adding new Todo */}

      <Stack display="flex" direction="row">
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
          sx={{ color: "white" }}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Stack>

      <Divider
        sx={{
          marginTop: "30px",
          marginBottom: "30px",
          backgroundColor: "white",
        }}
      />

      {/* Search Field */}

      <Stack
        spacing={2}
        display="flex"
        direction="row"
        justifyContent="space-between"
      >
        <TextField
          label="Search Tasks"
          placeholder="Search tasks by keyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          sx={{
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
          size="small"
          value={filterStatus}
          onChange={handleFilterChange}
          sx={{
            width: 150,
            color: "white",
            border: "1px solid white", 
            "& .MuiSelect-icon": { color: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" }, 
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
          size="small"
          sx={{
            backgroundColor: "white",
            color: "#000000",
            height: "56px",
            "@media (max-width: 685px)": {
              width: "100%", 
              height: "auto", 
            },
          }}
        >
          View Tasks
        </Button>
      </Stack>
      <Divider
        sx={{
          marginTop: "30px",
          marginBottom: "30px",
          backgroundColor: "white",
        }}
      />

      <Typography variant="h5" sx={{ color: "white", textAlign:"center" }}>
        Task-List
      </Typography>

      {filteredTodos?.length > 0 && (
        <Stack>
          <List>
            {currentTodos.map((todo, index) => (
              <ListItem
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
                <TextField
                  value={todo.title}
                  sx={{
                    mr:2,
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "lightgray" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                    "& .MuiInputBase-input": {
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "gray" : "white",
                      textOverflow: "ellipsis",
                    },
                  }}
                  onClick={() => handleEdit(todo)}
                  readOnly={!todo.completed} 
                  fullWidth
                />

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
                  sx={{ color: "red " }}
                >
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
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
        </Stack>
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
            <List key={todo.id}>
              <ListItem
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
              </ListItem>
            </List>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewAll} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Form;
