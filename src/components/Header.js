import { Divider, Box, Typography } from "@mui/material";

function Header() {
  return (
    <Box textAlign="center" mb={3}>
      <Typography variant="h3" sx={{ color: "white" }}>
        Todo-Application
      </Typography>
      <Box>
        <Divider sx={{ backgroundColor: "white", margin: 3, boxShadow: 2 }} />
      </Box>
    </Box>
  );
}

export default Header;
