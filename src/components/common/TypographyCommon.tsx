import React from "react";
import { Typography } from "@mui/material";

interface TypographyCommonProps {
  text?: string;
  children?: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2";
  light?: boolean;
  sx?: React.CSSProperties | any;
}

const TypographyCommon: React.FunctionComponent<TypographyCommonProps> = (
  props
) => {
  return (
    <Typography
      sx={{
        fontFamily: "Lexend",
        fontWeight: props.light ? 300 : 500,
        // Añadir estilos adicionales si se proporcionan
        ...props.sx,
      }}
      variant={props.variant ? props.variant : "h6"}
    >
      {props.children || props.text}
    </Typography>
  );
};

export default TypographyCommon;
