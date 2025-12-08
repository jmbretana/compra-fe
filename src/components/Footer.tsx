import React from "react";
import { Box, Typography } from "@mui/material";
import { COLORS } from "@values/colors";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,
        width: "100%",
        backgroundColor: COLORS.black,
        textAlign: "center",
        padding: "0.5em",
        color: COLORS.grey_light,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="body2">
          &copy; {currentYear} Coudefly. All Rights Reserved
        </Typography>
        <Typography variant="body2">
          Questions? please contact us on{" "}
          <a
            href="https://coudefly.netlify.app/#contact"
            target="_blank"
            style={{ color: COLORS.grey }}
            rel="noreferrer"
          >
            Coudefly
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
