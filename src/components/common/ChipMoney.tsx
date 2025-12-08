import React from "react";
import { Box } from "@mui/material";
import { COLORS } from "@values/colors";
import { formatMoney } from "@utils/utils";

interface ChipMoneyProps {
  value: number;
}

const ChipMoney: React.FunctionComponent<ChipMoneyProps> = (props) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      sx={{
        background: COLORS.green_light,
        color: COLORS.green_dark,
        borderRadius: "20px",
        maxWidth: "140px",
        padding: "1px 10px",
        fontWeight: 400,
      }}
    >
      <Box sx={{ width: "20px" }}>$</Box>
      <Box sx={{ textAlign: "right", width: "90px" }}>
        {formatMoney(props.value)}
      </Box>
    </Box>
  );
};

export default ChipMoney;
