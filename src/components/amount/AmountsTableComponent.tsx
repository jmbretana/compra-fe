import React from "react";

import { Amount } from "@interfaces";
import { useMemo } from "react";
import { type MRT_ColumnDef, type MRT_Cell } from "material-react-table";
import { BoxCardWhite, TableComponent, TypographyCommon } from "@common";
import { Box, Chip, IconButton } from "@mui/material";
//
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";

interface TableProductsProps {
  data: Amount[];
  //
  onEdit: (id: string) => void;
  onRefresh: (amount: Amount) => void;
}

const BrandsTableComponent: React.FunctionComponent<TableProductsProps> = (
  props
) => {
  const editHandler = (id: string) => {
    props.onEdit(id);
  };

  const refreshHandler = (amount: Amount) => {
    props.onRefresh(amount);
  };

  const columns = useMemo<MRT_ColumnDef<Amount>[]>(
    () => [
      {
        accessorKey: "medida", //access nested data with dot notation
        header: "Medida",
      },
      {
        accessorKey: "unidad", //access nested data with dot notation
        header: "Unidad",
      },

      {
        accessorKey: "tipo", //access nested data with dot notation
        header: "Tipo",
      },

      {
        accessorKey: "cantidad", //access nested data with dot notation
        header: "Cantidad",
      },

      {
        accessorKey: "tags", //access nested data with dot notation
        header: "Tags",
        Cell: ({ cell }: { cell: MRT_Cell<Amount> }) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {cell.getValue<string[]>().map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        ),
      },

      {
        accessorKey: "_id",
        header: "Action",
        enableSorting: false,
        size: 30,
        Cell: ({ cell }: { cell: MRT_Cell<Amount> }) => (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <IconButton
              color="secondary"
              aria-label="editar marca"
              onClick={() => refreshHandler(cell.row.original)}
            >
              <RefreshIcon />
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
      {props.data.length === 0 ? (
        <BoxCardWhite sx={{ display: "flex", justifyContent: "center" }}>
          <TypographyCommon text="No hay datos" variant="subtitle2" />
        </BoxCardWhite>
      ) : (
        <TableComponent columns={columns} data={props.data} rowsPerPage={50} />
      )}
    </>
  );
};

export default BrandsTableComponent;
