import React, { useState, useEffect } from "react";
import { ProductStock, CategoriesStock } from "@interfaces";
import { Box } from "@mui/material";
import { InputComponent } from "@common";

interface TableProductsProps {
  categories: CategoriesStock[];
  //
  onEdit: (id: string) => void;
}

const StockFormTable: React.FunctionComponent<TableProductsProps> = (props) => {
  const [dataFilter, setDataFilter] = useState<CategoriesStock[]>([]);

  // Actualizar el estado local cuando cambien las categorías de entrada
  useEffect(() => {
    setDataFilter(JSON.parse(JSON.stringify(props.categories)));
  }, [props.categories]);

  const handleChangeCantidad = (
    event: React.ChangeEvent<HTMLInputElement>,
    productRef: ProductStock
  ) => {
    const newValue = event.target.value;

    const updatedCategories = dataFilter.map((category) => ({
      ...category,
      products: category.products.map((product) => {
        if (product.product_master_id === productRef.product_master_id) {
          return {
            ...product,
            cantidad: newValue,
          };
        }
        return { ...product };
      }),
    }));

    setDataFilter(updatedCategories);
  };

  return (
    <>
      {
        <Box>
          {dataFilter.map((categoria) => (
            <>
              <Box
                key={categoria.category}
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  marginTop: 2,
                  marginBottom: 1,
                }}
              >
                {categoria.category}
              </Box>

              <Box>
                {categoria.products.map((item: ProductStock) => {
                  return (
                    <Box
                      display={"flex"}
                      key={item.product_master_id}
                      flexDirection={"column"}
                      gap={1}
                      mb={1}
                    >
                      <Box
                        display={"flex"}
                        key={item.product_master_id}
                        gap={2}
                      >
                        <Box sx={{ minWidth: "300px" }}>{item.descripcion}</Box>
                        <Box sx={{ minWidth: "50px" }}>
                          <InputComponent
                            id={`cantidad-${item.product_master_id}`}
                            name={`cantidad-${item.product_master_id}`}
                            value={item.cantidad.toString()}
                            onChange={(e) => handleChangeCantidad(e, item)}
                          />
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </>
          ))}
        </Box>
      }
    </>
  );
};

export default StockFormTable;
