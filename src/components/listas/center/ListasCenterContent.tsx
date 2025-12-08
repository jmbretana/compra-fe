import React, { useEffect, useState } from "react";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { List, Navigation, Pagination } from "@interfaces";
import SearchIcon from "@mui/icons-material/Search";

import { InputComponent, TypographyCommon } from "@common";
//
import ListasTableComponent from "./ListasTableComponent";
import ListasTablePagination from "./ListasTablePagination";
import { AutocompleteOrderList } from "@common/autocomplete";
import { COLORS } from "@values/colors";

interface ListasCenterContentProps {
  data: List[];
  navigation: Navigation | null; // Cache de navegación para restaurar filtros
  pagination: Pagination;
  //
  onEditProduct: (item: List) => void;
  onSearchDescripcion: (value: string) => void;
  onChangePage: (value: number) => void;
  onChangeOrder: (value: string) => void;
}

const ListasCenterContent: React.FunctionComponent<ListasCenterContentProps> = (
  props
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  //
  const [data, setData] = useState<List[]>(props.data);
  const [descripcion, setDescripcion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setData(props.data);
    if (props.data.length > 0) {
      setLoading(false);
      setData(props.data);
    }
  }, [props.data]);

  //

  const handlePageSelection = (page: number) => {
    props.onChangePage(page);
  };

  const handleOrderList = (value: string) => {
    props.onChangeOrder(value);
  };

  const handleChangeDescripcion = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescripcion(event.target.value);
  };

  // Nueva función para manejar la pulsación de Enter
  const handleEnterPress = (value: string) => {
    setDescripcion(value);
    if (value.length >= 3) {
      handlerSearch(value);
    } else if (value.length === 0) {
      setData(props.data);
    }
  };

  const handlerSearchDescription = () => {
    if (descripcion.length >= 3) {
      handlerSearch(descripcion);
    } else {
      setData(props.data);
    }

    if (descripcion.length === 0) {
      setData(props.data);
    }
  };

  const handlerSearch = (value: string) => {
    props.onSearchDescripcion(value);
  };

  const editProductHandler = (item: List) => {
    props.onEditProduct(item);
  };

  const noResultsView = (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
    >
      <h3>No hay resultados</h3>
    </Box>
  );

  const topContentView = () => {
    return (
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Box>
          <Box
            display={"flex"}
            justifyContent={"end"}
            alignContent={"center"}
            alignItems={"center"}
            gap={1}
            sx={{ fontFamily: "Lexend", fontSize: "0.8rem" }}
          >
            <Box sx={{ width: "150px" }}>
              <TypographyCommon text="Descripcion" variant="subtitle2" />
            </Box>
            <InputComponent
              id="descripcion"
              name="descripcion"
              required={true}
              // ejecutar la funcion al salir del input
              onBlur={handleChangeDescripcion}
              onEnterPress={handleEnterPress}
            />
            <IconButton
              sx={{ backgroundColor: COLORS.white }}
              size="small"
              onClick={handlerSearchDescription}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"end"}
          alignContent={"center"}
          alignItems={"center"}
          gap={1}
          sx={{ fontFamily: "Lexend", fontSize: "0.8rem" }}
        >
          <TypographyCommon
            text="Ordenar por"
            variant="subtitle2"
            sx={{ display: isMobile ? "none" : "block" }}
          />
          <AutocompleteOrderList onSelect={handleOrderList} />
        </Box>
      </Box>
    );
  };

  //

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        gap={1}
        flexDirection={"column"}
      >
        {topContentView()}

        <ListasTablePagination
          pagination={props.pagination}
          //
          onPageSelected={handlePageSelection}
        />

        {data.length > 0 && (
          <ListasTableComponent
            data={data}
            onEditProduct={editProductHandler}
          />
        )}

        {data.length === 0 && !loading && noResultsView}

        <ListasTablePagination
          pagination={props.pagination}
          //
          onPageSelected={handlePageSelection}
        />
      </Box>
    </>
  );
};

export default ListasCenterContent;
