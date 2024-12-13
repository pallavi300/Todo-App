import {
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.some(
      (user) => user.email === formData.email
    );

    if (userExists) {
      alert("Email already registered!");
    } else {
      const updatedUsers = [...storedUsers, formData];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("User registered successfully!");

      navigate("/login");
    }
  };
  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", width: "500px", backgroundColor: "#12343b" }}
    >
      <Typography variant="h5" align="center" marginBottom={2} color="white">
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="off" 
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
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="off" 
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
            autoComplete="off" 
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
          to="/login"
          style={{ textDecoration: "none", color: "white", marginLeft: 5 }}
        >
          <u>Login here</u>
        </Link>
      </Typography>
    </Paper>
  );
}

export default Register;
