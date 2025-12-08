import {
  SNACK_FAIL,
  SNACK_MAKE_REQ,
  SNACK_SUCCESS,
} from "src/middleware/types/SnackActionTypes";
import { Action } from "@interfaces";

interface SnackState {
  message: string;
  status: string;
  isLoading: boolean;
}

const initialState: SnackState = {
  message: "",
  status: SNACK_MAKE_REQ,
  isLoading: false,
};

// Reducer que maneja el estado de snack
export const SnackReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SNACK_MAKE_REQ:
      return {
        ...state,
        status: SNACK_MAKE_REQ,
        isLoading: true, // Inicia una solicitud
      };

    case SNACK_SUCCESS:
      return {
        ...state,
        status: SNACK_SUCCESS,
        message: action.payload,
        isLoading: false,
      };

    case SNACK_FAIL:
      return {
        ...state,
        status: SNACK_FAIL,
        message: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
