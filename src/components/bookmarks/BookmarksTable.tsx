import React from "react";

import { Bookmark, Product } from "@interfaces";
import { useMemo } from "react";
import { type MRT_ColumnDef, type MRT_Cell } from "material-react-table";
import { capitalizeFirstLetter } from "@utils/utils";
import { TableComponent } from "@common";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface TableProductsProps {
  data: Product[];
  //
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const BookmarksTableComponent: React.FunctionComponent<TableProductsProps> = (
  props
) => {
  const deleteHandler = (id: string) => {
    props.onDelete(id);
  };

  const editHandler = (id: string) => {
    props.onEdit(id);
  };

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "descripcion", //access nested data with dot notation
        header: "Descripcion",
        size: 200,
        Cell: ({ cell }: { cell: MRT_Cell<Product> }) => (
          <Box>{capitalizeFirstLetter(cell.getValue<string>())}</Box>
        ),
      },

      {
        accessorKey: "brand", //access nested data with dot notation
        header: "Marca",
        size: 90,
        Cell: ({ cell }: { cell: MRT_Cell<Product> }) => (
          <Box>{capitalizeFirstLetter(cell.getValue<string>())}</Box>
        ),
      },

      {
        accessorKey: "articulo", //access nested data with dot notation
        header: "Articulo",
        size: 200,
        Cell: ({ cell }: { cell: MRT_Cell<Product> }) => (
          <Box>{capitalizeFirstLetter(cell.getValue<string>())}</Box>
        ),
      },
      {
        accessorKey: "best_price", //access nested data with dot notation
        header: "Mejor precio",
        size: 100,
        Cell: ({ cell }: { cell: MRT_Cell<Product> }) => (
          <Box>$ {cell.getValue<string>()}</Box>
        ),
      },
      {
        accessorKey: "best_proveedor", //access nested data with dot notation
        header: "Proveedor",
        size: 100,
        Cell: ({ cell }: { cell: MRT_Cell<Product> }) => (
          <Box>{capitalizeFirstLetter(cell.getValue<string>())}</Box>
        ),
      },
      {
        accessorKey: "product_master_id", //access nested data with dot notation
        header: "Action",
        enableSorting: false,
        size: 30,
        Cell: ({ cell }: { cell: MRT_Cell<Bookmark> }) => (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <IconButton
              color="secondary"
              aria-label="editar marca"
              onClick={() => deleteHandler(cell.getValue<string>())}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="editar marca"
              onClick={() => editHandler(cell.getValue<string>())}
            >
              <EditIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <>
      <TableComponent columns={columns} data={props.data} rowsPerPage={50} />
    </>
  );
};

export default BookmarksTableComponent;
