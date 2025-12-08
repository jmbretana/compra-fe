import {
  ORDER_MAKE_REQ,
  ORDER_GETALL_SUCCESS,
  ORDER_GETALL_FAIL,
  ORDER_GET_SUCCESS,
  ORDER_GET_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_UPDATE_SUCCESS,
} from "@OrderActionTypes";
import { Action, Order } from "@interfaces";

interface OrdersState {
  order: Order | undefined;
  orders: Order[];
  count: number;
  statusOrder: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: OrdersState = {
  order: undefined,
  orders: [],
  count: 0,
  statusOrder: ORDER_MAKE_REQ,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de ORDERs
export const OrderReducer = (
  state = initialState,
  action: Action
): OrdersState => {
  switch (action.type) {
    case ORDER_MAKE_REQ:
      return {
        ...state,
        statusOrder: ORDER_MAKE_REQ,
        isLoading: true, // Inicia una solicitud
        error: null, // Limpia el mensaje de error
      };

    case ORDER_GETALL_SUCCESS:
      return {
        ...state,
        statusOrder: ORDER_GETALL_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        orders: action.payload, // Actualiza la lista de ORDERs
      };

    case ORDER_GETALL_FAIL:
      return {
        ...state,
        statusOrder: ORDER_GETALL_FAIL,
        isLoading: false, // Finaliza la solicitud con error
        orders: [], // Restablece la lista de ORDERs
      };

    case ORDER_GET_SUCCESS:
      return {
        ...state,
        statusOrder: ORDER_GET_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        order: action.payload, // Actualiza la lista de ORDERs
      };

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        statusOrder: ORDER_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        order: action.payload, // Actualiza la lista de ORDERs
      };

    case ORDER_UPDATE_SUCCESS:
      return {
        ...state,
        statusOrder: ORDER_UPDATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        order: action.payload, // Actualiza la lista de ORDERs
      };

    case ORDER_GET_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        order: undefined, // Restablece la lista de ORDERs
        statusOrder: ORDER_GET_FAIL,
      };
    default:
      return state;
  }
};
