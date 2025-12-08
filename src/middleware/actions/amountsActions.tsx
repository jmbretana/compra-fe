import axios from "axios";
import {
  makeRequestAmount,
  getAllRequestFail,
  getAllRequestSuccess,
  getRequestFail,
  getRequestSuccess,
  createRequestSuccess,
} from "@actions/types/amountsActionType";
import { Amount } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";

import { snackMakeRequest } from "@actions/types/snackActionType";

import { getApiEnvironment } from "@utils/environment";
const apiURL = getApiEnvironment() + "/amounts/";

// Función para obtener todos los articulos
export const GetAllAmounts = () => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestAmount());
      const res = await axios.get(apiURL);
      const _list: Amount[] = res.data.data;
      dispatch(getAllRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

// Función para obtener todos los articulos
export const GetAmount = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestAmount());
      const res = await axios.get(`${apiURL}${id}`);

      if (res.data.status === "empty") {
        throw new Error("El resultado es inválido");
      }

      const _list: Amount = res.data.data;

      dispatch(getRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const CreateAmount = (newAmount: Amount) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const res = await axios.post(apiURL, newAmount);
      const _list: Amount = res.data.data;
      dispatch(getSnackSuccess("Marca creada correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear marca."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const UpdateAmount = (newAmount: Amount) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const url = apiURL + newAmount._id;
      const res = await axios.put(url, newAmount);
      const _list: Amount = res.data.data;
      dispatch(getSnackSuccess("Marca actualizada correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar marca."));
      dispatch(getRequestFail(err.message));
    }
  };
};
