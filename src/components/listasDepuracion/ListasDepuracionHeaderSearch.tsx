import React, { useState } from "react";
import { Box, Switch } from "@mui/material";
import { ButtonComponent, InputComponent, TypographyCommon } from "@common";
import { SearchListItems } from "@interfaces";
import Grid from "@mui/material/Grid2";

import { FormGridRow } from "@common/Components";

interface ListasHeaderProps {
  //
  onSearch: (items: SearchListItems) => void;
  onClean: () => void;
}

const ListasHeaderSearch: React.FunctionComponent<ListasHeaderProps> = (
  props
) => {
  const [items, setItems] = useState<SearchListItems>({
    articulo: "",
    productMaster: undefined,
  });
  const [descripcion, setDescripcion] = useState<string>("");
  const [withoutAmount, setWithoutAmount] = useState(false);
  const [withoutBrand, setWithoutBrand] = useState(false);
  const [withoutMaster, setWithoutMaster] = useState(false);

  const handleChangeDescripcion = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    const newItems = items;

    setDescripcion(value);
    newItems.articulo = value;
    setItems(newItems);

    if (value.length >= 3) {
      handlerSearch(newItems);
    } else if (value.length === 0) {
      setDescripcion("");
      handlerSearch(newItems);
    }
  };

  const handlerSearch = (items: SearchListItems) => {
    props.onSearch(items);
  };

  const handleClean = () => {
    setWithoutBrand(false);
    setWithoutAmount(false);
    setWithoutMaster(false);
    setDescripcion("");
    props.onClean();
  };

  const handlerWithoutBrand = () => {
    const newItems = items;
    newItems.withoutBrand = !withoutBrand;
    setItems(newItems);
    setWithoutBrand(!withoutBrand);
    handlerSearch(newItems);
  };

  const handlerWithoutMaster = () => {
    const newItems = items;
    newItems.withoutMaster = !withoutMaster;
    setItems(newItems);
    setWithoutMaster(!withoutMaster);
    handlerSearch(newItems);
  };

  const handlerWithoutAmount = () => {
    const newItems = items;
    newItems.withoutAmount = !withoutAmount;
    setItems(newItems);
    setWithoutAmount(!withoutAmount);
    handlerSearch(newItems);
  };

  return (
    <Box display={"flex"} alignContent="center" alignItems={"center"}>
      <Grid container spacing={1} alignContent={"center"} alignItems={"center"}>
        <FormGridRow size={{ xs: 2 }}>
          <TypographyCommon text="Articulo" />
        </FormGridRow>
        <FormGridRow size={{ xs: 4 }}>
          <InputComponent
            id="descripcion"
            name="descripcion"
            required={true}
            value={descripcion}
            onChange={handleChangeDescripcion}
          />
        </FormGridRow>
        <FormGridRow size={{ xs: 6 }}></FormGridRow>
        <FormGridRow size={{ xs: 2 }}>
          <TypographyCommon text="Sin marca" variant="subtitle2" />
        </FormGridRow>
        <FormGridRow size={{ xs: 2 }}>
          <Switch checked={withoutBrand} onChange={handlerWithoutBrand} />
        </FormGridRow>
        <FormGridRow size={{ xs: 2 }}>
          <TypographyCommon text="Sin master" variant="subtitle2" />
        </FormGridRow>
        <FormGridRow size={{ xs: 2 }}>
          <Switch onChange={handlerWithoutMaster} />
        </FormGridRow>
        <FormGridRow size={{ xs: 2 }}>
          <TypographyCommon text="Sin medida" variant="subtitle2" />
        </FormGridRow>
        <FormGridRow size={{ xs: 1 }}>
          <Switch onChange={handlerWithoutAmount} />
        </FormGridRow>
        <FormGridRow size={{ xs: 1 }}>
          <Box justifyContent={"end"} display={"flex"} gap={3}>
            {" "}
            <ButtonComponent
              text="Limpiar"
              color="secondary"
              onClick={() => handleClean()}
              sx={{
                marginRight: "10px",
                borderRadius: "20px",
                padding: "5px 20px",
              }}
              variant="text"
            />{" "}
          </Box>
        </FormGridRow>
      </Grid>
    </Box>
  );
};

export default ListasHeaderSearch;
