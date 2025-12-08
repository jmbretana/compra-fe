import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "@interfaces";
import Loading from "@common/Loading";

import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { COLORS } from "@values/colors";
import { BlobProvider } from "@react-pdf/renderer";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { GetAllOrders, GetOrder } from "@actions/ordersActions";
import { AppDispatch, RootState } from "src/middleware/store/store";
import { ButtonComponent, FormGridColumn, TypoTittle } from "@common";

import { ORDER_CREATE_SUCCESS, ORDER_GET_SUCCESS } from "@OrderActionTypes";
import { formatDate, formatMoney, capitalizeFirstLetter } from "@utils/utils";
import { makeStyles, createStyles } from "@mui/styles";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import OrderPDF from "./pdf/OrderPDF";

// styles
const useStyles = makeStyles(() =>
  createStyles({
    typeTitle: {
      color: COLORS.black + " !important",
      fontFamily: "Lexend",
      fontWeight: 400,
      fontSize: "24px !important",
      lineHeight: "40px",
    },

    typeHeader: {
      color: COLORS.grey,
      fontFamily: "Lexend",
      fontWeight: 500 + " !important",
      fontSize: "20px !important",
      lineHeight: "20px",
      paddingBottom: "10px",
    },
  })
);

const OrdersFormComponent: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Order>({
    proveedor: "",
    fecha: "",
    total: 0,
    productsList: [],
  });

  const { order, statusOrder } = useSelector(
    (state: RootState) => state.orders
  );

  let first = true;

  useEffect(() => {
    if (first) {
      first = false;
      dispatch(GetOrder(id!));
    }
  }, []);

  useEffect(() => {
    if (statusOrder === ORDER_GET_SUCCESS && order) {
      setFormData(order);
      setLoading(false);
    }

    if (statusOrder === ORDER_CREATE_SUCCESS && order) {
      dispatch(GetAllOrders());
      navigate("/orders");
    }
  }, [statusOrder]);

  const handleCancel = () => {
    navigate("/orders");
  };

  //

  const contactWhatsapp = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "").replace(/^0+/, ""); // Remove non-digits and leading zeros
    const text =
      "Hola, soy de la empresa Salve, me comunico con ustedes para hacerles llegar un pedido. Adjunto a continuación el mismo";

    const url =
      "https://api.whatsapp.com/send/?phone=549" + cleaned + "&text=" + text;
    window.open(url, "_blank"); // Open URL in new tab
  };

  const pdfView = () => {
    return (
      <BlobProvider document={<OrderPDF order={formData} />}>
        {({ url }) => (
          <a
            href={url!}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
            }}
          >
            <Box
              pt="7px"
              sx={{
                color: COLORS.grey,
                borderRadius: "20px",
                padding: "5px 20px",
                fontFamily: "Lexend",
                fontSize: "13px",
                border: "1px solid " + COLORS.grey,

                ":hover": {
                  color: COLORS.black,
                  borderColor: COLORS.grey,
                  backgroundColor: COLORS.grey,
                },
              }}
            >
              Generar PDF
            </Box>
          </a>
        )}
      </BlobProvider>
    );
  };

  const formOrderHeader = (
    <Box
      sx={{
        background: COLORS.white,
        borderRadius: "20px",
        border: "1px solid #e0e0e0",
        padding: "20px",
        marginBottom: "20px",
        fontFamily: "Lexend",
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"}>
          <TypoTittle title="Pedido" />
        </Box>
        <ButtonComponent
          text="Volver"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={() => handleCancel()}
          sx={{
            borderRadius: "20px",
            padding: "5px 20px",
          }}
          variant="text"
        />{" "}
      </Box>

      <Box display={"flex"} gap={1} justifyContent={"end"}>
        {order && order.telefono !== undefined && order.telefono !== "" && (
          <ButtonComponent
            color="secondary"
            startIcon={<WhatsAppIcon />}
            onClick={() =>
              contactWhatsapp(order!.telefono ? order!.telefono : "")
            }
            text="Contactar"
            variant="text"
            sx={{
              backgroundColor: COLORS.green_light,
              borderRadius: "20px",
              padding: "5px 20px",
            }}
          />
        )}
        <Box
          display="flex"
          gap="10px"
          alignContent={"center"}
          alignItems={"center"}
        >
          {order && order.productsList?.length > 0 && pdfView()}
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ background: COLORS.white }}>
        <FormGridColumn size={{ xs: 4 }}>
          <Typography className={classes.typeHeader}>Proveedor</Typography>
          <Typography>{capitalizeFirstLetter(formData.proveedor)}</Typography>
        </FormGridColumn>
        <FormGridColumn size={{ xs: 4 }}>
          <Typography className={classes.typeHeader}>Fecha</Typography>
          <Typography>{formatDate(formData.fecha)}</Typography>
        </FormGridColumn>
      </Grid>
    </Box>
  );

  const formOrderDetail = () => {
    return (
      <Box
        sx={{
          background: COLORS.white,
          borderRadius: "20px",
          border: "1px solid #e0e0e0",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <Grid container spacing={3} sx={{ background: COLORS.white }}>
          <FormGridColumn size={{ xs: 12 }}>
            <Typography className={classes.typeTitle}>Articulos</Typography>

            <Grid
              mt={3}
              container
              spacing={3}
              sx={{ background: COLORS.white }}
            >
              <FormGridColumn size={{ xs: 4 }}>
                <Typography className={classes.typeHeader}>Articulo</Typography>
              </FormGridColumn>
              <FormGridColumn size={{ xs: 2, md: 2 }}>
                <Typography className={classes.typeHeader}>Cantidad</Typography>
              </FormGridColumn>
              <FormGridColumn size={{ xs: 2, md: 2 }}>
                <Typography className={classes.typeHeader}>Precio</Typography>
              </FormGridColumn>
              <FormGridColumn size={{ xs: 2, md: 2 }}>
                <Typography className={classes.typeHeader}>Total </Typography>
              </FormGridColumn>
            </Grid>

            {formData.productsList.map((product, index) => (
              <Grid
                container
                spacing={3}
                sx={{ background: COLORS.white }}
                key={index}
              >
                <FormGridColumn size={{ xs: 4 }}>
                  <Typography>
                    {capitalizeFirstLetter(product.articulo)}
                  </Typography>
                </FormGridColumn>
                <FormGridColumn size={{ xs: 2, md: 2 }}>
                  <Typography>{product.cantidad}</Typography>
                </FormGridColumn>
                <FormGridColumn size={{ xs: 2, md: 2 }}>
                  <Typography>
                    $ {formatMoney(product.precioSinIva!)}
                  </Typography>
                </FormGridColumn>
                <FormGridColumn size={{ xs: 2, md: 2 }}>
                  <Typography>
                    ${" "}
                    {formatMoney(
                      product.precioSinIva! * Number(product!.cantidad!)
                    )}
                  </Typography>
                </FormGridColumn>
              </Grid>
            ))}
          </FormGridColumn>
        </Grid>
      </Box>
    );
  };

  const formOrderFooter = (
    <Box
      sx={{
        background: COLORS.white,
        border: "1px solid " + COLORS.grey_600,
        borderRadius: "20px",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"end"}
        alignContent={"center"}
        alignItems={"center"}
        gap={4}
      >
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h5">$ {formatMoney(formData.total)}</Typography>
      </Box>{" "}
    </Box>
  );
  return (
    <>
      {loading && <Loading />}

      {!loading && (
        <Box>
          {formOrderHeader}
          {formOrderDetail()}
          {formOrderFooter}
        </Box>
      )}
    </>
  );
};

export default OrdersFormComponent;
