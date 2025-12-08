import React from "react";
import ButtonComponent from "./Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import { COLORS } from "@values/colors";

interface ButtonProps {
  title: string;
  //
  onClick: () => void;
}

const ButtonAdd: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <ButtonComponent
      startIcon={<RefreshIcon />}
      text={props.title}
      sx={{
        borderRadius: "20px",
        padding: "5px 20px",
        minWidth: "100px",
        backgroundColor: COLORS.blue_light,
        color: COLORS.blue,
      }}
      //
      onClick={() => props.onClick()}
    />
  );
};

export default ButtonAdd;
