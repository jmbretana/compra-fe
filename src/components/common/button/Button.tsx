import React from "react";

import { Button, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@common/theme/getSignUpTheme";
import { SxProps } from "@mui/system"; // Import SxProps for MUI styles

interface ButtonProps {
  color?: "secondary" | "success" | "error" | "primary" | "info" | "warning";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  sx?: SxProps;
  text: string;
  type?: "submit" | undefined;
  variant?: "text" | "contained" | "outlined";
  loading?: boolean;
  //
  onClick: () => void;
}

const ButtonComponent: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("dark"));

  return (
    <ThemeProvider theme={SignUpTheme}>
      {!props.loading && (
        <Button
          disabled={props.disabled}
          type={props.type ? props.type : undefined}
          variant={props.variant ? props.variant : "contained"}
          color={props.color ? props.color : "success"}
          size="small"
          startIcon={props.startIcon}
          sx={props.sx}
          //
          onClick={() => props.onClick()}
        >
          {props.text}
        </Button>
      )}
      {props.loading && (
        <Button
          disabled={props.disabled}
          type={props.type ? props.type : undefined}
          variant={props.variant ? props.variant : "contained"}
          color={props.color ? props.color : "success"}
          size="small"
          onClick={() => props.onClick()}
          sx={props.sx}
        >
          <CircularProgress size="20px" sx={{ color: "#fff" }} />
        </Button>
      )}
    </ThemeProvider>
  );
};

export default ButtonComponent;
