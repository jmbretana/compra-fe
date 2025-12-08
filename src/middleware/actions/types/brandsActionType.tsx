import {
  BRAND_MAKE_REQ,
  BRAND_GETALL_SUCCESS,
  BRAND_GETALL_FAIL,
  BRAND_GET_SUCCESS,
  BRAND_GET_FAIL,
  BRAND_CREATE_SUCCESS,
  BRAND_UPDATE_SUCCESS,
} from "src/middleware/types/BrandActionTypes";
import { Brand } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequestBrand = () => {
  return {
    type: BRAND_MAKE_REQ,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getAllRequestSuccess = (data: Brand[]) => {
  return {
    type: BRAND_GETALL_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getRequestSuccess = (data: Brand) => {
  return {
    type: BRAND_GET_SUCCESS,
    payload: data,
  };
};

export const createRequestSuccess = (data: Brand) => {
  return {
    type: BRAND_CREATE_SUCCESS,
    payload: data,
  };
};

export const updateRequestSuccess = (data: Brand) => {
  return {
    type: BRAND_UPDATE_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getAllRequestFail = (data: []) => {
  return {
    type: BRAND_GETALL_FAIL,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getRequestFail = (data: []) => {
  return {
    type: BRAND_GET_FAIL,
    payload: data,
  };
};
