import {
  PRODUCT_MAKE_REQ,
  PRODUCT_GETALL_SUCCESS,
  PRODUCT_GETALL_FILTER_SUCCESS,
  PRODUCT_GETALL_FAIL,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_SUCCESS,
} from "src/middleware/types/ProductActionTypes";
import { Action, Product } from "@interfaces";

interface ProductsState {
  product: Product | undefined;
  products: Product[];
  count: number;
  statusProduct: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: ProductsState = {
  product: undefined,
  products: [],
  count: 0,
  statusProduct: PRODUCT_MAKE_REQ,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de products
export const ProductReducer = (
  state = initialState,
  action: Action
): ProductsState => {
  switch (action.type) {
    case PRODUCT_MAKE_REQ:
      return {
        ...state,
        statusProduct: PRODUCT_MAKE_REQ,
        isLoading: true, // Inicia la solicitud
        error: null, // Limpia el mensaje de error
      };

    case PRODUCT_GETALL_SUCCESS:
      return {
        ...state,
        statusProduct: PRODUCT_GETALL_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        products: Array.isArray(action.payload) ? [...action.payload] : [],
        count: Array.isArray(action.payload) ? action.payload.length : 0,
      };

    case PRODUCT_GETALL_FILTER_SUCCESS:
      return {
        ...state,
        statusProduct: PRODUCT_GETALL_FILTER_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        products: action.payload, // Actualiza la lista de products
        count: action.payload.length,
      };

    case PRODUCT_GET_SUCCESS:
      return {
        ...state,
        statusProduct: PRODUCT_GET_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        product: action.payload ? { ...action.payload } : undefined,
      };

    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        statusProduct: PRODUCT_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        product: action.payload ? { ...action.payload } : undefined,
        products: action.payload
          ? [...state.products, { ...action.payload }]
          : [...state.products],
      };

    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        statusProduct: PRODUCT_UPDATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        product: action.payload ? { ...action.payload } : undefined,
        products: action.payload
          ? state.products.map((prod) =>
              prod.product_master_id === action.payload.product_master_id
                ? { ...action.payload }
                : prod
            )
          : [...state.products],
      };

    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        statusProduct: PRODUCT_DELETE_SUCCESS,
        isLoading: false,
        product: undefined,
        products:
          action.payload && action.payload.id
            ? [
                ...state.products.filter(
                  (product) => product.product_master_id !== action.payload.id
                ),
              ]
            : [...state.products],
      };
    // Maneja los errores de las solicitudes
    case PRODUCT_GETALL_FAIL:
    case PRODUCT_GET_FAIL:
    case PRODUCT_CREATE_FAIL:
    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        statusProduct: action.type,
        isLoading: false,
        error: action.payload, // Actualiza el error
      };
    default:
      return state;
  }
};
