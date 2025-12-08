import axios from "axios";
import {
  makeRequestList,
  getAllRequestFail,
  getAllRequestSuccess,
  getRequestFail,
  getRequestSuccess,
  createRequestSuccess,
  removeRequestSuccess,
} from "@actions/types/cartActionType";
import { List } from "@interfaces";

import { getSnackSuccess, getSnackError } from "@actions/snackActions";
import { snackMakeRequest } from "@actions/types/snackActionType";

import { getApiEnvironment } from "@utils/environment";
const apiURL = getApiEnvironment() + "/brands/";

// Función para obtener todos los articulos
export const GetAllCarts = () => {
  return async (dispatch: any) => {
    try {
      const carritoGuardado = localStorage.getItem("carrito");
      const _list: List[] = JSON.parse(
        carritoGuardado ? carritoGuardado : "[]"
      );
      dispatch(getAllRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

// Función para obtener todos los articulos
export const GetList = (id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestList());
      const res = await axios.get(`${apiURL}${id}`);

      if (res.data.status === "empty") {
        throw new Error("El resultado es inválido");
      }

      const _list: List = res.data.data;

      dispatch(getRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const ClearCart = () => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      localStorage.removeItem("carrito");
      dispatch(getSnackSuccess("Carrito limpiado correctamente !"));
      dispatch(getAllRequestSuccess([]));
    } catch (err: any) {
      dispatch(getSnackError("Error al limpiar carrito."));
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const CreateCart = (newList: List) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      // Leer el carrito de compras desde localStorage
      const carritoGuardado = localStorage.getItem("carrito");
      const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

      // Verificar si el articulo ya está en el carrito
      const productoExistente = carrito.find(
        (producto: List) => producto._id === newList._id
      );

      if (productoExistente) {
        // Si el articulo ya está en el carrito, actualizar la cantidad
        productoExistente.cantidad += 1;
      } else {
        // Si el articulo no está en el carrito, agregarlo
        carrito.push({ ...newList, cantidad: 1 });
      }

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem("carrito", JSON.stringify(carrito));

      const _list: List = carrito;
      dispatch(getSnackSuccess("Item agregado correctamente !"));
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      console.error("Error", err);
      dispatch(getSnackError("Error al crear marca."));
      dispatch(getRequestFail(err.message));
    }
  };
};

export const RemoveCart = (newList: List) => {
  return async (dispatch: any) => {
    try {
      dispatch(snackMakeRequest());
      const carritoGuardado = localStorage.getItem("carrito");
      const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

      // Leer el carrito de compras desde localStorage
      const nuevoCarrito = carrito.filter(
        (producto: List) => producto._id !== newList._id
      );

      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      const _list: List = nuevoCarrito;
      dispatch(getSnackSuccess("Item eliminado correctamente !"));
      dispatch(removeRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError("Error al eliminar item."));
      dispatch(getRequestFail(err.message));
    }
  };
};
