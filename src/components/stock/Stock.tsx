import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TittleHeader } from "@common";

const ProductsComponent = () => {
  const navigate = useNavigate();

  const handlerEditProduct = (id: string) => {
    const currentUrl = window.location.pathname + window.location.search;
    localStorage.setItem("previousUrl", currentUrl);

    navigate("/stock/" + id);
  };

  //

  return (
    <Box>
      <TittleHeader title="Stock" onAdd={() => handlerEditProduct("new")} />
    </Box>
  );
};

export default ProductsComponent;
