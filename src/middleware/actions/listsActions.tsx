import axios from "axios";
import {
  createRequestSuccess,
  getListRequestSuccess,
  getAllListRequestSuccess,
  getRequestFail,
  makeRequest,
  updateRequestSuccess,
  updateRequestFail,
  getAllRequestFail,
  getFilterSuccess,
  getPaginatedSuccess,
  getPaginatedFail,
  deleteRequestSuccess,
  deleteRequestFail,
} from "@actions/types/listsActionType";
import { List, ListFilter, PaginatedResponse } from "@interfaces";
import { getSnackSuccess, getSnackError } from "@actions/snackActions";
import { getApiEnvironment } from "@utils/environment";

const apiURL = getApiEnvironment() + "/products/";
const apiURLMany = getApiEnvironment() + "/products/createMany/";
const apiURLUpdateMany = getApiEnvironment() + "/products/updateMany/";
const apiURLProductsFilter = getApiEnvironment() + "/products/filter/";
const apiURLAdvancedFilter = getApiEnvironment() + "/products/advanced-filter/";

export const InitialStatusList = () => {
  return async (dispatch: any) => {
    dispatch(makeRequest());
  };
};

export const CreateProductList = (newProduct: List) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.post(apiURL, newProduct);
      const _list: List = res.data.data;
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const CreateManyProductList = (newProduct: List[]) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.post(apiURLMany, newProduct);
      const _list: List = res.data.data;
      dispatch(createRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getRequestFail(err.message));
    }
  };
};

export const updateProductList = (newProduct: List) => {
  return async (dispatch: any) => {
    try {
      const url = apiURL + newProduct._id;
      const res = await axios.put(url, newProduct);
      const _list: List = res.data.data;
      dispatch(getSnackSuccess("Articulo actualizado correctamente !"));
      dispatch(updateRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError(err.message));
      dispatch(updateRequestFail(err.message));
    }
  };
};

export const UpdateManyProductList = (newProducts: List[]) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.put(apiURLUpdateMany, newProducts);
      const _list: List = res.data.data;
      dispatch(getSnackSuccess("Articulos actualizados correctamente !"));
      dispatch(updateRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getSnackError(err.message));
      dispatch(updateRequestFail(err.message));
    }
  };
};

export const GetAllLists = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURL);
      const _list: List[] = res.data.data;
      dispatch(getAllListRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const GetListById = (id: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`${apiURL}${id}`);
      const _list: List = res.data.data;
      dispatch(getListRequestSuccess(_list));
    } catch (err: any) {
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const GetAllListFiltered = (params: any) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURLProductsFilter, { params });
      const _list: List[] = res.data.data;
      dispatch(getFilterSuccess(_list));
    } catch (err: any) {
      console.error(err);
      dispatch(getAllRequestFail(err.message));
    }
  };
};

export const GetPaginatedProducts = (params: any) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(apiURLAdvancedFilter, { params });
      const paginatedResponse: PaginatedResponse<List> = {
        success: res.data.success,
        data: res.data.data,
        pagination: res.data.pagination,
        status: res.data.status,
      };
      dispatch(getPaginatedSuccess(paginatedResponse));
    } catch (err: any) {
      console.error(err);
      dispatch(getPaginatedFail(err.message));
    }
  };
};

export const DeleteListFilter = (filter: ListFilter) => {
  return async (dispatch: any) => {
    try {
      const url = apiURL + "filter/";
      await axios.delete(url, { params: filter });

      dispatch(getSnackSuccess("Articulo eliminado correctamente !"));
      dispatch(deleteRequestSuccess([]));
    } catch (err: any) {
      dispatch(getSnackError(err.message));
      dispatch(deleteRequestFail(err.message));
    }
  };
};

export const DeleteListById = (id: string) => {
  return async (dispatch: any) => {
    try {
      const url = apiURL + id;
      await axios.delete(url);

      dispatch(getSnackSuccess("Articulo eliminado correctamente !"));
      dispatch(deleteRequestSuccess([]));
    } catch (err: any) {
      dispatch(getSnackError(err.message));
      dispatch(deleteRequestFail(err.message));
    }
  };
};
