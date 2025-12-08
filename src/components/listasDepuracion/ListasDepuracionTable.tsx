import React from "react";
import { Box, IconButton } from "@mui/material";

import { TableComponent } from "@common";
import { List, Product } from "@interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/middleware/store/store";
import { capitalizeFirstLetter } from "@utils/utils";
import { useMemo } from "react";
import {
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { updateProductList } from "@actions/listsActions";
import { COLORS } from "@values/colors";
import EditIcon from "@mui/icons-material/Edit";

interface TableProductsProps {
  data: List[];
  masterProduct: Product[];
  //
  onEditProduct: (product: List) => void;
}

const ListasTableComponent: React.FunctionComponent<TableProductsProps> = (
  props
) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateProduct = (product_id?: string) => {
    const product = props.data.find((item) => item._id === product_id);
    if (!product) return;

    const prodData = {
      ...product,
      productMaster: "",
    };

    try {
      dispatch(updateProductList(prodData));
    } catch (error) {
      console.error("Error al agregar a favoritos", error);
      dispatch(updateProductList(prodData));
    }
  };

  const selectHandler = (product: List) => {
    props.onEditProduct(product);
  };

  const columns = useMemo<MRT_ColumnDef<List>[]>(
    () => [
      {
        accessorKey: "proveedor", //access nested data with dot notation
        header: "Proveedor",
        Cell: ({ cell }: { cell: MRT_Cell<List> }) => (
          <Box
            sx={{ color: COLORS.grey, fontSize: "0.7rem", textAlign: "center" }}
          >
            {cell.getValue<string>().toLocaleUpperCase()}
          </Box>
        ),
        size: 100,
      },
      {
        accessorKey: "productMaster", //access nested data with dot notation
        header: "Master",
        Cell: ({ row }: { cell: MRT_Cell<List>; row: MRT_Row<List> }) => (
          <Box
            display={"flex"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box>{capitalizeFirstLetter(row.original.productMaster)}</Box>
            <Box>
              {row.original.productMaster !== "" ? (
                <IconButton
                  size="small"
                  onClick={() => handleUpdateProduct(row.original._id!)}
                >
                  x
                </IconButton>
              ) : (
                ""
              )}
            </Box>
          </Box>
        ),
        size: 100,
      },

      {
        accessorKey: "articulo", //access nested data with dot notation
        header: "Articulo",
        size: 90,
        Cell: ({ cell }: { cell: MRT_Cell<List> }) => (
          <Box>{capitalizeFirstLetter(cell.getValue<string>())}</Box>
        ),
      },

      {
        accessorKey: "medida", //access nested data with dot notation
        header: "Medida",
        size: 30,
      },
      {
        accessorKey: "marca", //access nested data with dot notation
        header: "Marca",
        size: 90,
        Cell: ({ cell }: { cell: MRT_Cell<List> }) => (
          <Box>{capitalizeFirstLetter(cell.getValue<string>())}</Box>
        ),
      },
      {
        accessorKey: "vigente", //access nested data with dot notation
        header: "Vigente",
        size: 30,
        Cell: ({ cell }: { cell: MRT_Cell<List> }) => (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {cell.getValue() ? (
              <Box sx={{ color: "green" }}>Si</Box>
            ) : (
              <Box sx={{ color: "red" }}>No</Box>
            )}
          </Box>
        ),
      },
      {
        id: "action",
        accessorKey: "budget_id", //access nested data with dot notation
        header: "",
        size: 35,
        Cell: ({ row }: { cell: MRT_Cell<List>; row: MRT_Row<List> }) => (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <IconButton
                color="secondary"
                aria-label="consulta presupuesto"
                onClick={() => selectHandler(row.original)}
              >
                <EditIcon />
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
      <TableComponent
        columns={columns}
        data={props.data}
        enableColumnFilters={false}
        rowsPerPage={50}
      />
    </>
  );
};

export default ListasTableComponent;
