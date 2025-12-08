import {
  PROVIDER_MAKE_REQ,
  PROVIDER_GETALL_SUCCESS,
  PROVIDER_GETALL_FAIL,
  PROVIDER_GET_SUCCESS,
  PROVIDER_GET_FAIL,
  PROVIDER_CREATE_SUCCESS,
  PROVIDER_UPDATE_SUCCESS,
} from "@ProviderActionTypes";
import { Action, Provider } from "@interfaces";

interface ProviderState {
  provider: Provider | undefined;
  providers: Provider[];
  statusProvider: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: ProviderState = {
  provider: undefined,
  providers: [],
  statusProvider: PROVIDER_MAKE_REQ,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de PROVIDERs
export const ProviderReducer = (
  state = initialState,
  action: Action
): ProviderState => {
  switch (action.type) {
    case PROVIDER_MAKE_REQ:
      return {
        ...state,
        statusProvider: PROVIDER_MAKE_REQ,
        isLoading: true, // Inicia una solicitud
        error: null, // Limpia el mensaje de error
      };

    case PROVIDER_GETALL_SUCCESS:
      return {
        ...state,
        statusProvider: PROVIDER_GETALL_SUCCESS,
        isLoading: false,
        // Ensure immutable update with new array and object references
        providers: Array.isArray(action.payload)
          ? action.payload.map((provider) => ({ ...provider }))
          : [],
      };

    case PROVIDER_GETALL_FAIL:
      return {
        ...state,
        statusProvider: PROVIDER_GETALL_FAIL,
        isLoading: false, // Finaliza la solicitud con error
        providers: [], // Restablece la lista de PROVIDERs
      };

    case PROVIDER_GET_SUCCESS:
      return {
        ...state,
        statusProvider: PROVIDER_GET_SUCCESS,
        isLoading: false,
        provider: action.payload ? { ...action.payload } : undefined,
      };

    case PROVIDER_CREATE_SUCCESS:
      return {
        ...state,
        statusProvider: PROVIDER_CREATE_SUCCESS,
        isLoading: false,
        provider: action.payload ? { ...action.payload } : undefined,
        // Add the new provider to the providers array immutably
        providers: action.payload
          ? [...state.providers, { ...action.payload }]
          : state.providers,
      };

    case PROVIDER_UPDATE_SUCCESS:
      return {
        ...state,
        statusProvider: PROVIDER_UPDATE_SUCCESS,
        isLoading: false,
        provider: action.payload ? { ...action.payload } : undefined,
        // Update the provider in the providers array immutably
        providers: state.providers.map((provider) =>
          provider._id === action.payload._id
            ? { ...action.payload } // Create a new object
            : { ...provider } // Create a new object for all providers
        ),
      };

    case PROVIDER_GET_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        provider: undefined, // Restablece la lista de PROVIDERs
        statusProvider: PROVIDER_GET_FAIL,
      };
    default:
      return state;
  }
};
