import {
  BOOKMARK_MAKE_REQ,
  BOOKMARK_GETALL_SUCCESS,
  BOOKMARK_GETALL_FAIL,
  BOOKMARK_GET_SUCCESS,
  BOOKMARK_GET_FAIL,
  BOOKMARK_CREATE_SUCCESS,
  BOOKMARK_UPDATE_SUCCESS,
  BOOKMARK_DELETE_SUCCESS,
  BOOKMARK_DELETE_FAIL,
} from "@BookmarkActionTypes";
import { Action, Bookmark } from "@interfaces";

interface BookmarksState {
  bookmark: Bookmark | undefined;
  bookmarks: Bookmark[];
  count: number;
  statusBookmark: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: BookmarksState = {
  bookmark: undefined,
  bookmarks: [],
  count: 0,
  statusBookmark: BOOKMARK_MAKE_REQ,
  error: null,
  isLoading: false,
};

// Reducer que maneja el estado de BOOKMARKs
export const BookmarkReducer = (
  state = initialState,
  action: Action
): BookmarksState => {
  switch (action.type) {
    case BOOKMARK_MAKE_REQ:
      return {
        ...state,
        statusBookmark: BOOKMARK_MAKE_REQ,
        isLoading: true, // Inicia una solicitud
        error: null, // Limpia el mensaje de error
      };

    case BOOKMARK_GETALL_SUCCESS:
      return {
        ...state,
        statusBookmark: BOOKMARK_GETALL_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        bookmarks: Array.isArray(action.payload) 
          ? action.payload.map((bookmark) => ({ ...bookmark }))
          : [], // Crear copias inmutables de bookmarks
      };

    case BOOKMARK_GETALL_FAIL:
      return {
        ...state,
        statusBookmark: BOOKMARK_GETALL_FAIL,
        isLoading: false, // Finaliza la solicitud con error
        bookmarks: [], // Restablece la lista de BOOKMARKs
      };

    case BOOKMARK_GET_SUCCESS:
      return {
        ...state,
        statusBookmark: BOOKMARK_GET_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        bookmark: action.payload, // Actualiza la lista de BOOKMARKs
      };

    case BOOKMARK_CREATE_SUCCESS:
      return {
        ...state,
        statusBookmark: BOOKMARK_CREATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        bookmark: action.payload, // Actualiza la bookmark individual
        bookmarks: [...state.bookmarks, { ...action.payload }], // Añade el nuevo bookmark de forma inmutable
      };

    case BOOKMARK_UPDATE_SUCCESS:
      return {
        ...state,
        statusBookmark: BOOKMARK_UPDATE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        bookmark: action.payload, // Actualiza la bookmark individual
        bookmarks: state.bookmarks.map((bookmark) =>
          bookmark._id === action.payload._id ? { ...action.payload } : { ...bookmark }
        ), // Actualiza el bookmark específico de forma inmutable
      };

    case BOOKMARK_GET_FAIL:
      return {
        ...state,
        isLoading: false, // Finaliza la solicitud con error
        bookmark: undefined, // Restablece la lista de BOOKMARKs
        statusBookmark: BOOKMARK_GET_FAIL,
      };

    case BOOKMARK_DELETE_SUCCESS:
      return {
        ...state,
        statusBookmark: BOOKMARK_DELETE_SUCCESS,
        isLoading: false, // Finaliza la solicitud con éxito
        bookmarks: state.bookmarks.filter((bookmark) => 
          bookmark._id !== action.payload
        ), // Elimina el bookmark de forma inmutable
      };
    case BOOKMARK_DELETE_FAIL:
      return {
        ...state,
        statusBookmark: BOOKMARK_DELETE_FAIL,
        isLoading: false, // Finaliza la solicitud con error
        error: action.payload?.error || null, // Establece el mensaje de error
      };
    default:
      return state;
  }
};
