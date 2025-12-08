import React from "react";
import { List } from "@interfaces";
import { Box } from "@mui/material";

interface ListasDepuracionLetterProps {
  data: List[];
  onLetterClick?: (letter: string) => void;
}

const ListasDepuracionLetter: React.FC<ListasDepuracionLetterProps> = ({
  data,
  onLetterClick,
}) => {
  // Extract unique first letters from the items
  const letters = Array.from(
    new Set(data.map((item) => item.articulo[0].toUpperCase()))
  ).sort();

  return (
    <Box display="flex" gap="5px" pt={2} justifyContent={"center"}>
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterClick?.(letter)}
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            background: "#f9f9f9",
            cursor: "pointer",
          }}
        >
          {letter}
        </button>
      ))}
    </Box>
  );
};

export default ListasDepuracionLetter;
