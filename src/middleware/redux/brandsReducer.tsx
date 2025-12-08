import {
  BRAND_MAKE_REQ,
  BRAND_GETALL_SUCCESS,
  BRAND_GETALL_FAIL,
  BRAND_GET_SUCCESS,
  BRAND_GET_FAIL,
  BRAND_CREATE_SUCCESS,
  BRAND_UPDATE_SUCCESS,
} from "@BrandActionTypes";
import { Action, Brand } from "@interfaces";

interface BrandsState {
  brand: Brand | undefined;
  brands: Brand[];
  count: number;
  statusBrand: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: BrandsState = {
  brand: undefined,
  brands: [],
  count: 0,
  statusBrand: BRAND_MAKE_REQ,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de BRANDs
export const BrandReducer = (
  state = initialState,
  action: Action
): BrandsState => {
  switch (action.type) {
    case BRAND_MAKE_REQ:
      return {
        ...state,
        statusBrand: BRAND_MAKE_REQ,
        isLoading: true, // Inicia una solicitud
        error: null, // Limpia el mensaje de error
      };

    case BRAND_GETALL_SUCCESS:
      return {
        ...state,
        statusBrand: BRAND_GETALL_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        brands: action.payload, // Actualiza la lista de BRANDs
      };

    case BRAND_GETALL_FAIL:
      return {
        ...state,
        statusBrand: BRAND_GETALL_FAIL,
        isLoading: false, // Finaliza la solicitud con error
        brands: [], // Restablece la lista de BRANDs
      };

    case BRAND_GET_SUCCESS:
      return {
        ...state,
        statusBrand: BRAND_GET_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        brand: action.payload, // Actualiza la lista de BRANDs
      };

    case BRAND_CREATE_SUCCESS:
      return {
        ...state,
        statusBrand: BRAND_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        brand: action.payload, // Actualiza la lista de BRANDs
      };

    case BRAND_UPDATE_SUCCESS:
      return {
        ...state,
        statusBrand: BRAND_UPDATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        brand: action.payload, // Actualiza la lista de BRANDs
      };

    case BRAND_GET_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        brand: undefined, // Restablece la lista de BRANDs
        statusBrand: BRAND_GET_FAIL,
      };
    default:
      return state;
  }
};
