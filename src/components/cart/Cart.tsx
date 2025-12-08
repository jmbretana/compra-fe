import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";

import { ButtonComponent, TittleHeader } from "@common";
import DeleteIcon from "@mui/icons-material/Delete";
import { COLORS } from "@values/colors";

import { CART_GETALL_SUCCESS, CART_REMOVE_SUCCESS } from "@CartActionTypes";

import { GetAllCarts, ClearCart } from "@actions/cartActions";
import { GetAllProviders } from "@actions/providersActions";

import { List } from "@interfaces";
import CarritoProviderResume from "./CartProviderResume";

const CarritoComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [carrito, setCarrito] = useState<List[]>([]);

  const { carts, statusCart } = useSelector((state: RootState) => state.cart);
  const { providers } = useSelector((state: RootState) => state.providers);

  const initialFetchRef = React.useRef(false);

  useEffect(() => {
    if (!initialFetchRef.current) {
      try {
        dispatch(GetAllCarts());
      } catch (error) {
        console.error(error);
        dispatch(GetAllCarts());
      }
      initialFetchRef.current = true;
    }

    if (providers.length === 0) {
      try {
        dispatch(GetAllProviders());
      } catch (error) {
        console.error(error);
        dispatch(GetAllProviders());
      }
    }
  }, []);

  useEffect(() => {
    if (statusCart === CART_GETALL_SUCCESS) {
      setCarrito(carts);
    }

    if (statusCart === CART_REMOVE_SUCCESS) {
      dispatch(GetAllCarts());
    }
  }, [carts]);

  //

  const cleanView = (
    <ButtonComponent
      startIcon={<DeleteIcon />}
      text="Vaciar Carrito"
      sx={{
        minWidth: "110px",
        backgroundColor: COLORS.grey_300,
        color: "#000",
        fontWeight: 600,
        borderRadius: "20px",
        padding: "5px 20px",
      }}
      onClick={() => {
        setCarrito([]);
        dispatch(ClearCart());
      }}
    />
  );

  //

  const header = (
    <TittleHeader title="Pedidos">
      {carrito && carrito?.length > 0 && cleanView}
    </TittleHeader>
  );

  const emptyView = (
    <Box>
      <Typography
        sx={{
          color: COLORS.blue_dark,
          fontFamily: "Lexend",
          fontWeight: 400,
          fontSize: "18px",
        }}
        variant="h6"
      >
        No hay articulos en el carrito
      </Typography>
    </Box>
  );

  return (
    <>
      {header}

      {carts && carts.length > 0 && (
        <CarritoProviderResume carts={carts} providers={providers} />
      )}

      {carts && carts.length === 0 && (
        <Box
          sx={{
            padding: "20px",
            borderRadius: "20px",
            backgroundColor: COLORS.white,
          }}
        >
          {emptyView}
        </Box>
      )}
    </>
  );
};

export default CarritoComponent;
