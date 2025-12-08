import React from "react";

import { List } from "@interfaces";
import { useMemo } from "react";
import {
  type MRT_ColumnDef,
  type MRT_Cell,
  type MRT_Row,
} from "material-react-table";
import { TableComponent } from "@common";
import { Box, IconButton } from "@mui/material";
import { formatMoney } from "@utils/utils";
import { capitalizeFirstLetter } from "@utils/utils";

import BarChartIcon from "@mui/icons-material/BarChart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface TableProductsProps {
  data: List[];
  //
  onSelect: (productList: List) => void;
}

const ProvidersListasTableComponent: React.FunctionComponent<
  TableProductsProps
> = (props) => {
  const selectHandler = (productList: List) => {
    props.onSelect(productList);
  };

  const addProductHandler = (productList: List) => {
    const carritoGuardado = localStorage.getItem("carrito");
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    // Verificar si el articulo ya está en el carrito
    const productoExistente = carrito.find(
      (producto: List) => producto._id === productList._id
    );

    if (productoExistente) {
      // Si el articulo ya está en el carrito, actualizar la cantidad
      productoExistente.cantidad += 1;
    } else {
      // Si el articulo no está en el carrito, agregarlo
      carrito.push({ ...productList, cantidad: 1 });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const columns = useMemo<MRT_ColumnDef<List>[]>(
    () => [
      {
        accessorKey: "productMaster", //access nested data with dot notation
        header: "Articulo",
        size: 120,
        Cell: ({ cell }: { cell: MRT_Cell<List> }) => (
          <Box>{capitalizeFirstLetter(cell.getValue<string>())}</Box>
        ),
      },

      {
        accessorKey: "articulo", //access nested data with dot notation
        header: "Articulo",
        Cell: ({ cell }: { cell: MRT_Cell<List> }) => (
          <Box>{capitalizeFirstLetter(cell.getValue<string>())}</Box>
        ),
      },
      {
        accessorKey: "unidad", //access nested data with dot notation
        header: "Unidad",
        size: 80,
      },
      {
        accessorKey: "marca", //access nested data with dot notation
        header: "Marca",
        size: 80,
      },
      {
        accessorKey: "precioSinIva", //access nested data with dot notation
        header: "Precio",
        Cell: ({ cell }: { cell: MRT_Cell<List> }) => (
          <Box display={"flex"}>
            <Box sx={{ width: "20px" }}>$</Box>
            <Box sx={{ textAlign: "right", width: "90px" }}>
              {formatMoney(Number(cell.getValue<string>()))}
            </Box>
          </Box>
        ),
      },
      {
        id: "action",
        accessorKey: "budget_id", //access nested data with dot notation
        header: "Historico",
        size: 45,
        Cell: ({ row }: { cell: MRT_Cell<List>; row: MRT_Row<List> }) => (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <IconButton
              color="secondary"
              aria-label="consulta presupuesto"
              onClick={() => selectHandler(row.original)}
            >
              <BarChartIcon />
            </IconButton>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <IconButton
                color="secondary"
                aria-label="consulta presupuesto"
                onClick={() => addProductHandler(row.original)}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </Box>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <>
      <TableComponent columns={columns} data={props.data} />
    </>
  );
};

export default ProvidersListasTableComponent;
