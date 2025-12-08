import axios from "axios";
import {
  makeRequestBrand,
  getAllRequestFail,
  getAllRequestSuccess,
  getRequestFail,
  getRequestSuccess,
  createRequestSuccess,
  updateRequestSuccess,
} from "@actions/types/brandsActionType";
import { Brand } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";

import { snackMakeRequest } from "@actions/types/snackActionType";

import { getApiEnvironment } from "@utils/environment";
const apiURL = getApiEnvironment() + "/brands/";

// Función para obtener todos los articulos
export const GetAllBrands = () => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestBrand());
      const res = await axios.get(apiURL);
      const _list: Brand[] = res.data.data;
      dispatch(getAllRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

// Función para obtener todos los articulos
export const GetBrand = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestBrand());
      const res = await axios.get(`${apiURL}${id}`);

      if (res.data.status === "empty") {
        throw new Error("El resultado es inválido");
      }

      const _list: Brand = res.data.data;

      dispatch(getRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const CreateBrand = (newBrand: Brand) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const res = await axios.post(apiURL, newBrand);
      const _list: Brand = res.data.data;
      dispatch(getSnackSuccess("Marca creada correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear marca."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const UpdateBrand = (newBrand: Brand) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const url = apiURL + newBrand._id;
      const res = await axios.put(url, newBrand);
      const _list: Brand = res.data.data;
      dispatch(getSnackSuccess("Marca actualizada correctamente !"));
      dispatch(updateRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar marca."));
      dispatch(getRequestFail(err.message));
    }
  };
};
