import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import { BRAND_GETALL_SUCCESS } from "src/middleware/types/BrandActionTypes";
import { GetAllBrands } from "@actions/brandsActions";

const CardBudgetCount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { brands, statusBrand } = useSelector(
    (state: RootState) => state.brands
  );

  const [countBrands, setCountBrands] = useState(0);
  let first = true;

  useEffect(() => {
    if (first) {
      try {
        // Check if the brands are already loaded
        if (brands.length === 0) {
          dispatch(GetAllBrands());
        } else {
          setCountBrands(Number(brands.length));
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }

      first = false;
    }
  }, []);

  useEffect(() => {
    if (statusBrand === BRAND_GETALL_SUCCESS) {
      setCountBrands(Number(brands.length));
    }
  }, [statusBrand]);

  //

  const handleClick = () => {
    navigate("/brands");
  };

  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", width: "100%", borderRadius: "20px" }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total de marcas
        </Typography>

        <Typography component="h1" variant="h1" gutterBottom>
          {countBrands}
        </Typography>

        <Box display={"flex"} justifyContent={"flex-end"}>
          <Chip
            label="Ver detalle"
            variant="outlined"
            onClick={handleClick}
            color="success"
            icon={<SearchIcon />}
            size={"small"}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardBudgetCount;
