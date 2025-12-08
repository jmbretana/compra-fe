import axios from "axios";
import {
  makeRequestProvider,
  getAllRequestFail,
  getAllRequestSuccess,
  getRequestFail,
  getRequestSuccess,
  createRequestSuccess,
  updateRequestSuccess,
} from "@actions/types/providersActionType";
import { Provider } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";

import { snackMakeRequest } from "@actions/types/snackActionType";

import { getApiEnvironment } from "@utils/environment";
const apiURL = getApiEnvironment() + "/providers/";

export const GetAllProviders = () => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestProvider());
      const res = await axios.get(apiURL);
      const _list: Provider[] = res.data.data;
      dispatch(getAllRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const GetProvider = (id: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURL}${id}`);

      if (res.data.status === "empty") {
        throw new Error("El resultado es inválido");
      }

      const _list: Provider = res.data.data;

      dispatch(getRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const CreateProvider = (newProvider: Provider) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const res = await axios.post(apiURL, newProvider);
      const _list: Provider = res.data.data;
      dispatch(getSnackSuccess("Proveedor generado correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear marca."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const UpdateProvider = (newProvider: Provider) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const url = apiURL + newProvider._id;
      const res = await axios.put(url, newProvider);
      const _list: Provider = res.data.data;
      dispatch(getSnackSuccess("Proveedor actualizado correctamente !"));
      dispatch(updateRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar marca."));
      dispatch(getRequestFail(err.message));
    }
  };
};
