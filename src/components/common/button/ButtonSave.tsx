import React from "react";

import ButtonComponent from "./Button";
import SaveIcon from "@mui/icons-material/Save";

interface ButtonProps {
  title: string;
  type?: "submit" | undefined;
  //
  onClick: () => void;
}

const ButtonSave: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <ButtonComponent
      startIcon={<SaveIcon />}
      text={props.title}
      sx={{
        borderRadius: "20px",
        padding: "5px 20px",
      }}
      //
      onClick={() => props.onClick()}
    />
  );
};

export default ButtonSave;
