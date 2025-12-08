import axios from "axios";
import {
  makeRequestBookmark,
  getAllRequestFail,
  getAllRequestSuccess,
  getRequestFail,
  getRequestSuccess,
  createRequestSuccess,
  updateRequestSuccess,
  deleteRequestSuccess,
  deleteRequestFail,
} from "@actions/types/bookmarksActionType";
import { Bookmark } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";

import { snackMakeRequest } from "@actions/types/snackActionType";

import { getApiEnvironment } from "@utils/environment";
const apiURL = getApiEnvironment() + "/bookmarks/";

// Función para obtener todos los articulos
export const GetAllBookmarks = () => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestBookmark());
      const res = await axios.get(apiURL);
      const _list: Bookmark[] = res.data.data;
      dispatch(getAllRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

// Función para obtener todos los articulos
export const GetBookmark = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestBookmark());
      const res = await axios.get(`${apiURL}${id}`);

      if (res.data.status === "empty") {
        throw new Error("El resultado es inválido");
      }

      const _list: Bookmark = res.data.data;

      dispatch(getRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const CreateBookmark = (newBookmark: Bookmark) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const res = await axios.post(apiURL, newBookmark);
      const _list: Bookmark = res.data.data;
      dispatch(getSnackSuccess("Marca creada correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear favorito."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const UpdateBookmark = (newBookmark: Bookmark) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const url = apiURL + newBookmark.product_master_id;
      const res = await axios.put(url, newBookmark);
      const _list: Bookmark = res.data.data;
      dispatch(getSnackSuccess("Marca actualizada correctamente !"));
      dispatch(updateRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar favorito."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const DeleteBookmark = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const url = apiURL + id;
      await axios.delete(url);
      dispatch(getSnackSuccess("Favorito eliminado correctamente !"));
      dispatch(deleteRequestSuccess(id)); // Pass the deleted bookmark ID
    } catch (err: any) {
      dispatch(getSnackError("Error al eliminar favorito."));
      dispatch(deleteRequestFail(err.message));
    }
  };
};
