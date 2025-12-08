import React from "react";

import { Product } from "@interfaces";

import { Box, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { COLORS } from "@values/colors";
import { ButtonIconBookmark } from "@common";

interface TableProductsProps {
  data: Product[];
  pageSize: number;
  pageSelected: string;
  //
  onEdit: (id: string) => void;
}

const ProductsTableComponent: React.FunctionComponent<TableProductsProps> = (
  props
) => {
  const page = parseInt(props.pageSelected);

  const editHandler = (id: string) => {
    props.onEdit(id);
  };

  const handleUpdateBookmark = (product: Product) => {
    props.data.map((item) => {
      if (item.product_master_id === product.product_master_id) {
        item.bookmark = !item.bookmark;
      }
      return item;
    });
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"column"}
      >
        {props.data
          .slice((page - 1) * props.pageSize, page * props.pageSize)
          .map((item, index) => {
            return (
              <Box
                key={item.descripcion}
                sx={{
                  border: "1px solid " + COLORS.grey_300,
                  padding: "15px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontFamily: "Lexend",
                  backgroundColor: COLORS.white,
                }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  key={item.product_master_id}
                >
                  <Box
                    sx={{
                      width: "200px",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.descripcion}
                  </Box>
                  <Box
                    sx={{
                      width: "50px",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <Box display={"flex"} justifyContent={"center"}>
                      <ButtonIconBookmark
                        product={item}
                        onUpdate={handleUpdateBookmark}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "100px",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.categoria}
                  </Box>
                  <Box
                    sx={{
                      width: "100px",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.subcategoria}
                  </Box>
                  <Box sx={{ width: "200px" }}>
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                    >
                      {item.tags?.map((tag) => (
                        <Chip
                          key={index + tag}
                          label={tag.toString()}
                          color="primary"
                          variant="outlined"
                          sx={{
                            fontSize: "0.7rem",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ alignContent: "center", alignItems: "center" }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <IconButton
                        color="secondary"
                        aria-label="editar articulo"
                        onClick={() => editHandler(item.product_master_id!)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
      </Box>
    </>
  );
};

export default ProductsTableComponent;
