import React from "react";
import { Container } from "@mui/material";
import Header from "./components/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectRoutes from "./Services/ProtectRoutes";

function App() {
  return (
    <>
      <Container
        maxWidth="full"
        sx={{
          background: "linear-gradient(to right bottom, #e1b382, #c89666)",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectRoutes />}>
              <Route path="/" element={<Header />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </>

   
  );
}

export default App;
