import React from "react";
import { Box } from "@mui/material";
import { COLORS } from "@values/colors";

interface BoxCardWhiteProps {
  children: React.ReactNode; // Permitir contenido arbitrario como hijos
  sx?: React.CSSProperties; // Propiedades de estilo opcionales
}

const BoxCardWhite: React.FunctionComponent<BoxCardWhiteProps> = ({
  sx,
  children,
}) => {
  return (
    <Box
      sx={{
        background: COLORS.white,
        padding: "30px 20px",
        borderRadius: "20px",
        ...sx, // Combinar las propiedades de sx con las definidas aquí
      }}
    >
      {children}
    </Box>
  );
};

export default BoxCardWhite;
