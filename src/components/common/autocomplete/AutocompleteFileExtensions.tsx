import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@theme/getSignUpTheme";
import { COLORS } from "@values/colors";

interface ButtonProps {
  proveedor: string;
  value?: string;
  //
  onSelect: (value: string) => void;
}

type ListItem = {
  id: number;
  name: string;
};

const AutocompleteFileExtensions: React.FunctionComponent<ButtonProps> = (
  props
) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const evaluateProvider = () => {
    return [
      { id: 1, name: ".pdf" },
      { id: 2, name: ".csv" },
      { id: 3, name: ".xls" },
      { id: 4, name: ".xlsx" },
      { id: 5, name: ".xlt" },
    ];
  };

  const providers: ListItem[] = evaluateProvider();

  const [valueSelect, setValueSelect] = useState<ListItem>({
    id: 0,
    name: "Seleccione...",
  });

  const filterHandler = (value: ListItem) => {
    if (value !== null) {
      props.onSelect(value.name);
      setValueSelect(value);
    } else {
      setValueSelect({ id: 0, name: "" });
    }
  };

  useEffect(() => {
    if (props.value !== undefined) {
      const value = providers.find((item) => item.name === props.value);
      setValueSelect(value!);
    }
  }, [props.value]);

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Autocomplete
        disablePortal
        options={providers}
        sx={{ background: COLORS.grey_light, marginRight: "10px", width: 300 }}
        getOptionLabel={(option: ListItem) => option.name}
        renderInput={(params) => <TextField {...params} />}
        size="small"
        onChange={(event, value) => filterHandler(value!)}
        value={
          valueSelect
            ? valueSelect
            : {
                id: 0,
                name: "",
              }
        }
      />
    </ThemeProvider>
  );
};

export default AutocompleteFileExtensions;
