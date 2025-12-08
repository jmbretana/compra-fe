import {
  AMOUNT_MAKE_REQ,
  AMOUNT_GETALL_SUCCESS,
  AMOUNT_GETALL_FAIL,
  AMOUNT_GET_SUCCESS,
  AMOUNT_GET_FAIL,
  AMOUNT_CREATE_SUCCESS,
  AMOUNT_UPDATE_SUCCESS,
} from "src/middleware/types/AmountActionTypes";
import { Amount } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequestAmount = () => {
  return {
    type: AMOUNT_MAKE_REQ,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getAllRequestSuccess = (data: Amount[]) => {
  return {
    type: AMOUNT_GETALL_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getRequestSuccess = (data: Amount) => {
  return {
    type: AMOUNT_GET_SUCCESS,
    payload: data,
  };
};

export const createRequestSuccess = (data: Amount) => {
  return {
    type: AMOUNT_CREATE_SUCCESS,
    payload: data,
  };
};

export const updateRequestSuccess = (data: Amount) => {
  return {
    type: AMOUNT_UPDATE_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getAllRequestFail = (data: []) => {
  return {
    type: AMOUNT_GETALL_FAIL,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getRequestFail = (data: []) => {
  return {
    type: AMOUNT_GET_FAIL,
    payload: data,
  };
};
