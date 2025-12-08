import React from "react";
import { Box } from "@mui/material";
import { ButtonComponent, TypoTittle } from "@common";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ButtonRefresh } from "./button";
interface TittleHeaderProps {
  icon?: React.ReactNode;
  title: string;

  // agregar un parametro opcional que permita recibir componentes a renderizar
  children?: React.ReactNode;

  //
  onAdd?: () => void;
  onCancel?: () => void;
  onRefresh?: () => void;
}

const TittleHeader: React.FunctionComponent<TittleHeaderProps> = (props) => {
  const handleAdd = () => {
    props.onAdd!();
  };

  const handleCancel = () => {
    props.onCancel!();
  };

  const handleRefresh = () => {
    props.onRefresh!();
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignContent={"center"}
      alignItems={"center"}
      marginBottom={1}
      sx={{
        borderBottom: "2px solid #e0e0e0",
        paddingBottom: "10px",
      }}
    >
      <Box display={"flex"}>
        <TypoTittle title={props.title} />
      </Box>

      <Box gap={1} display={"flex"} alignItems={"center"}>
        {props.onCancel && (
          <ButtonComponent
            text="Volver"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            onClick={() => handleCancel()}
            sx={{
              marginRight: "10px",
              borderRadius: "20px",
              padding: "5px 20px",
            }}
            variant="text"
          />
        )}

        {props.onAdd && (
          <ButtonComponent
            startIcon={<AddIcon />}
            text="Agregar"
            sx={{
              minWidth: "110px",
              backgroundColor: "#80e143",
              color: "#000",
              fontWeight: 600,
              borderRadius: "20px",
              padding: "5px 20px",
            }}
            //
            onClick={() => handleAdd()}
          />
        )}

        {props.onRefresh && (
          <ButtonRefresh title="Refrescar" onClick={handleRefresh} />
        )}
      </Box>

      {props.children && <Box>{props.children}</Box>}
    </Box>
  );
};

export default TittleHeader;
