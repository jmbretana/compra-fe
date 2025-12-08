import axios from "axios";
import {
  getAllRequestFail,
  getAllRequestSuccess,
  getAllFilterRequestSuccess,
  getRequestFail,
  getRequestSuccess,
  createRequestSuccess,
  deleteRequestSuccess,
  updateRequestSuccess,
} from "@actions/types/productsActionType";
import { Product } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";
import { snackMakeRequest } from "@actions/types/snackActionType";

import { getApiEnvironment } from "@utils/environment";

const apiURLProducts = getApiEnvironment() + "/productsMaster/";
const apiURLProductsFilter = getApiEnvironment() + "/productsMaster/filter/";

export const GetAllProducts = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURLProducts);
      const _list: Product[] = res.data.data;
      dispatch(getAllRequestSuccess([..._list])); // Crear una copia del array
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const GetProduct = (id: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURLProducts}${id}`);

      if (res.data.status === "empty") {
        throw new Error("El resultado es inválido");
      }

      const _list: Product = res.data.data;

      dispatch(getRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const CreateProduct = (newProduct: Product) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const res = await axios.post(apiURLProducts, newProduct);
      const _list: Product = res.data.data;
      dispatch(getSnackSuccess("Articulo generado correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al crear articulo."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const UpdateProduct = (newProduct: Product) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const url = apiURLProducts + newProduct.product_master_id;
      const res = await axios.put(url, newProduct);
      const _list: Product = res.data.data;
      dispatch(getSnackSuccess("Articulo actualizado correctamente !"));
      dispatch(updateRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al actualizar articulo."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const DeleteProduct = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());

      const url = apiURLProducts + id;
      const res = await axios.delete(url);
      const _list: Product = res.data.data;
      dispatch(getSnackSuccess("Articulo dado de baja correctamente !"));
      dispatch(deleteRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al dar de baja el articulo."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const GetAllProductFiltered = (params: any) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURLProductsFilter, { params });
      const _list: Product[] = res.data.data;
      dispatch(getAllFilterRequestSuccess(_list));
    } catch (err: any) {
      console.error(err);
      dispatch(getAllRequestFail(err.message));
    }
  };
};
