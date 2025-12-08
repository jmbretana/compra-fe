import {
  USER_INITIAL,
  USER_MAKE_REQ,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
} from "src/middleware/types/UserActionTypes";
import { Action, User } from "@interfaces";

interface UsersState {
  user: User | undefined;
  statusUser: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: UsersState = {
  user: undefined,
  statusUser: USER_INITIAL,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de products
export const UserReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case USER_INITIAL:
      return {
        ...state,
        statusUser: USER_INITIAL,
      };
    case USER_MAKE_REQ:
      return {
        ...state,
        statusUser: USER_MAKE_REQ,
        isLoading: true, // Finaliza la solicitud con éxito
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        statusUser: USER_LOGIN_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        user: action.payload, // Actualiza la lista de products
      };

    case USER_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        user: undefined, // Restablece la lista de products
        statusUser: USER_LOGIN_FAIL,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        statusUser: USER_LOGOUT_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        user: action.payload, // Actualiza la lista de products
      };

    default:
      return state;
  }
};
