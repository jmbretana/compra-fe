import React from "react";
import { Box } from "@mui/material";
import { COLORS } from "@values/colors";
import { Pagination } from "@interfaces";

interface ListasTableFooterPaginationProps {
  pagination: Pagination;
  //
  onPageSelected: (page: number) => void;
}

const ListasTablePagination: React.FunctionComponent<
  ListasTableFooterPaginationProps
> = (props) => {
  const handleSelectPage = (value: number) => {
    props.onPageSelected(value);
  };

  const numberPagesView = () => {
    const totalPages = props.pagination.total_pages;
    const currentPage = props.pagination.current_page;

    // Calcular el rango de páginas a mostrar (máximo 9)
    let startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(totalPages, startPage + 8);

    // Ajustar si estamos cerca del final
    if (endPage - startPage < 8) {
      startPage = Math.max(1, endPage - 8);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNumber) => {
      return (
        <Box key={pageNumber}>
          <Box
            color="secondary"
            onClick={() => handleSelectPage(pageNumber)}
            sx={{
              backgroundColor:
                currentPage === pageNumber ? COLORS.grey_400 : "transparent",
              borderRadius: "5px",
              cursor: "pointer",
              padding: "5px 12px",
              fontWeight: currentPage === pageNumber ? "bold" : "normal",
              ":hover": {
                backgroundColor: COLORS.grey_100,
              },
            }}
          >
            {pageNumber}
          </Box>
        </Box>
      );
    });
  };

  const nextPageView = () => {
    return (
      <Box
        color="secondary"
        onClick={() => handleSelectPage(props.pagination.current_page + 1)}
        sx={{
          backgroundColor: COLORS.grey_light,
          borderRadius: "5px",
          cursor: "pointer",
          padding: "5px 12px",
          ":hover": {
            backgroundColor: COLORS.grey_100,
          },
        }}
      >
        {" >"}
      </Box>
    );
  };

  const prevPageView = () => {
    return (
      <Box
        color="secondary"
        onClick={() => handleSelectPage(props.pagination.current_page - 1)}
        sx={{
          backgroundColor: COLORS.grey_light,
          borderRadius: "5px",
          cursor: "pointer",
          padding: "5px 12px",
          ":hover": {
            backgroundColor: COLORS.grey_100,
          },
        }}
      >
        {" <"}
      </Box>
    );
  };

  return (
    <Box display={"flex"} justifyContent={"space-around"}>
      <Box display={"flex"} flexDirection={"row"} gap={1}>
        {props.pagination.has_prev_page && prevPageView()}
        {props.pagination.total_pages > 1 && numberPagesView()}
        {props.pagination.has_next_page && nextPageView()}
      </Box>
    </Box>
  );
};

export default ListasTablePagination;
