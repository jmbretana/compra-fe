import {
  GEO_MAKE_REQ,
  GEO_GETTOWNS_SUCCESS,
  GEO_GETLOCALITIES_SUCCESS,
  GEO_GETPROVINCES_SUCCESS,
  GEO_GET_FAIL,
} from "src/middleware/types/GeoActionTypes";
import { Action, Locality, Province } from "@interfaces";

interface GeoState {
  status: string;
  error: string | null;
  isLoading: boolean;
  towns: Locality[];
  localities: Locality[];
  provinces: Province[];
}

const initialState: GeoState = {
  status: GEO_MAKE_REQ,
  error: null,
  isLoading: false,
  towns: [],
  localities: [],
  provinces: [],
};

export const GeoReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GEO_MAKE_REQ:
      return {
        ...state,
        isLoading: true, // Inicia una solicitud
      };
    case GEO_GETTOWNS_SUCCESS:
      return {
        ...state,
        status: GEO_GETTOWNS_SUCCESS,
        isLoading: false,
        towns: action.payload,
      };

    case GEO_GETLOCALITIES_SUCCESS:
      return {
        ...state,
        status: GEO_GETLOCALITIES_SUCCESS,
        isLoading: false,
        localities: action.payload,
      };
    case GEO_GETPROVINCES_SUCCESS:
      return {
        ...state,
        status: GEO_GETPROVINCES_SUCCESS,
        isLoading: false,
        provinces: action.payload,
      };
    case GEO_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        errormessage: action.payload, // Actualiza el mensaje de error
      };
    default:
      return state;
  }
};
