import React, { useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import { CreateCart, GetAllCarts } from "@actions/cartActions";
import { List } from "@interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/middleware/store/store";
import { capitalizeFirstLetter } from "@utils/utils";
import { COLORS } from "@values/colors";
import ChipBestPrice from "@components/listas/components/ChipBestPrice";
import {
  calculateFinalPrice,
  calculatePricePerQuantity,
  calculateUnit,
} from "@components/listas/functions/functionsList";

interface TableProductsProps {
  data: List[];
  onEditProduct: (item: List) => void;
}

const ListasTableComponent: React.FunctionComponent<TableProductsProps> = (
  props
) => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = React.useState<List[]>(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  //

  const addProductHandler = (productList: List) => {
    try {
      dispatch(CreateCart(productList));
      dispatch(GetAllCarts());
    } catch (error) {
      console.error("Error carrito", error);
      dispatch(CreateCart(productList));
    }
  };

  const editProductHandler = (item: List) => {
    props.onEditProduct(item);
  };

  const viewCalculate = (item: List) => (
    <>
      <Box sx={{ fontSize: "0.8em", width: "90px" }}>
        <Box pb={1}>
          {" "}
          {item.medida} {"  "}
          {item.unidad}
        </Box>
        <Box>
          {"Cantidad: "}
          {item.cantidad}
        </Box>
      </Box>
      <Box sx={{ fontSize: "0.8em", width: "100px" }}>
        Precio x {calculateUnit(item.unidad || "")}:{" "}
      </Box>
      <Box
        sx={{
          fontSize: "0.8em",
          fontWeight: 500,
          color: COLORS.green_dark,
          width: "100px",
          textAlign: "end",
        }}
      >
        $ {calculatePricePerQuantity(item)}
      </Box>
    </>
  );

  const firstColumnView = (item: List) => (
    <Box
      display={"flex"}
      gap={1}
      flexDirection={"column"}
      sx={{
        width: {
          xs: "300px",
          sm: "300px",
          md: "300px",
          lg: "450px",
        },
      }}
    >
      <Box
        sx={{
          fontWeight: 500,
        }}
      >
        {capitalizeFirstLetter(
          item.articulo.slice(0, 50).replace("undefined", "")
        )}
      </Box>

      <Box>
        <Box
          sx={{
            color: COLORS.grey_dark,
            width: "200px",
            fontSize: "0.8rem",
          }}
        >
          {item.productMaster !== "" && item.productMaster !== undefined // quitar palabra undefined de la descripcion
            ? capitalizeFirstLetter(item.productMaster)
            : "-"}
        </Box>

        <Box
          display={"flex"}
          gap={1}
          flexDirection={"row"}
          justifyContent={"space-between"}
          width={300}
        >
          <Box sx={{ color: COLORS.grey, fontSize: "0.7rem" }}>
            {item.proveedor?.toUpperCase()}
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const secondColumnView = (item: List) => (
    <Box
      display={"flex"}
      gap={1}
      justifyContent={"end"}
      sx={{
        display: {
          xs: "none",
          sm: "none",
          md: "flex",
          lg: "flex",
        },
        // responsive width
        width: {
          md: "200px",
          lg: "300px",
        },
      }}
    >
      <Box display={"flex"} gap={1} flexDirection={"column"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{
            paddingRight: "30px",
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "flex",
            },
            // responsive width
            width: {
              md: "100%",
            },
          }}
        >
          {item.medida && viewCalculate(item)}
        </Box>
        <Box display={"flex"} gap={1} justifyContent={"end"} paddingRight={2}>
          {item.productMaster && item.medida && (
            <ChipBestPrice item={item} list={data} />
          )}
        </Box>
      </Box>
    </Box>
  );

  const thirdColumnView = (item: List) => (
    <Box
      sx={{
        width: "150px",
        borderLeft: "1px solid " + COLORS.grey,
        paddingLeft: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={{
          fontWeight: 500,
          fontSize: "0.8rem",
        }}
      >
        <Box sx={{ color: COLORS.grey }}>Precio</Box>${" "}
        {calculateFinalPrice(item)}
      </Box>

      <Box display={"flex"} justifyContent={"end"}>
        <IconButton
          color="secondary"
          aria-label="quitar"
          sx={{
            color: COLORS.grey,
          }}
          onClick={() => editProductHandler(item)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="agregar"
          sx={{
            color: COLORS.grey,
          }}
          onClick={() => addProductHandler(item)}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        gap={1}
        flexDirection={"column"}
      >
        {data.map((item, index) => {
          if (!item.articulo) return;

          return (
            <Box
              key={index}
              sx={{
                border: "1px solid " + COLORS.grey_300,
                padding: "15px",
                borderRadius: "20px",
                fontSize: "0.9rem",
                fontFamily: "Lexend",
                backgroundColor: COLORS.white,
              }}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                {firstColumnView(item)}
                {secondColumnView(item)}
                {thirdColumnView(item)}
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default ListasTableComponent;
