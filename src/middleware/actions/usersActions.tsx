import axios from "axios";

import {
  loginUserSuccess,
  loginUserFail,
  logoutUserSuccess,
  makeRequestUserAction,
} from "@actions/types/usersActionType";
import { User } from "@interfaces";
import { getSnackError, getInitialSnack } from "./snackActions";
import { getApiEnvironment } from "@utils/environment";

const apiURLUserLogin = getApiEnvironment() + "/users/login/";

export const makeRequestUser = () => {
  return (dispatch: any) => {
    dispatch(makeRequestUserAction());
  };
};

export const getUserLogin = (user: User) => {
  return async (dispatch: any) => {
    try {
      dispatch(makeRequestUser());

      const params = {
        username: user.username,
        password: user.password,
      };

      const res = await axios.get(apiURLUserLogin, { params });
      const _list: User = res.data.data;

      if (_list && Object.keys(_list).length > 0) {
        dispatch(getInitialSnack());
        dispatch(loginUserSuccess(_list));
      } else {
        throw new Error("Error de usuario/contraseña.");
      }
    } catch (err: any) {
      dispatch(getSnackError("Error de usuario/contraseña."));
      dispatch(loginUserFail(err.message));
    }
  };
};

export const getUserLogout = () => {
  return async (dispatch: any) => {
    try {
      dispatch(logoutUserSuccess());
    } catch (err: any) {
      console.error(err);
      dispatch(logoutUserSuccess());
    }
  };
};
