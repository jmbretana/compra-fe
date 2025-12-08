import React from "react";

import { Brand } from "@interfaces";
import { useMemo } from "react";
import { type MRT_ColumnDef, type MRT_Cell } from "material-react-table";
import { TableComponent } from "@common";
import { Box, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { capitalizeFirstLetter } from "@utils/utils";

interface TableProductsProps {
  data: Brand[];
  //
  onEdit: (id: string) => void;
}

const BrandsTableComponent: React.FunctionComponent<TableProductsProps> = (
  props
) => {
  const editHandler = (id: string) => {
    props.onEdit(id);
  };

  const columns = useMemo<MRT_ColumnDef<Brand>[]>(
    () => [
      {
        accessorKey: "nombre", //access nested data with dot notation
        header: "Nombre",
        Cell: ({ cell }: { cell: MRT_Cell<Brand> }) => (
          <Box>{capitalizeFirstLetter(cell.getValue<string>())}</Box>
        ),
      },
      {
        accessorKey: "tags", //access nested data with dot notation
        header: "Tags",
        Cell: ({ cell }: { cell: MRT_Cell<Brand> }) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {cell.getValue<string[]>()?.length ? (
              cell
                .getValue<string[]>()
                .map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    color="primary"
                    variant="outlined"
                  />
                ))
            ) : (
              <Box sx={{ color: "text.secondary", fontStyle: "italic" }}>
                Sin tags
              </Box>
            )}
          </Box>
        ),
      },
      {
        accessorKey: "_id",
        header: "Action",
        enableSorting: false,
        size: 30,
        Cell: ({ cell }: { cell: MRT_Cell<Brand> }) => (
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
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

export default BrandsTableComponent;
