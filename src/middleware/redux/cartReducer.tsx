import {
  CART_MAKE_REQ,
  CART_GETALL_SUCCESS,
  CART_GETALL_FAIL,
  CART_GET_SUCCESS,
  CART_GET_FAIL,
  CART_CREATE_SUCCESS,
  CART_UPDATE_SUCCESS,
  CART_REMOVE_SUCCESS,
} from "@CartActionTypes";
import { Action, List } from "@interfaces";

interface CartsState {
  cart: List | undefined;
  carts: List[];
  count: number;
  statusCart: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: CartsState = {
  cart: undefined,
  carts: [],
  count: 0,
  statusCart: CART_MAKE_REQ,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de CARTs
export const CartReducer = (
  state = initialState,
  action: Action
): CartsState => {
  switch (action.type) {
    case CART_MAKE_REQ:
      return {
        ...state,
        statusCart: CART_MAKE_REQ,
        isLoading: true, // Inicia una solicitud
        error: null, // Limpia el mensaje de error
      };

    case CART_GETALL_SUCCESS:
      return {
        ...state,
        statusCart: CART_GETALL_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        carts: action.payload, // Actualiza la lista de CARTs
      };

    case CART_GETALL_FAIL:
      return {
        ...state,
        statusCart: CART_GETALL_FAIL,
        isLoading: false, // Finaliza la solicitud con error
        carts: [], // Restablece la lista de CARTs
      };

    case CART_GET_SUCCESS:
      return {
        ...state,
        statusCart: CART_GET_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        cart: action.payload, // Actualiza la lista de CARTs
      };

    case CART_CREATE_SUCCESS:
      return {
        ...state,
        statusCart: CART_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        cart: action.payload, // Actualiza la lista de CARTs
      };

    case CART_UPDATE_SUCCESS:
      return {
        ...state,
        statusCart: CART_UPDATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        cart: action.payload, // Actualiza la lista de CARTs
      };

    case CART_REMOVE_SUCCESS:
      return {
        ...state,
        statusCart: CART_REMOVE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        cart: action.payload, // Actualiza la lista de CARTs
      };

    case CART_GET_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        cart: undefined, // Restablece la lista de CARTs
        statusCart: CART_GET_FAIL,
      };
    default:
      return state;
  }
};
