import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Box, CssBaseline, Divider } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { useAuth } from "@auth/AuthContext";
import { COLORS } from "@values/colors";
import MenuContent from "./menu/MenuContent";
import Logo from "@public/salve_logo2.svg";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const drawerWidth = 240;
const navItems = [
  {
    key: "1",
    name: "Articulos",
    link: "/products",
    color: COLORS.blue_dark,
  },
];

function HeaderComponent(props: any) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isAuthenticated, logout } = useAuth(); // Obtener estado de autenticación

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const logOutHandler = () => {
    logout();
  };

  const mobileMenu = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      data-testid="headerDOM"
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Compra
      </Typography>
      <Divider />
      <List>
        {isAuthenticated &&
          navItems.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                component={Link}
                to={item.link}
                sx={{
                  backgroundColor: COLORS.white,
                  color: item.color || "inherit",
                }}
              >
                <ListItemText primary={item.name} color={item.color} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
      <Box>
        <Button onClick={logOutHandler}>Logout</Button>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: COLORS.white, height: "60px" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box display={"flex"}>
            <img src={Logo} style={{ width: "45px", marginRight: "8px" }} />
          </Box>
          <MenuContent />
          <Box>
            <Button
              onClick={logOutHandler}
              sx={{
                color: COLORS.grey_dark,
              }}
            >
              <LogoutRoundedIcon fontSize="small" />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {mobileMenu}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}

HeaderComponent.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default HeaderComponent;
