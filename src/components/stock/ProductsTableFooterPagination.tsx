import React from "react";
import { Box } from "@mui/material";
import { COLORS } from "@values/colors";

interface ListasTableFooterPaginationProps {
  pages: number;
  page: number;
  //
  onPageSelected: (page: number) => void;
}

const ProductsTableFooterPagination: React.FunctionComponent<
  ListasTableFooterPaginationProps
> = (props) => {
  const handleSelectPage = (value: number) => {
    props.onPageSelected(value);
  };

  const numberPagesView = () => {
    return Array.from({ length: Math.min(props.pages, 9) }, (_, index) => {
      const pageNumber = index + 1;
      return (
        <Box key={pageNumber}>
          <Box
            color="secondary"
            onClick={() => handleSelectPage(pageNumber)}
            sx={{
              backgroundColor:
                props.page === pageNumber ? COLORS.grey_light : "transparent",
              borderRadius: "5px",
              cursor: "pointer",
              padding: "5px 12px",
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
        onClick={() => handleSelectPage(props.page + 1)}
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
        onClick={() => handleSelectPage(props.page - 1)}
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
        {props.pages > 0 && props.page !== 1 && prevPageView()}
        {numberPagesView()}
        {props.pages > 0 && props.pages > props.page && nextPageView()}
      </Box>
    </Box>
  );
};

export default ProductsTableFooterPagination;
