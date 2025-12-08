import {
  AMOUNT_MAKE_REQ,
  AMOUNT_GETALL_SUCCESS,
  AMOUNT_GETALL_FAIL,
  AMOUNT_GET_SUCCESS,
  AMOUNT_GET_FAIL,
  AMOUNT_CREATE_SUCCESS,
  AMOUNT_UPDATE_SUCCESS,
} from "@AmountActionTypes";
import { Action, Amount } from "@interfaces";

interface AmountsState {
  amount: Amount | undefined;
  amounts: Amount[];
  count: number;
  statusAmount: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: AmountsState = {
  amount: undefined,
  amounts: [],
  count: 0,
  statusAmount: AMOUNT_MAKE_REQ,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de AMOUNTs
export const AmountReducer = (
  state = initialState,
  action: Action
): AmountsState => {
  switch (action.type) {
    case AMOUNT_MAKE_REQ:
      return {
        ...state,
        statusAmount: AMOUNT_MAKE_REQ,
        isLoading: true,
        error: null,
      };

    case AMOUNT_GETALL_SUCCESS:
      return {
        ...state,
        statusAmount: AMOUNT_GETALL_SUCCESS,
        isLoading: false,
        amounts: Array.isArray(action.payload)
          ? action.payload.map(amount => ({...amount}))
          : [],
        count: Array.isArray(action.payload) ? action.payload.length : 0
      };

    case AMOUNT_GETALL_FAIL:
      return {
        ...state,
        statusAmount: AMOUNT_GETALL_FAIL,
        isLoading: false,
        amounts: [],
        error: action.payload?.error || null,
      };

    case AMOUNT_GET_SUCCESS:
      return {
        ...state,
        statusAmount: AMOUNT_GET_SUCCESS,
        isLoading: false,
        amount: action.payload ? {...action.payload} : undefined,
      };

    case AMOUNT_CREATE_SUCCESS:
      // Create a new amount and add it to the array immutably
      return {
        ...state,
        statusAmount: AMOUNT_CREATE_SUCCESS,
        isLoading: false,
        amount: action.payload ? {...action.payload} : undefined,
        amounts: action.payload 
          ? [...state.amounts, {...action.payload}]
          : [...state.amounts],
        count: action.payload 
          ? state.count + 1 
          : state.count
      };

    case AMOUNT_UPDATE_SUCCESS:
      // Update existing amount immutably
      return {
        ...state,
        statusAmount: AMOUNT_UPDATE_SUCCESS,
        isLoading: false,
        amount: action.payload ? {...action.payload} : undefined,
        amounts: state.amounts.map(amount => 
          amount._id === action.payload?._id
            ? {...action.payload}
            : {...amount}
        )
      };

    case AMOUNT_GET_FAIL:
      return {
        ...state,
        statusAmount: AMOUNT_GET_FAIL,
        isLoading: false,
        amount: undefined,
        error: action.payload?.error || null,
      };

    default:
      return state;
  }
};
