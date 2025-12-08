import {
  LIST_GETALL_SUCCESS,
  LIST_GET_SUCCESS,
  LIST_CREATE_SUCCESS,
  LIST_FILTER_SUCCESS,
  LIST_PAGINATED_SUCCESS,
  LIST_PAGINATED_FAIL,
  LIST_UPDATE_SUCCESS,
  LIST_UPDATE_FAIL,
  LIST_GET_FAIL,
  LIST_GETALL_FAIL,
  LIST_MAKE_REQ,
  LIST_DELETE_SUCCESS,
  LIST_DELETE_FAIL,
} from "@ListActionTypes";
import { List, PaginatedResponse } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequest = () => {
  return {
    type: LIST_MAKE_REQ,
  };
};

// Acción para el éxito al obtener todas las solicitudes

export const getListRequestSuccess = (data: List) => {
  return {
    type: LIST_GET_SUCCESS,
    payload: data,
  };
};

export const getAllListRequestSuccess = (data: List[]) => {
  return {
    type: LIST_GETALL_SUCCESS,
    payload: data,
  };
};

export const getFilterSuccess = (data: List[]) => {
  return {
    type: LIST_FILTER_SUCCESS,
    payload: data,
  };
};

export const getPaginatedSuccess = (data: PaginatedResponse<List>) => {
  return {
    type: LIST_PAGINATED_SUCCESS,
    payload: data,
  };
};

export const getPaginatedFail = (error: string) => {
  return {
    type: LIST_PAGINATED_FAIL,
    payload: error,
  };
};

export const createRequestSuccess = (data: List) => {
  return {
    type: LIST_CREATE_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al actualizar una solicitud
export const updateRequestSuccess = (data: List) => {
  return {
    type: LIST_UPDATE_SUCCESS,
    payload: data,
  };
};

// Acción para el fallo al actualizar una solicitud
export const updateRequestFail = (data: List) => {
  return {
    type: LIST_UPDATE_FAIL,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getRequestFail = (data: []) => {
  return {
    type: LIST_GET_FAIL,
    payload: data,
  };
};

export const getAllRequestFail = (data: []) => {
  return {
    type: LIST_GETALL_FAIL,
    payload: data,
  };
};

export const deleteRequestSuccess = (data: []) => {
  return {
    type: LIST_DELETE_SUCCESS,
    payload: data,
  };
};

export const deleteRequestFail = (data: []) => {
  return {
    type: LIST_DELETE_FAIL,
    payload: data,
  };
};
