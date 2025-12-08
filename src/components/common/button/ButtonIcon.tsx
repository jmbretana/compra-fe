import React from "react";
import { IconButton } from "@mui/material";
import { COLORS } from "@values/colors";

interface ButtonProps {
  icon: React.ReactNode;
  //
  onClick: () => void;
}

const ButtonIcon: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <IconButton
      color="secondary"
      onClick={props.onClick}
      sx={{
        backgroundColor: COLORS.blue_300,
        color: COLORS.grey_900,
        "&:hover": {
          backgroundColor: COLORS.blue_500,
        },
      }}
    >
      {props.icon}
    </IconButton>
  );
};

export default ButtonIcon;
