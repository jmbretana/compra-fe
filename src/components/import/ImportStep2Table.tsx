import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { type MRT_ColumnDef, type MRT_Cell } from "material-react-table";

import { TableComponent } from "@common";
import { List } from "@interfaces";
import { capitalizeFirstLetter } from "@utils/utils";

interface ImportStep2TableProps {
  data: List[];
  update?: boolean;
  //
}

const ImportStep2Table: React.FunctionComponent<ImportStep2TableProps> = (
  props
) => {
  const columns = useMemo<MRT_ColumnDef<List>[]>(
    () => [
      // si es update sumar la columna _id
      ...(props.update
        ? [
            {
              accessorKey: "_id", //access nested data with dot notation
              header: "ID",
              size: 100,
            },
          ]
        : []),

      {
        accessorKey: "proveedor", //access nested data with dot notation
        header: "Proveedor",
        align: "center",
        size: 50,
        Cell: ({ cell }: { cell: MRT_Cell<List> }) => (
          <Box>{capitalizeFirstLetter(cell.getValue<string>())}</Box>
        ),
      },
      {
        accessorKey: "articulo", //access nested data with dot notation
        header: "Articulo",
        size: 300,
        Cell: ({ cell }: { cell: MRT_Cell<List> }) => (
          <Box>
            {capitalizeFirstLetter(cell.getValue<string>()).slice(0, 50)}
          </Box>
        ),
      },
      {
        accessorKey: "medida", //access nested data with dot notation
        header: "Medida",
        size: 50,
      },
      {
        accessorKey: "unidad", //access nested data with dot notation
        header: "Unidad",
        size: 50,
      },
      {
        accessorKey: "cantidad", //access nested data with dot notation
        header: "Cantidad",
        size: 50,
      },
      {
        accessorKey: "precioSinIva", //access nested data with dot notation
        header: "Precio Sin IVA",
        size: 150,
        Cell: ({ cell }: { cell: MRT_Cell<List> }) => (
          <Box display={"flex"}>
            <Box sx={{ width: "20px" }}>$</Box>
            <Box sx={{ textAlign: "right", width: "80px" }}>
              {cell.getValue<number>()}
            </Box>
          </Box>
        ),
      },

      {
        accessorKey: "productMaster", //access nested data with dot notation
        header: "Master",
        size: 50,
      },
    ],
    []
  );

  return (
    <>
      <TableComponent columns={columns} data={props.data} rowsPerPage={25} />
    </>
  );
};

export default ImportStep2Table;
