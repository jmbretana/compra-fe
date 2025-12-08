import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

import { InputComponent, TypographyCommon } from "@common";
import { COLORS } from "@values/colors";
import SearcherBookmarks from "./SearcherBookmaks";

const Searcher: React.FunctionComponent = () => {
  const navigate = useNavigate();
  //
  const inputRef = useRef<HTMLInputElement>(null);
  const [descripcion, setDescripcion] = useState<string>("");

  // Hacer focus en el input cuando el componente se monta
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChangeDescripcion = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescripcion(event.target.value);
  };

  // Nueva función para manejar la pulsación de Enter
  const handleEnterPress = (value: string) => {
    const params = new URLSearchParams();
    params.append("productFilter", value);
    navigate(`/lists?${params}`);
  };

  const handlerSearchDescription = () => {
    const params = new URLSearchParams();
    params.append("productFilter", descripcion);
    navigate(`/lists?${params}`);
  };

  const handleSelectBookmark = (value: string) => {
    const params = new URLSearchParams();
    params.append("product", value);
    navigate(`/lists?${params}`);
  };
  //

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          sx={{
            fontFamily: "Lexend",
            fontSize: "1rem",
            backgroundColor: COLORS.white,
            p: 4,
            borderRadius: 20,
            boxShadow: 3,
            minWidth: 450,
          }}
        >
          <Box sx={{ width: "380px" }}>
            <TypographyCommon text="Buscar articulo" variant="subtitle1" />
          </Box>
          <InputComponent
            ref={inputRef}
            id="descripcion"
            name="descripcion"
            required={true}
            value={descripcion}
            onBlur={handleChangeDescripcion}
            onChange={handleChangeDescripcion}
            onEnterPress={handleEnterPress}
          />
          <IconButton
            sx={{
              backgroundColor: COLORS.white,
              border: `1px solid #ccc`,
              width: 44,
              height: 44,
            }}
            size="large"
            onClick={handlerSearchDescription}
          >
            <SearchIcon fontSize="medium" />
          </IconButton>
        </Box>

        <Box>
          <SearcherBookmarks onSelect={handleSelectBookmark} />
        </Box>
      </Box>
    </>
  );
};

export default Searcher;
