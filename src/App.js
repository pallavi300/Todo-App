import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import Form from "./components/Form";
import Header from "./components/Header";

function App() {
  return (
    <Container
      maxWidth="full"
      sx={{
        background: "linear-gradient(to right bottom, #e1b382, #c89666)",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Box
      sx={{
        backgroundColor: "#12343b",
        maxWidth: 500,
        width: "100%", // Full width when screen size is less than 700px
        minHeight: 650,
        padding: 4,
        borderRadius: 2,
        '@media (max-width: 700px)': {
          maxWidth: '100%', // Make full width for screen sizes less than 700px
        },
      }}
    >
      {/* Content goes here */}
 
        <Box textAlign="center" mb={3} sx={{ color: "#fff", margin: "30px 0" }}>
          <Header  />
        </Box>

        <Form />
      </Box>
    </Container>
  );
}

export default App;
