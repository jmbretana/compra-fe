import React from "react";
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { COLORS } from "@values/colors";
import { useTheme } from "@mui/material";

interface TableComponentProps {
  columns: MRT_ColumnDef<any, any>[];
  data: MRT_TableOptions<any>["data"];
  hiddenSearch?: boolean;
  backgroundColor?: string;
  enableColumnFilters?: boolean;
  rowsPerPage?: number;
  pageSelected?: number;
  //
  headerColor?: string;
  onPageNavigation?: (page: number) => void;
}

const TableComponent: React.FunctionComponent<TableComponentProps> = (
  props
) => {
  const theme = useTheme();

  const table = useMaterialReactTable({
    columns: props.columns,
    data: props.data,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableGlobalFilter: props.hiddenSearch ? true : false,
    enableColumnFilters: props.enableColumnFilters ? true : false,

    initialState: {
      density: "compact",
      pagination: {
        pageIndex: props.pageSelected ?? 0, // Asignar la página inicial desde las props o usar 0 por defecto
        pageSize: props.rowsPerPage ? props.rowsPerPage : 10, // Define la cantidad de registros por página
      },
    },
    positionPagination: "both", // Mostrar paginación en la parte superior e inferior

    muiTableContainerProps: {
      sx: {
        backgroundColor:
          theme.palette.mode === "dark"
            ? COLORS.black
            : props.backgroundColor
            ? props.backgroundColor
            : COLORS.grey_light,
      },
    },
    muiTableProps: {
      sx: {
        overflow: "hidden",
        backgroundColor:
          theme.palette.mode === "dark" ? COLORS.grey_dark : COLORS.white,

        padding: "10px 0",
        borderRadius: "20px",
        boxShadow: "none", // Quitar sombra
      },
    },

    muiTableHeadRowProps: {
      sx: {
        boxShadow: "none", // Quitar sombra
      },
    },
    muiTableHeadCellProps: {
      sx: {
        color: COLORS.grey,
        fontSize: "12px",
        padding: "16px",
        fontWeight: "normal",
        fontFamily: "Lexend",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        paddingTop: "3px",
        paddingBottom: "3px",
        fontSize: 13,
        backgroundColor: COLORS.white,
        border: "none",
        borderBottom: "1px solid #f0f0f0",
        color: COLORS.black,
        fontFamily: "Lexend",
      },
    },

    muiTopToolbarProps: {
      sx: {
        backgroundColor:
          theme.palette.mode === "dark"
            ? COLORS.black
            : props.headerColor
            ? props.headerColor
            : COLORS.grey_300,
      },
    },
    muiBottomToolbarProps: {
      sx: {
        border: "none",
        backgroundColor:
          theme.palette.mode === "dark"
            ? COLORS.black
            : props.headerColor
            ? props.headerColor
            : COLORS.grey_300,
        boxShadow: "none", // Quitar sombra
        paddingTop: "10px",
      },
    },
    muiTablePaperProps: {
      sx: {
        boxShadow: "none", // Quitar sombra
      },
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default TableComponent;
