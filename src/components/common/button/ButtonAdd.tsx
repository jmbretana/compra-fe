import React from "react";
import ButtonComponent from "./Button";
import AddIcon from "@mui/icons-material/Add";

interface ButtonProps {
  title?: string;
  //
  onClick: () => void;
}

const ButtonAdd: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <ButtonComponent
      startIcon={<AddIcon />}
      text="Agregar"
      sx={{
        minWidth: "110px",
        backgroundColor: "#80e143",
        color: "#000",
        fontWeight: 500,
        borderRadius: "20px",
        padding: "5px 20px",
      }}
      //
      onClick={() => props.onClick()}
    />
  );
};

export default ButtonAdd;
