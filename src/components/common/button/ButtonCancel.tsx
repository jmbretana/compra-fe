import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@common/theme/getSignUpTheme";
import { SxProps } from "@mui/system"; // Import SxProps for MUI styles
import { COLORS } from "@values/colors";

import ButtonComponent from "./Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface ButtonProps {
  sx?: SxProps;
  //
  onClick: () => void;
}

const ButtonCancel: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("dark"));

  const cancelHandler = () => {
    props.onClick();
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <ButtonComponent
        color="secondary"
        startIcon={<HighlightOffIcon />}
        onClick={() => cancelHandler()}
        text="Cerrar"
        variant="text"
        sx={{
          backgroundColor: COLORS.blue_light,
          borderRadius: "20px",
          padding: "5px 20px",
        }}
      />
    </ThemeProvider>
  );
};

export default ButtonCancel;
