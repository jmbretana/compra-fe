import {
  USER_MAKE_REQ,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "src/middleware/types/UserActionTypes";
import { User } from "@interfaces";

export const makeRequestUserAction = () => {
  return {
    type: USER_MAKE_REQ,
  };
};

export const loginUserSuccess = (data: User) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: data,
  };
};

// Acción para el éxito al agregar una solicitud
export const loginUserFail = (data: any) => {
  return {
    type: USER_LOGIN_FAIL,
    payload: data,
  };
};

export const logoutUserSuccess = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
    payload: undefined,
  };
};
