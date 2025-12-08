import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@theme/getSignUpTheme";
import { COLORS } from "@values/colors";

interface ButtonProps {
  value?: string;
  //
  onSelect: (value: string) => void;
}

// max id: 8

const list: ListItem[] = [
  {
    id: 3,
    name: "balde",
  },

  {
    id: 5,
    name: "botella",
  },
  {
    id: 2,
    name: "caja",
  },
  {
    id: 8,
    name: "lata",
  },
  {
    id: 6,
    name: "pack",
  },
  {
    id: 7,
    name: "pote",
  },
  {
    id: 4,
    name: "sachet",
  },
  {
    id: 1,
    name: "unidad",
  },
];

type ListItem = {
  id: number;
  name: string;
};

const AutocompleteTipoUnidad: React.FunctionComponent<ButtonProps> = (
  props
) => {
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
        sx={{ background: COLORS.white, marginRight: "10px" }}
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

export default AutocompleteTipoUnidad;
