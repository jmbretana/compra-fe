import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { TypographyCommon } from "@common";
import { COLORS } from "@values/colors";

import { BOOKMARK_GETALL_SUCCESS } from "@BookmarkActionTypes";
import { GetAllBookmarks } from "@actions/bookmarksActions";

import { Bookmark, List } from "@interfaces";
import { capitalizeFirstLetter } from "@utils/utils";
import UniversalSelectionModal from "./modals/UniversalSelectionModal";

interface ButtonProps {
  data: List[];
  //
  onSelect: (value: string) => void;
}

const LeftBookmarks: React.FunctionComponent<ButtonProps> = (props) => {
  let first = true;
  const [data, setData] = useState<Bookmark[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [displayedBookmarks, setDisplayedBookmarks] = useState<Bookmark[]>([]);

  const MAX_DISPLAYED_ITEMS = 5;

  const dispatch = useDispatch<AppDispatch>();
  const { bookmarks, statusBookmark } = useSelector(
    (state: RootState) => state.bookmarks
  );

  // Función para contar ocurrencias de un bookmark en las listas que vienen por props
  const countBookmarkOccurrences = (bookmarkDescription: string): number => {
    if (!props.data || props.data.length === 0) return 0;

    return props.data.filter(
      (list: List) =>
        list.productMaster?.toLowerCase() === bookmarkDescription.toLowerCase()
    ).length;
  };

  useEffect(() => {
    if (first) {
      try {
        dispatch(GetAllBookmarks());
      } catch (error) {
        console.error("Error al cargar las marcas", error);
        dispatch(GetAllBookmarks());
      }
    }
    first = false;
  }, []);

  useEffect(() => {
    if (statusBookmark === BOOKMARK_GETALL_SUCCESS) {
      // Crear una copia del array para no mutar el estado original
      const prodSort = [...bookmarks];

      // Ordenar por cantidad de apariciones (descendente) y luego por descripción
      prodSort.sort((a, b) => {
        const countA = countBookmarkOccurrences(a.descripcion);
        const countB = countBookmarkOccurrences(b.descripcion);

        // Primero ordenar por cantidad (descendente)
        if (countB !== countA) {
          return countB - countA;
        }

        // Si tienen la misma cantidad, ordenar alfabéticamente
        if (a.descripcion! < b.descripcion!) {
          return -1;
        }
        if (a.descripcion! > b.descripcion!) {
          return 1;
        }
        return 0;
      });

      // set data
      setData(prodSort);
      // Set only first MAX_DISPLAYED_ITEMS for initial display
      setDisplayedBookmarks(prodSort.slice(0, MAX_DISPLAYED_ITEMS));
    }
  }, [bookmarks, props.data]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleProductSelect = (productName: string) => {
    props.onSelect(productName);
  };

  return (
    <Box>
      <Box pb={1}>
        <TypographyCommon
          text="Favoritos"
          variant="subtitle2"
        ></TypographyCommon>
      </Box>
      <Box>
        {displayedBookmarks.map((item) => {
          const count = countBookmarkOccurrences(item.descripcion);
          return (
            <Box
              key={item.descripcion}
              onClick={() => props.onSelect(item.descripcion)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: COLORS.blue,
                },
              }}
            >
              <TypographyCommon
                variant="subtitle2"
                light={true}
                sx={{
                  color: "#666",
                  fontSize: "14px",
                  display: "flex",
                  gap: 1,
                }}
              >
                {capitalizeFirstLetter(item.descripcion)}{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#999",
                    fontSize: "14px",
                  }}
                >
                  ({count})
                </Box>
              </TypographyCommon>
            </Box>
          );
        })}

        {data.length > MAX_DISPLAYED_ITEMS && (
          <Button
            size="small"
            variant="text"
            onClick={handleOpenModal}
            sx={{
              textTransform: "none",
              color: COLORS.blue,
              fontSize: "0.875rem",
              fontWeight: "normal",
              padding: "2px 0px",
              minWidth: "auto",
              "&:hover": {
                backgroundColor: "transparent",
                color: COLORS.blue_800,
                textDecoration: "none",
              },
            }}
          >
            Mostrar más
          </Button>
        )}
      </Box>

      <UniversalSelectionModal
        open={modalOpen}
        items={data}
        title="Favoritos"
        searchPlaceholder="Buscar favorito..."
        emptyMessage="No se encontraron favoritos"
        onClose={handleCloseModal}
        onSelect={handleProductSelect}
      />
    </Box>
  );
};

export default LeftBookmarks;
