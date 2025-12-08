import { SNACK_MAKE_REQ, SNACK_SUCCESS, SNACK_FAIL } from "@SnackActionTypes";

export const snackMakeRequest = () => {
  return {
    type: SNACK_MAKE_REQ,
  };
};

export const snackSuccess = (data: string) => {
  return {
    type: SNACK_SUCCESS,
    payload: data,
  };
};

export const snackFail = (data: string) => {
  return {
    type: SNACK_FAIL,
    payload: data,
  };
};
