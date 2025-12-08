import React, { useEffect, useState } from "react";
import { Box, Card, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { TypographyCommon } from "@common";
import { COLORS } from "@values/colors";

import { BOOKMARK_GETALL_SUCCESS } from "@BookmarkActionTypes";
import { GetAllBookmarks } from "@actions/bookmarksActions";

import { Bookmark } from "@interfaces";
import { capitalizeFirstLetter } from "@utils/utils";

interface ButtonProps {
  //
  onSelect: (value: string) => void;
}

const SearcherBookmarks: React.FunctionComponent<ButtonProps> = (props) => {
  const [displayedBookmarks, setDisplayedBookmarks] = useState<Bookmark[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { bookmarks, statusBookmark } = useSelector(
    (state: RootState) => state.bookmarks
  );

  useEffect(() => {
    // Solo cargar bookmarks si no hay datos o si el estado no es exitoso
    if (bookmarks.length === 0) {
      try {
        dispatch(GetAllBookmarks());
      } catch (error) {
        console.error("Error al cargar las marcas", error);
      }
    }
  }, [dispatch, bookmarks.length]); // Dependencias apropiadas

  useEffect(() => {
    if (statusBookmark === BOOKMARK_GETALL_SUCCESS) {
      // Crear una copia del array para no mutar el estado original
      const prodSort = [...bookmarks];
      prodSort.sort((a, b) => {
        if (a.descripcion! < b.descripcion!) {
          return -1;
        }
        if (a.descripcion! > b.descripcion!) {
          return 1;
        }
        return 0;
      });
      // Set only first MAX_DISPLAYED_ITEMS for initial display
      setDisplayedBookmarks(prodSort); // Aumentar a 10 para mostrar más cards
    }
  }, [bookmarks, statusBookmark]);

  return (
    <Box
      sx={{
        width: "705px",
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap", // Permite que las cards se envuelvan en múltiples filas
          gap: 1,
          justifyContent: "center", // Alinea las cards al inicio
        }}
      >
        {displayedBookmarks.map((item) => (
          <Card
            key={item.descripcion}
            onClick={() => props.onSelect(item.descripcion)}
            sx={{
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              width: "200px", // Ancho fijo para cada card
              minHeight: "60px", // Altura mínima
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              "&:hover": {
                backgroundColor: COLORS.blue_100,
                transform: "translateY(-2px)",
                boxShadow: 3,
              },
              "&:active": {
                transform: "translateY(0px)",
              },
              borderRadius: 2,
              border: `1px solid ${COLORS.blue_200}`,
            }}
          >
            <CardContent
              sx={{
                padding: "8px !important",
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <TypographyCommon
                variant="subtitle2"
                text={capitalizeFirstLetter(item.descripcion)}
                sx={{
                  fontWeight: 500,
                  color: COLORS.grey_800,
                  fontSize: "0.75rem",
                  lineHeight: 1.2,
                  wordBreak: "break-word", // Permite que el texto se ajuste
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SearcherBookmarks;
