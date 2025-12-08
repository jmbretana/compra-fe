import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import HeaderComponent from "@components/Header";
import FooterComponent from "@components/Footer";

import { Box, Container, Snackbar, Alert } from "@mui/material";
import { SnackbarCloseReason } from "@mui/material/Snackbar";

import { useDispatch } from "react-redux";
import {
  SNACK_MAKE_REQ,
  SNACK_FAIL,
  SNACK_SUCCESS,
} from "src/middleware/types/SnackActionTypes";
import { getInitialSnack } from "src/middleware/actions/snackActions";

import { COLORS } from "@values/colors";
import { AppDispatch, RootState } from "src/middleware/store/store";

const LayoutRoot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const snack = useSelector((state: RootState) => state.snack);

  useEffect(() => {
    if (snack.status === SNACK_SUCCESS) {
      setOpen(true);
      setError(false);
      setMessage(snack.message ? snack.message.toString() : "");
      const timer = setTimeout(() => {
        dispatch(getInitialSnack());
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (snack.status === SNACK_FAIL) {
      setOpen(true);
      setError(true);
      setMessage(snack.message ? snack.message.toString() : "");
    }

    if (snack.status === SNACK_MAKE_REQ) {
      setOpen(false);
      setError(false);
    }
  }, [snack.status]);

  return (
    <>
      {" "}
      <HeaderComponent />
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars ? COLORS.blue_dark : COLORS.grey_300,
            overflow: "auto",
          })}
        >
          <Container>
            <Box pt={5} sx={{ minHeight: "88vh", width: "100%" }}>
              <Outlet />
            </Box>
          </Container>
          <FooterComponent />
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Adjusted for top right position
      >
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LayoutRoot;
