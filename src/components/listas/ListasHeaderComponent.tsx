import React from "react";
import { Box } from "@mui/material";
import { ButtonDelete, ButtonRefresh } from "@common/button";
import { COLORS } from "@values/colors";
import { TittleHeader } from "@common";

interface ListasHeaderProps {
  onRefreshList: () => void;
  onCleanList: () => void;
  //
}

const ListasHeaderComponent: React.FunctionComponent<ListasHeaderProps> = (
  props
) => {
  const handlerRefreshList = () => {
    props.onRefreshList();
  };

  const handleClean = () => {
    props.onCleanList();
  };

  return (
    <TittleHeader title="Listas de precios">
      <Box display="flex" gap={1}>
        <ButtonDelete
          title="Limpiar filtros"
          onClick={() => handleClean()}
          sx={{
            color: COLORS.black,
            backgroundColor: "transparent",
          }}
        />
        <ButtonRefresh
          title="Refrescar listas"
          //
          onClick={() => handlerRefreshList()}
        />
      </Box>
    </TittleHeader>
  );
};

export default ListasHeaderComponent;
