import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "../theme/getSignUpTheme";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { GetAllProducts } from "@actions/productsActions";
import { Product } from "@interfaces";
import { PRODUCT_GETALL_SUCCESS } from "src/middleware/types/ProductActionTypes";
import { capitalizeFirstLetter } from "@utils/utils";

interface AutocompleteProductMasterProps {
  value?: Product;
  valueString?: string;
  clear?: boolean;
  //
  onSelect: (value?: Product) => void;
}

const AutocompleteProductMaster: React.FunctionComponent<
  AutocompleteProductMasterProps
> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const dispatch = useDispatch<AppDispatch>();
  const { products, statusProduct } = useSelector(
    (state: RootState) => state.products
  );
  const [data, setData] = useState<Product[]>([]);
  const [productMasterSelected, setProductMasterSelected] = useState<
    Product | undefined
  >(props.value);

  useEffect(() => {
    if (props.value) {
      setProductMasterSelected(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    try {
      dispatch(GetAllProducts());
    } catch (error) {
      console.error("Error al cargar los articulos", error);
    }
  }, []);

  useEffect(() => {
    if (statusProduct === PRODUCT_GETALL_SUCCESS) {
      loadData();
    }
  }, [products]);

  const loadData = () => {
    const arrayProd = Array.isArray(products)
      ? products.map((products) => {
          return {
            product_master_id: products.product_master_id,
            descripcion: capitalizeFirstLetter(products.descripcion),
            categoria: capitalizeFirstLetter(products.categoria),
            subcategoria: capitalizeFirstLetter(products.subcategoria),
            tags: products.tags ? products.tags : undefined,
          };
        })
      : [];

    if (props.valueString) {
      const selected = arrayProd.find(
        (item) =>
          item.descripcion.toLowerCase() === props.valueString!.toLowerCase()
      );
      setProductMasterSelected(selected);
    }

    setData(arrayProd);
  };

  useEffect(() => {
    if (props.clear) {
      setProductMasterSelected(undefined);
    }
  }, [props.clear]);

  const handleSelect = (value: Product) => {
    setProductMasterSelected(value);
    if (value) props.onSelect(value);
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Autocomplete
        fullWidth
        disablePortal
        options={Array.isArray(data) ? data : []}
        getOptionLabel={(option: Product) => option.descripcion || ""}
        renderInput={(params) => <TextField {...params} />}
        size="small"
        value={productMasterSelected ? productMasterSelected : null}
        sx={{ width: "100%" }}
        //
        onChange={(event, value) => handleSelect(value!)}
      />
    </ThemeProvider>
  );
};

export default AutocompleteProductMaster;
