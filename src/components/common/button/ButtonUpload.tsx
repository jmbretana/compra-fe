import React from "react";

import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "../theme/getSignUpTheme";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface ButtonProps {
  accept?: string;
  //
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ButtonUpload: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("dark"));

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onUpload(event);
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Examinar
        <VisuallyHiddenInput
          type="file"
          onChange={handleUpload}
          accept={props.accept ? props.accept : ".csv"}
        />
      </Button>
    </ThemeProvider>
  );
};

export default ButtonUpload;
