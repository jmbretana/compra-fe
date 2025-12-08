import React from "react";

import { Box, IconButton, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "./theme/getSignUpTheme";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface InputNumberDecimalProps {
  id: string;
  label?: string;
  name: string;
  required: boolean | undefined;
  value: number | 0;
  disabled?: boolean;
  //
  onChange: (value: number) => void;
  //
}

const InputNumberDecimal: React.FunctionComponent<InputNumberDecimalProps> = (
  props
) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const addValue = () => {
    const newValue = parseFloat(props.value.toString()) + 0.1;

    if (newValue >= 0) {
      props.onChange(Number(newValue.toFixed(2)));
    }
  };

  const restValue = () => {
    const newValue = parseFloat(props.value.toString()) - 0.1;
    if (newValue >= 0) {
      props.onChange(Number(newValue.toFixed(2)));
    }
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      props.onChange(value);
    }
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Box>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={restValue}
          disabled={props.disabled}
        >
          <RemoveCircleIcon />
        </IconButton>
      </Box>
      <TextField
        id={props.id}
        label={props.label}
        name={props.name}
        required={props.required ? props.required : false}
        value={props.value}
        disabled={props.disabled}
        //
        onChange={handleChange}
      />
      <Box>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={addValue}
          disabled={props.disabled}
        >
          <AddCircleIcon />
        </IconButton>
      </Box>
    </ThemeProvider>
  );
};

export default InputNumberDecimal;
