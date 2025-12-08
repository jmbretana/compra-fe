import React from "react";
import { Typography } from "@mui/material";

interface TittleHeaderProps {
  title: string;
  //
  onCancel?: () => void;
}

const TypoTittle: React.FunctionComponent<TittleHeaderProps> = (props) => {
  return (
    <Typography
      variant="h2"
      gutterBottom
      sx={{
        fontSize: {
          xs: "2.3rem", // Tamaño para pantallas pequeñas
          md: "3.3em", // Tamaño para pantallas grandes
        },
        fontFamily: "Lexend",
      }}
    >
      {props.title}
    </Typography>
  );
};

export default TypoTittle;
