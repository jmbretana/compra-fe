import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@theme/getSignUpTheme";
import { ListItem } from "@interfaces";

interface ButtonProps {
  value?: string;
  //
  onSelect: (value: string) => void;
}

const list: ListItem[] = [
  { id: 14, name: "Alcoholes varios" },
  { id: 12, name: "Aceites y Grasas" },
  { id: 4, name: "Almacen" },
  { id: 6, name: "Bebidas" },
  { id: 1, name: "Carnes y Pescados" },
  { id: 15, name: "Cervezas" },
  { id: 16, name: "Café" },
  { id: 5, name: "Condimentos y Especias" },
  { id: 7, name: "Congelados" },
  { id: 10, name: "Descartables, Vasos y Empaques" },
  { id: 2, name: "Frutas y Verduras" },
  { id: 13, name: "Gaseosas y aguas" },
  { id: 3, name: "Lácteos y Huevos" },
  { id: 9, name: "Limpieza e Higiene" },
  { id: 8, name: "Panadería y Repostería" },
  { id: 11, name: "Vinos y Licores" },
];

const AutocompleteCategorias: React.FunctionComponent<ButtonProps> = (
  props
) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const [valueSelect, setValueSelect] = useState<ListItem>(
    list.find((item) => item.name === props.value) as ListItem
  );

  const filterListaAHandler = (value: ListItem) => {
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
        sx={{ background: "transparent", width: "250px" }}
        getOptionLabel={(option: ListItem) => option.name}
        renderInput={(params) => <TextField {...params} label="" />}
        size="small"
        onChange={(event, value) => filterListaAHandler(value!)}
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

export default AutocompleteCategorias;
