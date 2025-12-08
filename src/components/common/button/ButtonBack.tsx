import React from "react";

import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@common/theme/getSignUpTheme";
import { SxProps } from "@mui/system"; // Import SxProps for MUI styles
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { COLORS } from "@values/colors";

interface ButtonProps {
  sx?: SxProps;
  //
  onClick: () => void;
}

const ButtonBack: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("dark"));

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Button
        variant="text"
        size="small"
        startIcon={<ArrowBackIcon />}
        sx={{
          backgroundColor: COLORS.grey_light,
          borderRadius: "20px",
          padding: "5px 20px",
        }}
        color="secondary"
        //
        onClick={() => props.onClick()}
      >
        Volver
      </Button>
    </ThemeProvider>
  );
};

export default ButtonBack;
