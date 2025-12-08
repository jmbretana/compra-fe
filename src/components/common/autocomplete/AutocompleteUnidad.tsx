import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@theme/getSignUpTheme";

interface ButtonProps {
  value?: string;
  //
  onSelect: (value: string) => void;
}

const list: ListItem[] = [
  {
    id: 3,
    name: "cc",
  },
  {
    id: 7,
    name: "dgr",
  },
  {
    id: 6,
    name: "gr",
  },
  {
    id: 2,
    name: "kg",
  },
  {
    id: 1,
    name: "lts",
  },
  {
    id: 4,
    name: "ml",
  },
  {
    id: 5,
    name: "mm3",
  },
];

type ListItem = {
  id: number;
  name: string;
};

const AutocompleteUnidad: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const [valueSelect, setValueSelect] = useState<ListItem>({
    id: 0,
    name: "",
  });

  const filterHandler = (value: ListItem) => {
    props.onSelect(value.name);
    setValueSelect(value);
  };

  useEffect(() => {
    if (props.value !== undefined) {
      const value = list.find((item) => item.name === props.value);
      setValueSelect(value!);
    }
  }, [props.value]);

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Autocomplete
        disablePortal
        options={list}
        sx={{ background: "transparent", marginRight: "10px" }}
        getOptionLabel={(option: ListItem) => option.name}
        renderInput={(params) => <TextField {...params} label="" />}
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

export default AutocompleteUnidad;
