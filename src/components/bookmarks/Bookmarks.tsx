import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import Loading from "@common/Loading";
import { TittleHeader } from "@common";

import BookmarksTableComponent from "./BookmarksTable";

import { LIST_GETALL_SUCCESS } from "@ListActionTypes";
import { BOOKMARK_GETALL_SUCCESS } from "@BookmarkActionTypes";
import { GetAllLists } from "@actions/listsActions";
import { GetAllBookmarks, DeleteBookmark } from "@actions/bookmarksActions";
import { Bookmark, List } from "@interfaces";

import { calculatePricePerQuantity } from "@components/listas/functions/functionsList";

const Bookmarks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { bookmarks, statusBookmark } = useSelector(
    (state: RootState) => state.bookmarks
  );
  const { lists, statusLista } = useSelector((state: RootState) => state.lists);

  const [data, setData] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  let first = true;

  useEffect(() => {
    if (first) {
      try {
        dispatch(GetAllBookmarks());
        dispatch(GetAllLists());
      } catch (error) {
        console.error("Error al cargar las listas", error);
        dispatch(GetAllBookmarks());
        dispatch(GetAllLists());
      }
    }

    first = false;
  }, []);

  useEffect(() => {
    if (
      statusBookmark === BOOKMARK_GETALL_SUCCESS &&
      statusLista === LIST_GETALL_SUCCESS &&
      bookmarks.length > 0 &&
      lists.length > 0
    ) {
      try {
        // Crear una copia profunda de bookmarks para no mutar el estado original
        const bookmarksCopy = bookmarks.map(bookmark => {
          // filter lists by product
          const listToFilter = lists;
          const brand = bookmark.brand ? bookmark.brand.toLowerCase() : "";

          const filterList = listToFilter.filter(
            (list: List) =>
              list.productMaster?.toLowerCase() ===
                bookmark.descripcion.toLowerCase() &&
              list.marca?.toLowerCase() ===
                (brand !== "" ? brand : list.marca?.toLowerCase())
          );

          const listPrice = searchBestPrice(filterList);
          
          // Crear una nueva instancia del bookmark con los datos actualizados
          return {
            ...bookmark,
            best_price: listPrice ? listPrice.precioSinIva : 0,
            best_proveedor: listPrice ? listPrice.proveedor : "",
            articulo: listPrice ? listPrice.articulo : "",
          };
        });
        
        // Usar la copia modificada para ordenar
        bookmarksCopy.sort((a, b) => {
          if (a.descripcion.trim() < b.descripcion.trim()) {
            return -1;
          }
          if (a.descripcion.trim() > b.descripcion.trim()) {
            return 1;
          }
          return 0;
        });
        setData(bookmarksCopy);
      } catch (error) {
        console.error("Error al buscar el mejor precio", error);
      } finally {
        setLoading(false);
      }
    }
  }, [bookmarks, lists]);

  const searchBestPrice = (list: List[]) => {
    // search and return the best price
    let bestPriceItem;
    if (list.length > 0) {
      bestPriceItem = list.reduce((best, current) => {
        const currentPricePerQuantity = calculatePricePerQuantity(current);
        const bestPricePerQuantity = calculatePricePerQuantity(best);

        return currentPricePerQuantity < bestPricePerQuantity ? current : best;
      });
    }

    return bestPriceItem;
  };

  const handlerEdit = (id: string) => {
    navigate("/bookmarks/" + id);
  };

  const handlerDelete = (id: string) => {
    try {
      dispatch(DeleteBookmark(id));
    } catch (error) {
      console.error("Error al eliminar el bookmark", error);
      dispatch(DeleteBookmark(id));
    }

    const updatedData = data.filter((item) => item._id !== id);
    setData(updatedData);
  };

  return (
    <Box mb={5}>
      <TittleHeader title="Favoritos" onAdd={() => handlerEdit("new")} />

      {loading && <Loading />}
      {!loading && data.length > 0 && (
        <BookmarksTableComponent
          data={data}
          onDelete={handlerDelete}
          onEdit={handlerEdit}
        />
      )}
    </Box>
  );
};

export default Bookmarks;
