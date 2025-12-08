import {
  BOOKMARK_MAKE_REQ,
  BOOKMARK_GETALL_SUCCESS,
  BOOKMARK_GETALL_FAIL,
  BOOKMARK_GET_SUCCESS,
  BOOKMARK_GET_FAIL,
  BOOKMARK_CREATE_SUCCESS,
  BOOKMARK_UPDATE_SUCCESS,
  BOOKMARK_DELETE_SUCCESS,
  BOOKMARK_DELETE_FAIL,
} from "src/middleware/types/BookmarkActionTypes";
import { Bookmark } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequestBookmark = () => {
  return {
    type: BOOKMARK_MAKE_REQ,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getAllRequestSuccess = (data: Bookmark[]) => {
  return {
    type: BOOKMARK_GETALL_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getRequestSuccess = (data: Bookmark) => {
  return {
    type: BOOKMARK_GET_SUCCESS,
    payload: data,
  };
};

export const createRequestSuccess = (data: Bookmark) => {
  return {
    type: BOOKMARK_CREATE_SUCCESS,
    payload: data,
  };
};

export const updateRequestSuccess = (data: Bookmark) => {
  return {
    type: BOOKMARK_UPDATE_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getAllRequestFail = (data: []) => {
  return {
    type: BOOKMARK_GETALL_FAIL,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getRequestFail = (data: []) => {
  return {
    type: BOOKMARK_GET_FAIL,
    payload: data,
  };
};

// Acción para el éxito al eliminar una solicitud
export const deleteRequestSuccess = (data: string) => {
  return {
    type: BOOKMARK_DELETE_SUCCESS,
    payload: data,
  };
};

// Acción para el fallo al eliminar una solicitud
export const deleteRequestFail = (data: []) => {
  return {
    type: BOOKMARK_DELETE_FAIL,
    payload: data,
  };
};
