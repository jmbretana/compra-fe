import {
  CART_MAKE_REQ,
  CART_GETALL_SUCCESS,
  CART_GETALL_FAIL,
  CART_GET_SUCCESS,
  CART_GET_FAIL,
  CART_CREATE_SUCCESS,
  CART_UPDATE_SUCCESS,
  CART_REMOVE_SUCCESS,
} from "src/middleware/types/CartActionTypes";
import { List } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequestList = () => {
  return {
    type: CART_MAKE_REQ,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getAllRequestSuccess = (data: List[]) => {
  return {
    type: CART_GETALL_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getRequestSuccess = (data: List) => {
  return {
    type: CART_GET_SUCCESS,
    payload: data,
  };
};

export const createRequestSuccess = (data: List) => {
  return {
    type: CART_CREATE_SUCCESS,
    payload: data,
  };
};

export const updateRequestSuccess = (data: List) => {
  return {
    type: CART_UPDATE_SUCCESS,
    payload: data,
  };
};

export const removeRequestSuccess = (data: List) => {
  return {
    type: CART_REMOVE_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getAllRequestFail = (data: []) => {
  return {
    type: CART_GETALL_FAIL,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getRequestFail = (data: []) => {
  return {
    type: CART_GET_FAIL,
    payload: data,
  };
};
