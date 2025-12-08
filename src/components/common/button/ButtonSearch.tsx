import React from "react";

import { Button, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@common/theme/getSignUpTheme";
import { SxProps } from "@mui/system"; // Import SxProps for MUI styles
import ButtonComponent from "./Button";

interface ButtonProps {
  color?: "secondary" | "success" | "error";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  sx?: SxProps;
  type?: "submit" | undefined;
  variant?: "text" | "contained" | "outlined";
  loading?: boolean;
  //
  onClick: () => void;
}

const ButtonSearch: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("dark"));

  return (
    <ThemeProvider theme={SignUpTheme}>
      {!props.loading && (
        <ButtonComponent
          text="Buscar"
          onClick={() => props.onClick()}
          color="secondary"
          //
          sx={{
            border: "transparent",
            borderRadius: "20px",
            padding: "5px 20px",
          }}
        />
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

export default ButtonSearch;
