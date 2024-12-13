import { Divider, Box, Typography, Button } from "@mui/material";
import Form from "../Pages/Form";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    navigate("/login");
  };

  return (
    <Box
        sx={{
          backgroundColor: "#12343b",
          maxWidth: 500,
          width: "100%",
          minHeight: 650,
          padding: 4,
        }}
      >
      <Typography variant="h3" sx={{ color: "white" }} align="center">
        Todo-Application
      </Typography>
   
      <Box>
        <Divider sx={{ backgroundColor: "white", margin: 3, boxShadow: 2 }} />
      </Box>
  
      <Form />
     <Button 
      variant="contained" 
      style={{ backgroundColor: 'white', color: 'black' }} 
      onClick={handleLogout}
    >
      Logout
    </Button>
    </Box>
  );
}

export default Header;
