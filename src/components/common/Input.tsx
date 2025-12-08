import React from "react";

import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "./theme/getSignUpTheme";

interface ButtonProps {
  id: string;
  name: string;
  value?: string | undefined;
  label?: string;
  required?: boolean;
  //
  onBlur?: (value: any) => void;
  onChange?: (value: any) => void;
  onEnterPress?: (value: string) => void;
}

const InputComponent = React.forwardRef<HTMLInputElement, ButtonProps>(
  (props, ref) => {
    const SignUpTheme = createTheme(getSignUpTheme("light"));

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      // Si es la tecla Enter y existe la función onEnterPress
      if (event.key === "Enter" && props.onEnterPress) {
        // Obtenemos el valor actual del input del evento
        const inputValue = (event.target as HTMLInputElement).value;
        // Llamamos a la función con el valor actual
        props.onEnterPress(inputValue);
      }
    };

    return (
      <ThemeProvider theme={SignUpTheme}>
        <TextField
          inputRef={ref}
          fullWidth
          id={props.id}
          label={props.label}
          name={props.name}
          required={props.required ? props.required : false}
          size="small"
          value={props.value}
          variant="outlined"
          //
          onChange={(newValue: any) =>
            props.onChange ? props.onChange(newValue) : undefined
          }
          onBlur={(newValue: any) =>
            props.onBlur ? props.onBlur(newValue) : undefined
          }
          // detectar cuando se presiona la tecla Enter y enviar el valor del input
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              if (props.onEnterPress) {
                onKeyDown(event);
              }
            }

            // Llamamos a nuestra función interna que maneja el evento Enter
            onKeyDown(event);
          }}
        />
      </ThemeProvider>
    );
  }
);

InputComponent.displayName = "InputComponent";

export default InputComponent;
