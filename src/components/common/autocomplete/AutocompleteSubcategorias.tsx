import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ListItem } from "@interfaces";
import getSignUpTheme from "@theme/getSignUpTheme";

type ListSubcategoria = {
  id: number;
  categoria: string;
  subcategoria: string;
};

const ListItemsSubcategorias: ListSubcategoria[] = [
  { id: 14, categoria: "Bebidas", subcategoria: "Alcoholes varios" },
  { id: 12, categoria: "Alimentos", subcategoria: "Aceites y Grasas" },
  { id: 4, categoria: "Almacen", subcategoria: "Almacen" },
  { id: 4, categoria: "Almacen", subcategoria: "Aceitunas" },
  { id: 4, categoria: "Almacen", subcategoria: "Arroz" },
  { id: 6, categoria: "Bebidas", subcategoria: "Bebidas" },
  { id: 1, categoria: "Carnes", subcategoria: "Carnes y Pescados" },
  { id: 2, categoria: "Aceites y Grasas", subcategoria: "Aceite de girasol" },
  { id: 3, categoria: "Aceites y Grasas", subcategoria: "Aceites" },
  { id: 4, categoria: "Aceites y Grasas", subcategoria: "Aceite de coco" },
];

interface SubcategoriasProps {
  categoria: string | undefined;
  subcategoria?: string;
  //
  onSelect: (subcategoria: string) => void;
}

const AutocompleteCategorias: React.FunctionComponent<SubcategoriasProps> = (
  props
) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  // Filtrar subcategorias por categoria
  const listItems: ListItem[] = ListItemsSubcategorias.filter(
    (item) => item.categoria === props.categoria
  ).map((item) => ({
    id: item.id,
    name: item.subcategoria,
  }));

  // Inicializar con valor vacío
  const [valueSelect, setValueSelect] = useState<ListItem>({ id: 0, name: "" });

  // Función para encontrar el valor seleccionado
  const findSelectedValue = (): ListItem => {
    if (!props.subcategoria) {
      return { id: 0, name: "" };
    }

    const found = ListItemsSubcategorias.find(
      (item) =>
        item.subcategoria === props.subcategoria &&
        item.categoria === props.categoria
    );

    return found
      ? { id: found.id, name: found.subcategoria }
      : { id: 0, name: "" };
  };

  // Actualizar valueSelect cuando cambien las props
  useEffect(() => {
    const selectedValue = findSelectedValue();
    setValueSelect(selectedValue);
  }, [props.subcategoria, props.categoria]);

  const filterHandler = (value: ListItem | null) => {
    if (value) {
      props.onSelect(value.name);
      setValueSelect(value);
    } else {
      // Si se limpia la selección
      props.onSelect("");
      setValueSelect({ id: 0, name: "" });
    }
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Autocomplete
        disablePortal
        options={listItems}
        sx={{ background: "transparent", width: "250px" }}
        getOptionLabel={(option: ListItem) => option.name}
        renderInput={(params) => <TextField {...params} label="" />}
        size="small"
        onChange={(event, value) => filterHandler(value)}
        value={valueSelect.name ? valueSelect : null}
      />
    </ThemeProvider>
  );
};

export default AutocompleteCategorias;
