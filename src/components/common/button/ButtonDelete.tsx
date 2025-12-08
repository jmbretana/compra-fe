import React from "react";
import ButtonComponent from "./Button";
import DeleteIcon from "@mui/icons-material/Delete";

interface ButtonProps {
  title: string;
  sx?: React.CSSProperties;
  //
  onClick: () => void;
}

const ButtonDelete: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <ButtonComponent
      startIcon={<DeleteIcon />}
      sx={{
        border: "transparent",
        borderRadius: "20px",
        padding: "5px 20px",
        ...props.sx,
      }}
      text={props.title}
      color="error"
      onClick={() => props.onClick()}
      variant="outlined"
    />
  );
};

export default ButtonDelete;
