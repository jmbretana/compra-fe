import {
  LIST_MAKE_REQ,
  LIST_GET_SUCCESS,
  LIST_GETALL_SUCCESS,
  LIST_CREATE_SUCCESS,
  LIST_FILTER_SUCCESS,
  LIST_PAGINATED_SUCCESS,
  LIST_PAGINATED_FAIL,
  LIST_UPDATE_SUCCESS,
  LIST_UPDATE_FAIL,
  LIST_GET_FAIL,
  LIST_DELETE_SUCCESS,
  LIST_DELETE_FAIL,
} from "src/middleware/types/ListActionTypes";
import { Action, List, PaginatedResponse } from "@interfaces";

interface ListasState {
  list: List | null;
  lists: List[];
  paginatedData: PaginatedResponse<List> | null;
  statusLista: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: ListasState = {
  list: null,
  lists: [] as List[],
  paginatedData: null,
  statusLista: "",
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de lists
export const ListasReducer = (
  state = initialState,
  action: Action
): ListasState => {
  switch (action.type) {
    case LIST_MAKE_REQ:
      return {
        ...state,
        statusLista: LIST_MAKE_REQ,
        isLoading: true, // Inicia una solicitud
      };

    case LIST_CREATE_SUCCESS:
      return {
        ...state,
        statusLista: LIST_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
      };

    case LIST_UPDATE_SUCCESS:
      // Handle immutable update for updating a list item
      return {
        ...state,
        statusLista: LIST_UPDATE_SUCCESS,
        isLoading: false,
        // If payload is an array, update multiple lists
        lists: Array.isArray(action.payload)
          ? action.payload.map((updatedList) => ({ ...updatedList }))
          : // If payload is a single list, update just that one
          action.payload
          ? state.lists.map((list) =>
              list._id === action.payload._id
                ? { ...action.payload }
                : { ...list }
            )
          : [...state.lists],
      };

    case LIST_UPDATE_FAIL:
      return {
        ...state,
        statusLista: LIST_UPDATE_FAIL,
        isLoading: false, // Finaliza la solicitud con error
      };

    case LIST_GET_SUCCESS:
      // Ensure immutable update with new array and object references
      return {
        ...state,
        statusLista: LIST_GET_SUCCESS,
        isLoading: false,
        list: action.payload[0],
      };

    case LIST_GETALL_SUCCESS:
      // Ensure immutable update with new array and object references
      return {
        ...state,
        statusLista: LIST_GETALL_SUCCESS,
        isLoading: false,
        lists: Array.isArray(action.payload)
          ? action.payload.map((list) => ({ ...list }))
          : [],
      };

    case LIST_FILTER_SUCCESS:
      // Ensure immutable update with new array and object references
      return {
        ...state,
        statusLista: LIST_FILTER_SUCCESS,
        isLoading: false,
        lists: Array.isArray(action.payload)
          ? action.payload.map((list) => ({ ...list }))
          : [],
      };

    case LIST_PAGINATED_SUCCESS:
      // Handle paginated response
      return {
        ...state,
        statusLista: LIST_PAGINATED_SUCCESS,
        isLoading: false,
        paginatedData: action.payload,
      };

    case LIST_PAGINATED_FAIL:
      return {
        ...state,
        statusLista: LIST_PAGINATED_FAIL,
        isLoading: false,
        error: action.payload || null,
        paginatedData: null,
      };

    case LIST_GET_FAIL:
      return {
        ...state,
        statusLista: LIST_GET_FAIL,
        isLoading: false,
        error: action.payload?.error || null,
      };

    case LIST_DELETE_SUCCESS:
      return {
        ...state,
        statusLista: LIST_DELETE_SUCCESS,
        isLoading: false,
        lists: state.lists.filter((list) => list._id !== action.payload._id), // Remove the deleted list by ID
      };
    case LIST_DELETE_FAIL:
      return {
        ...state,
        statusLista: LIST_DELETE_FAIL,
        isLoading: false,
        error: action.payload?.error || null, // Capture error message if available
      };
    // Default case to return the current state if no action matches
    default:
      return state;
  }
};
