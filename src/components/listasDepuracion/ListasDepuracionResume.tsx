import React from "react";
import { List } from "@interfaces";
import { Box } from "@mui/material";
import { TypographyCommon } from "@common";

interface TableProductsProps {
  data: List[];
  //
}

const ListasResumeComponent: React.FunctionComponent<TableProductsProps> = (
  props
) => {
  const withMaster = props.data.filter((item) => item.productMaster !== "");
  const withoutMaster = props.data.filter((item) => item.productMaster === "");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 3,
      }}
    >
      <Box>
        <TypographyCommon text="Articulos identificados:" />
        <TypographyCommon text={withMaster.length.toString()} />
      </Box>
      <Box>
        <TypographyCommon text="Articulos no identificados:" />

        <TypographyCommon text={withoutMaster.length.toString()} />
      </Box>
    </Box>
  );
};

export default ListasResumeComponent;
