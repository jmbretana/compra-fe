import {
  ORDER_MAKE_REQ,
  ORDER_GETALL_SUCCESS,
  ORDER_GETALL_FAIL,
  ORDER_GET_SUCCESS,
  ORDER_GET_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_UPDATE_SUCCESS,
} from "@OrderActionTypes";
import { Order } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequestOrder = () => {
  return {
    type: ORDER_MAKE_REQ,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getAllRequestSuccess = (data: Order[]) => {
  return {
    type: ORDER_GETALL_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getRequestSuccess = (data: Order) => {
  return {
    type: ORDER_GET_SUCCESS,
    payload: data,
  };
};

export const createRequestSuccess = (data: Order) => {
  return {
    type: ORDER_CREATE_SUCCESS,
    payload: data,
  };
};

export const updateRequestSuccess = (data: Order) => {
  return {
    type: ORDER_UPDATE_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getAllRequestFail = (data: []) => {
  return {
    type: ORDER_GETALL_FAIL,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getRequestFail = (data: []) => {
  return {
    type: ORDER_GET_FAIL,
    payload: data,
  };
};
