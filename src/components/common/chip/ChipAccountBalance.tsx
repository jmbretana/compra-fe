import React from "react";
import { Chip } from "@mui/material";
import { formatMoney } from "@utils/utils";

interface ChipAccountBalanceProps {
  value: number;
}

const ChipAccountBalance: React.FunctionComponent<ChipAccountBalanceProps> = (
  props
) => {
  let colorChip = "success" as "success" | "error" | "default";

  if (props.value === 0) {
    colorChip = "default";
  }
  if (props.value < 0) {
    colorChip = "error";
  }
  if (props.value > 0) {
    colorChip = "success";
  }

  return <Chip label={"$ " + formatMoney(props.value)} color={colorChip} />;
};

export default ChipAccountBalance;
