import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useThemeContext } from "@common/ThemeContext";

import {
  Box,
  colors,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import Stack from "@mui/material/Stack";

import Badge from "@mui/material/Badge";
import SettingsIcon from "@mui/icons-material/Settings";

import { useLocation, useNavigate } from "react-router-dom";
import { GetAllCarts } from "@actions/cartActions";

import { COLORS } from "@values/colors";
import { menuListItems, mainListConfigItems } from "./ItemsMenu";
//

export default function MenuContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useThemeContext(); // Obtener el tema actual

  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [carritoCount, setCarritoCount] = useState(0);
  const [showConfig, setShowConfig] = useState(false);

  const { carts } = useSelector((state: RootState) => state.cart);

  // obtener el rol del usuario desde el contexto de autenticación
  const role = localStorage.getItem("role") || "user";

  useEffect(() => {
    dispatch(GetAllCarts());
  }, []);

  useEffect(() => {
    const totalProductos: number = carts.length;
    setCarritoCount(totalProductos);
  }, [carts]);

  const goToSection = (link: string) => () => {
    navigate(link);
  };

  const onSelectConfig = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setShowConfig(!showConfig);
  };

  const onSelectConfigItem = (link: string) => {
    setAnchorEl(null);
    setShowConfig(false);
    navigate(link);
  };

  const filteredMenuItems = mainListConfigItems.filter((item) =>
    item.roles.includes(role)
  ); // Filter menu items based on user role

  const viewMenuConfig = (
    <>
      {role === "admin" && (
        <ListItem
          sx={{
            padding: "5px 9px",
            ":hover": {
              color: COLORS.black + " !important",
            },
          }}
        >
          <IconButton
            aria-label={"Config"}
            size="large"
            sx={{
              ":hover": {
                backgroundColor: colors.grey[200],
                color: COLORS.grey,
              },
              color: COLORS.black,
            }}
            onClick={onSelectConfig}
          >
            <SettingsIcon />
          </IconButton>
        </ListItem>
      )}

      <Menu
        id="basic-menu"
        open={showConfig}
        anchorEl={anchorEl}
        onClose={() => setShowConfig(false)}
      >
        {showConfig &&
          filteredMenuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => onSelectConfigItem(item.link)}
              sx={{
                fontFamily: "Lexend",
                ":hover": {
                  backgroundColor: colors.blue,
                  color:
                    location.pathname.indexOf(item.name) > 0
                      ? COLORS.black
                      : COLORS.black + " !important",
                },
              }}
            >
              <ListItemIcon
                aria-label={item.name}
                onClick={() => onSelectConfigItem(item.link)}
                sx={{
                  color:
                    location.pathname.indexOf(item.name) > 0
                      ? COLORS.black
                      : COLORS.grey,
                  fontFamily: "Lexend",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                slotProps={{
                  primary: { fontFamily: "Lexend", fontSize: "14px" },
                }}
              />
            </MenuItem>
          ))}
      </Menu>
    </>
  );

  const color =
    theme.palette.mode === "dark"
      ? menuListItems.colorNight
      : menuListItems.color;

  const activeColor =
    theme.palette.mode === "dark"
      ? menuListItems.activeColorNight
      : menuListItems.activeColor;

  return (
    <>
      <Stack
        sx={{
          p: 1,
          height: "70%",
          display: "flex",
          flexDirection: "row",
          marginBottom: "10px",
        }}
      >
        <Box display={"flex"} sx={{ borderRight: "1px solid " + COLORS.grey }}>
          {menuListItems.items
            .filter(
              (item) => item.roles.includes(role) && item.name !== "carrito"
            ) // Filter items based on user role
            .map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  padding: "5px 9px",
                  ":hover": {
                    color:
                      location.pathname.indexOf(item.name) > 0
                        ? activeColor
                        : color,
                  },
                }}
              >
                <Box
                  display={"flex"}
                  onClick={goToSection(item.link)}
                  sx={{
                    paddingRight: "10px",
                    borderRadius: "25px",
                    alignContent: "center",
                    alignItems: "center",
                    padding: "2px 12px",
                    fontFamily: "Lexend",
                    gap: 1,
                    background:
                      location.pathname.indexOf(item.name) > 0
                        ? activeColor
                        : "transparent",
                    color:
                      location.pathname.indexOf(item.name) > 0
                        ? COLORS.white + " !important"
                        : COLORS.grey,

                    ":hover": {
                      backgroundColor: COLORS.grey_light,
                      color: COLORS.black + " !important",
                      cursor: "pointer",
                    },
                    fontSize: "15px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Box pt={1}>
                    {" "}
                    {item.name === "carrito" ? (
                      <Badge badgeContent={carritoCount} color="primary">
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )}
                  </Box>
                  <Box sx={{ display: { xs: "none", lg: "block" } }}>
                    {item.text}
                  </Box>
                </Box>
              </ListItem>
            ))}
        </Box>

        <Box display={"flex"}>{viewMenuConfig}</Box>

        <Box display={"flex"} sx={{ borderLeft: "1px solid " + COLORS.grey }}>
          {menuListItems.items
            .filter((item) => item.name === "carrito") // Filter items based on user role
            .map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  padding: "5px 9px",
                  ":hover": {
                    color:
                      location.pathname.indexOf(item.name) > 0
                        ? activeColor
                        : color,
                  },
                }}
              >
                <Box
                  display={"flex"}
                  onClick={goToSection(item.link)}
                  sx={{
                    paddingRight: "10px",
                    borderRadius: "25px",
                    alignContent: "center",
                    alignItems: "center",
                    padding: "2px 12px",
                    fontFamily: "Lexend",
                    gap: 1,
                    background:
                      location.pathname.indexOf(item.name) > 0
                        ? activeColor
                        : "transparent",
                    color:
                      location.pathname.indexOf(item.name) > 0
                        ? COLORS.white + " !important"
                        : COLORS.grey,

                    ":hover": {
                      backgroundColor: COLORS.grey_light,
                      color: COLORS.black + " !important",
                      cursor: "pointer",
                    },
                    fontSize: "15px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <Box pt={1}>
                    {" "}
                    {item.name === "carrito" ? (
                      <Badge badgeContent={carritoCount} color="primary">
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )}
                  </Box>
                  <Box sx={{ display: { xs: "none", lg: "block" } }}>
                    {item.text}
                  </Box>
                </Box>
              </ListItem>
            ))}
        </Box>
      </Stack>
    </>
  );
}
