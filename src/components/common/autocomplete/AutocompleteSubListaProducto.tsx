import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "./theme/getSignUpTheme";
import { COLORS } from "@values/colors";

interface ButtonProps {
  all: boolean;
  lista?: string;
  value?: string;
  //
  onSelect: (value: string) => void;
}

const list: SubListItem[] = [
  {
    id: 0,
    name: "",
    lista: "",
  },
  {
    id: 1,
    name: "B",
    lista: "A",
  },
  {
    id: 2,
    name: "BTO",
    lista: "A",
  },
  {
    id: 3,
    name: "ESP",
    lista: "A",
  },
  {
    id: 4,
    name: "GRAL",
    lista: "A",
  },
  {
    id: 5,
    name: "SILVIO",
    lista: "A",
  },
  {
    id: 6,
    name: "BULTO",
    lista: "V",
  },
  {
    id: 7,
    name: "UNIDAD",
    lista: "V",
  },
];

type ListItem = {
  id: number;
  name: string;
};

type SubListItem = {
  id: number;
  name: string;
  lista: string;
};

const AutocompleteSubListaProduct: React.FunctionComponent<ButtonProps> = (
  props
) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const [sublist, setSubList] = useState<ListItem[]>(list);
  const [valueSelect, setValueSelect] = useState<SubListItem>({
    id: 0,
    name: "",
    lista: "",
  });

  const filterListaHandler = (value: any) => {
    if (value) {
      props.onSelect(value.name);
      setValueSelect(value);
    }
  };

  useEffect(() => {
    if (props.lista !== undefined) {
      setSubList(list.filter((item) => item.lista === props.lista));
      setValueSelect({
        id: 0,
        name: "",
        lista: "",
      });
    }
  }, [props.lista]);

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
        options={sublist}
        sx={{ background: COLORS.white, marginRight: "10px", width: 200 }}
        getOptionLabel={(option: any) => option.name}
        renderInput={(params) => <TextField {...params} label="SubLista" />}
        size="small"
        onChange={(event, value) => filterListaHandler(value)}
        value={valueSelect}
      />
    </ThemeProvider>
  );
};

export default AutocompleteSubListaProduct;
