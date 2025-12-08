import React from "react";

import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "./theme/getSignUpTheme";

interface InputNumberProps {
  id: string;
  label?: string;
  name: string;
  required: boolean | undefined;
  value: number | 0;
  disabled?: boolean;
  //
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //
}

const InputNumber: React.FunctionComponent<InputNumberProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  return (
    <ThemeProvider theme={SignUpTheme}>
      <TextField
        id={props.id}
        label={props.label}
        name={props.name}
        required={props.required ? props.required : false}
        size="small"
        type="number"
        value={props.value}
        variant="outlined"
        onChange={props.onChange}
        disabled={props.disabled}
        sx={{ width: "80px" }}
      />
    </ThemeProvider>
  );
};

export default InputNumber;
