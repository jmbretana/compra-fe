import React from "react";

import { InputAdornment, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "./theme/getSignUpTheme";

interface ButtonProps {
  id: string;
  label: string;
  name: string;
  required: boolean | undefined;
  value?: number | 0;
  //
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //
}

const InputMoneyComponent: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  return (
    <ThemeProvider theme={SignUpTheme}>
      <TextField
        fullWidth
        id={props.id}
        label={props.label}
        name={props.name}
        required={props.required ? props.required : false}
        size="small"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          },
        }}
        value={props.value}
        variant="outlined"
        //
        onChange={props.onChange}
      />
    </ThemeProvider>
  );
};

export default InputMoneyComponent;
