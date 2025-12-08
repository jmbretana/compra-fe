import {
  PROVIDER_MAKE_REQ,
  PROVIDER_GETALL_SUCCESS,
  PROVIDER_GETALL_FAIL,
  PROVIDER_GET_SUCCESS,
  PROVIDER_GET_FAIL,
  PROVIDER_CREATE_SUCCESS,
  PROVIDER_UPDATE_SUCCESS,
} from "@ProviderActionTypes";
import { Provider } from "@interfaces";

// Acción para iniciar una solicitud
export const makeRequestProvider = () => {
  return {
    type: PROVIDER_MAKE_REQ,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getAllRequestSuccess = (data: Provider[]) => {
  return {
    type: PROVIDER_GETALL_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al obtener todas las solicitudes
export const getRequestSuccess = (data: Provider) => {
  return {
    type: PROVIDER_GET_SUCCESS,
    payload: data,
  };
};

export const createRequestSuccess = (data: Provider) => {
  return {
    type: PROVIDER_CREATE_SUCCESS,
    payload: data,
  };
};

export const updateRequestSuccess = (data: Provider) => {
  return {
    type: PROVIDER_UPDATE_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getAllRequestFail = (data: []) => {
  return {
    type: PROVIDER_GETALL_FAIL,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const getRequestFail = (data: []) => {
  return {
    type: PROVIDER_GET_FAIL,
    payload: data,
  };
};
