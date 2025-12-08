import {
  snackFail,
  snackSuccess,
  snackMakeRequest,
} from "./types/snackActionType";

export const getInitialSnack = () => {
  return async (dispatch: any) => {
    dispatch(snackMakeRequest());
  };
};

export const getSnackSuccess = (message: string) => {
  return async (dispatch: any) => {
    const snack = message;
    dispatch(snackSuccess(snack));
  };
};

export const getSnackError = (message: string) => {
  return async (dispatch: any) => {
    const snack = message;
    dispatch(snackFail(snack));
  };
};
