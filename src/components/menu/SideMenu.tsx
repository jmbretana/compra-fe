import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

import { useAuth } from "@auth/AuthContext";
import TerrainIcon from "@mui/icons-material/Terrain";
import { COLORS } from "@values/colors";

const drawerWidth = 245;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  const { isAuthenticated } = useAuth(); // Obtener estado de autenticación
  const storedUser = localStorage.getItem("user");

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          background: "hsl(220, 35%, 97%)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          mt: "calc(var(--template-frame-height, 0px) + 20px)",
          pl: "55px",
        }}
      >
        <TerrainIcon
          sx={{ color: COLORS.grey_dark, fontSize: "28px", pt: "4px" }}
        />

        <Typography
          variant="h6"
          sx={{
            color: COLORS.grey_dark,
            flexGrow: 1,
            fontWeight: 450,
            display: { xs: "none", sm: "block" },
            paddingLeft: "8px",
            pt: "0px",
            pb: "2px",
          }}
        >
          Salve
        </Typography>
      </Box>
      <Box
        sx={{
          background: "hsl(220, 35%, 97%)",
          margin: "0 5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            mt: "calc(var(--template-frame-height, 0px) + 4px)",
            height: "80vh",
            pl: "12px",
          }}
        >
          {isAuthenticated && <MenuContent />}
        </Box>
        <Divider />

        <Stack
          direction="row"
          sx={{
            p: 1,
            gap: 1,
            alignItems: "center",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Avatar
            sizes="small"
            alt="User"
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36, color: COLORS.black }}
          />
          <Box sx={{ mr: "auto", color: COLORS.black }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: "16px" }}
            >
              {storedUser}
            </Typography>
            <Typography variant="caption" sx={{ color: COLORS.black }}>
              info@email.com
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      </Box>
    </Drawer>
  );
}
