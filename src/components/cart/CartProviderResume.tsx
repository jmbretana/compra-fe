import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  styled,
  Table,
  TableCell,
  tableCellClasses,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { InputNumber } from "@common";
import { capitalizeFirstLetter } from "@utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";

import { ButtonComponent } from "@common";
import DeleteIcon from "@mui/icons-material/Delete";
import { COLORS } from "@values/colors";
import TaskIcon from "@mui/icons-material/Task";
import { BlobProvider } from "@react-pdf/renderer";
import SaveIcon from "@mui/icons-material/Save";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import CarritoPedidoPDF from "./CartPedidoPDF";

import { GetAllCarts, RemoveCart } from "@actions/cartActions";
import { CreateOrder } from "@actions/ordersActions";
import { CART_GETALL_SUCCESS, CART_REMOVE_SUCCESS } from "@CartActionTypes";

import { List, Order, Provider } from "@interfaces";
import { formatMoney } from "@utils/utils";

interface CarritoProviderResumeProps {
  carts: List[];
  providers: Provider[];
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: COLORS.white,
    color: COLORS.grey,
    fontSize: "12px",
    padding: "5px",
    fontWeight: "normal",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.MuiTableRow-root`]: {
    fontSize: 14,
  },
}));

const CarritoProviderResume: React.FunctionComponent<
  CarritoProviderResumeProps
> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [carrito, setCarrito] = useState<List[]>(props.carts);
  const { carts, statusCart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (statusCart === CART_GETALL_SUCCESS) {
      setCarrito(carts);
    }

    if (statusCart === CART_REMOVE_SUCCESS) {
      dispatch(GetAllCarts());
    }
  }, [carts]);

  const removeProduct = (product: List) => {
    dispatch(RemoveCart(product));
    dispatch(GetAllCarts());
  };

  const addAmountProduct = (product: List, amount: number) => {
    const tempList = carrito ? [...carrito] : [];
    const index = tempList.findIndex(
      (item) => item.articulo === product.articulo
    );

    if (tempList.length > 0) tempList[index].cantidad = amount.toString();
    setCarrito(tempList);
  };

  //

  const columns = [
    {
      accessorKey: "articulo", //access nested data with dot notation
      header: "Articulo",
    },
    {
      accessorKey: "cantidad", //access nested data with dot notation
      header: "Cantidad",
    },
    {
      accessorKey: "precioSinIva", //access nested data with dot notation
      header: "Precio",
    },
    {
      accessorKey: "total", //access nested data with dot notation
      header: "Total",
    },
    {
      id: "action",
      accessorKey: "budget_id", //access nested data with dot notation
      header: "",
      size: 45,
    },
  ];

  const contactWhatsapp = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "").replace(/^0+/, ""); // Remove non-digits and leading zeros
    const text =
      "Hola, soy de la empresa compra, me comunico con ustedes para hacerles llegar un pedido. Adjunto a continuación el mismo";

    const url =
      "https://api.whatsapp.com/send/?phone=549" + cleaned + "&text=" + text;
    window.open(url, "_blank"); // Open URL in new tab
  };

  //

  const pdfView = (carritoFilter: List[]) => {
    return (
      <BlobProvider document={<CarritoPedidoPDF data={carritoFilter!} />}>
        {({ url }) => (
          <a href={url!} target="_blank" rel="noreferrer">
            <ButtonComponent
              startIcon={<TaskIcon />}
              text="Generar PDF"
              sx={{
                minWidth: "110px",
                backgroundColor: COLORS.red,
                color: COLORS.white,
                fontWeight: 600,
                borderRadius: "20px",
                padding: "5px 20px",
              }}
              //
              onClick={() => {}}
            />
          </a>
        )}
      </BlobProvider>
    );
  };

  const onSaveOrder = (carritoFilter: List[], provider: Provider) => {
    const date = new Date();
    const order: Order = {
      _id: "",
      order_id: date.getTime(),
      proveedor: carritoFilter[0].proveedor!,
      telefono: provider.telefono ? provider.telefono : "",
      fecha: date.toISOString(),
      total: carritoFilter.reduce(
        (acc, item) =>
          acc +
          Number(item.precioSinIva) * Number(item.cantidad ? item.cantidad : 1),
        0
      ),
      productsList: carritoFilter,
    };

    dispatch(CreateOrder(order));
  };
  //

  const tableView = (carritoFilter: List[]) => {
    return (
      <TableContainer
        sx={{
          background: COLORS.white,
          padding: "10px 0",
          borderRadius: "20px",
        }}
      >
        <Table sx={{ width: "100%" }} aria-label="table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id}>
                  {column.header}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {carritoFilter.map((row, index) => {
              return (
                <TableRow
                  key={index + row._id!}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      background: COLORS.grey_light,
                    },
                  }}
                >
                  <StyledTableCell>
                    <Box>{capitalizeFirstLetter(row.articulo)}</Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", gap: "0.5rem" }}>
                      <Box sx={{ display: "flex", gap: "0.5rem" }}>
                        <InputNumber
                          id="cantidad"
                          label=""
                          name="cantidad"
                          required={false}
                          value={parseInt(row.cantidad ? row.cantidad : "0")}
                          //
                          onChange={(e) =>
                            addAmountProduct(row, parseInt(e.target.value))
                          }
                        />
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box display={"flex"}>
                      <Box sx={{ width: "20px" }}>$</Box>
                      <Box sx={{ textAlign: "right", width: "90px" }}>
                        {formatMoney(Number(row.precioSinIva))}
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box display={"flex"}>
                      <Box sx={{ width: "20px" }}>$</Box>
                      <Box sx={{ textAlign: "right", width: "90px" }}>
                        {formatMoney(
                          Number(row.precioSinIva) *
                            Number(row.cantidad ? row.cantidad : 1)
                        )}
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", gap: "0.5rem" }}>
                      <Box sx={{ display: "flex", gap: "0.5rem" }}>
                        <IconButton
                          color="secondary"
                          aria-label="consulta presupuesto"
                          onClick={() => removeProduct(row)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </StyledTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const viewTables = () => {
    return props.providers.map((provider: Provider) => {
      const carritoFilter = carrito.filter(
        (item) =>
          item.proveedor?.toLowerCase() === provider.razon_social.toLowerCase()
      );

      if (carritoFilter.length > 0) {
        return (
          <Box
            key={provider._id}
            sx={{
              padding: "20px",
              borderRadius: "20px",
              backgroundColor: COLORS.white,
              marginBottom: "20px",
            }}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                sx={{
                  color: COLORS.grey_dark,
                  fontFamily: "Lexend",
                  fontWeight: 600,
                  fontSize: "24px",
                }}
                variant="h6"
              >
                {provider.razon_social}
              </Typography>
              <Box display={"flex"} gap={1}>
                <ButtonComponent
                  color="secondary"
                  startIcon={<WhatsAppIcon />}
                  onClick={() =>
                    contactWhatsapp(provider.telefono ? provider.telefono : "")
                  }
                  text="Contactar"
                  variant="text"
                  sx={{
                    backgroundColor: COLORS.green_light,
                    borderRadius: "20px",
                    padding: "5px 20px",
                  }}
                />
                <Box
                  display="flex"
                  gap="10px"
                  alignContent={"center"}
                  alignItems={"center"}
                >
                  {carrito && carrito?.length > 0 && pdfView(carritoFilter)}
                </Box>
                <ButtonComponent
                  color="secondary"
                  startIcon={<SaveIcon />}
                  onClick={() => onSaveOrder(carritoFilter, provider)}
                  text="Guardar Pedido"
                  sx={{
                    backgroundColor: COLORS.blue_dark + " !important",
                    color: COLORS.white,
                    borderRadius: "20px",
                    padding: "5px 20px",
                  }}
                />
              </Box>
            </Box>
            {tableView(carritoFilter)}

            {totalView(carritoFilter)}
          </Box>
        );
      }

      return null;
    });
  };

  const totalView = (carrito: List[]) => {
    const totalProvider = carrito.reduce(
      (acc, item) =>
        acc +
        Number(item.precioSinIva) * Number(item.cantidad ? item.cantidad : 1),
      0
    );

    return (
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        marginTop={2}
        gap={3}
        alignContent={"center"}
        alignItems={"center"}
      >
        <Typography
          sx={{
            color: COLORS.black,
            fontFamily: "Lexend",
          }}
          variant="h6"
        >
          Total:
        </Typography>
        <Typography
          sx={{
            color: COLORS.black,
            fontFamily: "Lexend",
          }}
          variant="h5"
        >
          ${formatMoney(totalProvider)}
        </Typography>
      </Box>
    );
  };

  return <>{viewTables()}</>;
};

export default CarritoProviderResume;
