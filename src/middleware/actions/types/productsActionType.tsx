import {
  PRODUCT_MAKE_REQ,
  PRODUCT_GETALL_SUCCESS,
  PRODUCT_GETALL_FAIL,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GETALL_FILTER_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
} from "@ProductActionTypes";
import { Product } from "@interfaces";

// Acción para iniciar una solicitud
export const makeProductRequest = () => {
  return {
    type: PRODUCT_MAKE_REQ,
    payload: null,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getAllRequestSuccess = (data: Product[]) => {
  return {
    type: PRODUCT_GETALL_SUCCESS,
    payload: data,
  };
};

export const getAllFilterRequestSuccess = (data: Product[]) => {
  return {
    type: PRODUCT_GETALL_FILTER_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getRequestSuccess = (data: Product) => {
  return {
    type: PRODUCT_GET_SUCCESS,
    payload: data,
  };
};

export const createRequestSuccess = (data: Product) => {
  return {
    type: PRODUCT_CREATE_SUCCESS,
    payload: data,
  };
};

export const updateRequestSuccess = (data: Product) => {
  return {
    type: PRODUCT_UPDATE_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getAllRequestFail = (data: []) => {
  return {
    type: PRODUCT_GETALL_FAIL,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getRequestFail = (data: []) => {
  return {
    type: PRODUCT_GET_FAIL,
    payload: data,
  };
};

export const deleteRequestSuccess = (data: Product) => {
  return {
    type: PRODUCT_DELETE_SUCCESS,
    payload: data,
  };
};
