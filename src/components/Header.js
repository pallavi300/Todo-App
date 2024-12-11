import { Divider, Box } from "@mui/material";

function Header() {
  return (
    <div className="header">
      <h1>Todo-List</h1>
      {/* Shadow Divider */}
      <Box>
        <Divider sx={{ backgroundColor: "white", height: 2, margin: 6 }} />
      </Box>
    </div>
  );
}

export default Header;
