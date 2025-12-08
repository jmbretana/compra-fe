import React from "react";

import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "./theme/getSignUpTheme";

interface ButtonProps {
  id: string;
  label?: string;
  name: string;
  required?: boolean;
  value: string | undefined;
  //
  onChange?: (value: any) => void;
}

const InputPhone: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/[^\d]/g, '');
    
    // Apply formatting based on length
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(event.target.value);
    if (props.onChange) {
      // Create a synthetic event with the formatted value
      const syntheticEvent = {
        ...event,
        target: {
          ...event.target,
          value: formatted,
          name: props.name
        }
      };
      props.onChange(syntheticEvent);
    }
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <TextField
        fullWidth
        id={props.id}
        label={props.label}
        name={props.name}
        required={props.required ? props.required : false}
        size="small"
        variant="outlined"
        value={props.value || ''}
        onChange={handleChange}
        placeholder="(555) 1234-5678"
        inputProps={{
          maxLength: 14 // (999) 9999-9999 = 14 characters
        }}
      />
    </ThemeProvider>
  );
};

export default InputPhone;
