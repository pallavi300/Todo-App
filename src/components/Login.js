import {
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users"));

    if (storedUsers) {
      const user = storedUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Reset todos for the new user
        localStorage.setItem("todos", JSON.stringify([]));
        localStorage.setItem("loggedin", formData.email); // Save the logged-in user's email
        alert("User login successfully!");

        navigate("/");
      } else {
        alert("Incorrect email or password");
      }
    } else {
      alert("No registered users found.");
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", width: "500px", backgroundColor: "#12343b" }}
    >
      <Typography variant="h5" align="center" marginBottom={2} color="white">
        Login
      </Typography>

      <form onSubmit={handleLogin}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
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
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
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
        </FormControl>

        <FormControl fullWidth margin="normal">
          <Button
            type="submit"
            variant="contained"
            sx={{ color: "black", backgroundColor: "white" }}
          >
            Submit
          </Button>
        </FormControl>
      </form>
      <Typography variant="body1" color="white">
        Don't have an account?
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "white", marginLeft: 5 }}
        >
          <u>Register here</u>
        </Link>
      </Typography>
    </Paper>
  );
}

export default Login;
