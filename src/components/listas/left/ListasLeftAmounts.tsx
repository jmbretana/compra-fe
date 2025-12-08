import React from "react";
import { Box } from "@mui/material";
import { TypographyCommon } from "@common";
import { COLORS } from "@values/colors";
import { Amount } from "@interfaces";

interface ListasLeftAmountsProps {
  amounts: Amount[];
  //
  onSelect: (value: Amount) => void;
}

const ListasLeftAmounts: React.FunctionComponent<ListasLeftAmountsProps> = (
  props
) => {
  const calculateAmountText = (item: Amount): string => {
    const unidad = item.unidad;
    const medida = item.medida;

    return `${medida}  ${unidad}`;
  };

  return (
    props.amounts.length > 0 && ( // Only render if there are amounts
      <Box>
        <Box pb={1}>
          <TypographyCommon
            text="Medidas"
            variant="subtitle2"
          ></TypographyCommon>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            width: "150px",
            // si hay mas de 3 items pasarlos al siguiente renglón
            flexWrap: "wrap",
            overflow: "hidden",
          }}
        >
          {props.amounts.map((item: Amount) => {
            if (!item.medida || !item.unidad) {
              return null; // Skip items without medida or unidad
            }
            return (
              <Box
                key={item._id + item.medida + item.unidad}
                onClick={() => props.onSelect(item)}
                sx={{
                  cursor: "pointer",
                  border: "1px solid " + COLORS.grey,
                  padding: "2px 6px",
                  borderRadius: "15px",
                  backgroundColor: COLORS.white,
                  "&:hover": {
                    borderColor: COLORS.black,
                    color: COLORS.black,
                  },
                }}
              >
                <TypographyCommon
                  variant="subtitle2"
                  text={calculateAmountText(item)}
                  light={true}
                  sx={{
                    fontSize: "13px",
                    color: COLORS.grey,
                    "&:hover": {
                      color: "inherit",
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    )
  );
};

export default ListasLeftAmounts;
