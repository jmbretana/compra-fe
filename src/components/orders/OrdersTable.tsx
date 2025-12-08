import React from "react";

import { Order } from "@interfaces";
import { useMemo } from "react";
import { type MRT_ColumnDef, type MRT_Cell } from "material-react-table";
import { TableComponent } from "@common";
import { Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { capitalizeFirstLetter, formatMoney } from "@utils/utils";
import { formatDate } from "@utils/utils";

interface TableProductsProps {
  data: Order[];
  //
  onEdit: (id: string) => void;
}

const OrdersTable: React.FunctionComponent<TableProductsProps> = (props) => {
  const editHandler = (id: string) => {
    props.onEdit(id);
  };

  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "fecha", //access nested data with dot notation
        header: "Fecha",
        Cell: ({ cell }: { cell: MRT_Cell<Order> }) => (
          <Box>{formatDate(cell.getValue<string>())}</Box>
        ),
      },
      {
        accessorKey: "proveedor", //access nested data with dot notation
        header: "Proveedor",
        Cell: ({ cell }: { cell: MRT_Cell<Order> }) => (
          <Box>{capitalizeFirstLetter(cell.getValue<string>())}</Box>
        ),
      },
      {
        accessorKey: "total", //access nested data with dot notation
        header: "Total",
        Cell: ({ cell }: { cell: MRT_Cell<Order> }) => (
          <Box>$ {formatMoney(cell.getValue<number>())}</Box>
        ),
      },
      {
        accessorKey: "_id",
        header: "Action",
        enableSorting: false,
        size: 30,
        Cell: ({ cell }: { cell: MRT_Cell<Order> }) => (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <IconButton
              color="secondary"
              aria-label="editar marca"
              onClick={() => editHandler(cell.getValue<string>())}
            >
              <SearchIcon />
            </IconButton>
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

export default OrdersTable;
