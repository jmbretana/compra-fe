import axios from "axios";
import {
  makeRequestOrder,
  getAllRequestFail,
  getAllRequestSuccess,
  getRequestFail,
  getRequestSuccess,
  createRequestSuccess,
} from "@actions/types/ordersActionType";
import { Order } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";

import { snackMakeRequest } from "@actions/types/snackActionType";

import { getApiEnvironment } from "@utils/environment";
const apiURL = getApiEnvironment() + "/orders/";

// Función para obtener todos los articulos
export const GetAllOrders = () => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestOrder());
      const res = await axios.get(apiURL);
      const _list: Order[] = res.data.data;
      dispatch(getAllRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

// Función para obtener todos los articulos
export const GetOrder = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestOrder());
      const res = await axios.get(`${apiURL}${id}`);

      if (res.data.status === "empty") {
        throw new Error("El resultado es inválido");
      }

      const _list: Order = res.data.data;

      dispatch(getRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const CreateOrder = (newOrder: Order) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const res = await axios.post(apiURL, newOrder);
      const _list: Order = res.data.data;
      dispatch(getSnackSuccess("Pedido creado correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear pedido."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const UpdateOrder = (newOrder: Order) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const url = apiURL + newOrder._id;
      const res = await axios.put(url, newOrder);
      const _list: Order = res.data.data;
      dispatch(getSnackSuccess("Pedido actualizado correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar pedido."));
      dispatch(getRequestFail(err.message));
    }
  };
};
