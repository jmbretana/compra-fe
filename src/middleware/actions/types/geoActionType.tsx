import {
  GEO_MAKE_REQ,
  GEO_GETTOWNS_SUCCESS,
  GEO_GETLOCALITIES_SUCCESS,
  GEO_GETPROVINCES_SUCCESS,
  GEO_GET_FAIL,
} from "src/middleware/types/GeoActionTypes";
import { Locality, Province } from "@interfaces";

export const makeRequest = () => {
  return {
    type: GEO_MAKE_REQ,
  };
};

export const getTownsSuccess = (data: Locality[]) => {
  return {
    type: GEO_GETTOWNS_SUCCESS,
    payload: data,
  };
};

export const getLocalitiesSuccess = (data: Locality[]) => {
  return {
    type: GEO_GETLOCALITIES_SUCCESS,
    payload: data,
  };
};

export const getProvinceSuccess = (data: Province[]) => {
  return {
    type: GEO_GETPROVINCES_SUCCESS,
    payload: data,
  };
};

export const getRequestFail = (data: []) => {
  return {
    type: GEO_GET_FAIL,
    payload: data,
  };
};
