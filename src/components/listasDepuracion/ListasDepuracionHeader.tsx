import React from "react";
import { Box } from "@mui/material";
import { ButtonRefresh } from "@common/button/index";
import { TittleHeader } from "@common";

interface ListasHeaderProps {
  loadingBrands: boolean;
  //
  onRefreshNewProduct: () => void;
  onRefreshList: () => void;
  onRefreshBrandProduct: () => void;
  onRefreshAmountProduct: () => void;
}

const ListasHeaderComponent: React.FunctionComponent<ListasHeaderProps> = (
  props
) => {
  const handlerRefreshList = () => {
    props.onRefreshList();
  };

  const handlerRefreshNewProduct = () => {
    props.onRefreshNewProduct();
  };

  const handlerRefreshBrandProduct = () => {
    props.onRefreshBrandProduct();
  };

  const handlerRefreshAmountProduct = () => {
    props.onRefreshAmountProduct();
  };

  return (
    <TittleHeader title="Actualizar listas">
      <Box display="flex" gap="5px">
        <ButtonRefresh
          title="Listas"
          //
          onClick={() => handlerRefreshList()}
        />

        <ButtonRefresh
          title="Articulos"
          //
          onClick={() => handlerRefreshNewProduct()}
        />

        <ButtonRefresh
          title="Marcas"
          //
          onClick={() => handlerRefreshBrandProduct()}
        />

        <ButtonRefresh
          title="Cantidad"
          //
          onClick={() => handlerRefreshAmountProduct()}
        />
      </Box>
    </TittleHeader>
  );
};

export default ListasHeaderComponent;
