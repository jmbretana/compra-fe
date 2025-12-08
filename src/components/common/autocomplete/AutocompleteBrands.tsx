import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "../theme/getSignUpTheme";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
//
import { GetAllBrands } from "@actions/brandsActions";
import { Brand, List } from "@interfaces";
import { BRAND_GETALL_SUCCESS } from "src/middleware/types/BrandActionTypes";
import { capitalizeFirstLetter } from "@utils/utils";

interface AutocompleteBrandsProps {
  value?: string;
  list?: List[];

  //
  onSelect: (value: string) => void;
}

const AutocompleteBrands: React.FunctionComponent<AutocompleteBrandsProps> = (
  props
) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const dispatch = useDispatch<AppDispatch>();
  const { brands, statusBrand } = useSelector(
    (state: RootState) => state.brands
  );
  const [data, setData] = useState<Brand[]>([]);
  const [brandSelected, setBrandSelected] = useState<Brand>();

  let first = true;

  useEffect(() => {
    if (first) {
      if (props.list && props.list.length > 0) {
        // generar listado de marcas a partir de la lista
        loadBrands(props.list);
        setData(loadBrands(props.list!));
      } else {
        try {
          dispatch(GetAllBrands());
        } catch (error) {
          console.error("Error al cargar las marcas", error);
          dispatch(GetAllBrands());
        }
      }
      first = false;
    }
  }, []);

  useEffect(() => {
    if (props.list && props.list.length > 0) {
      // generar listado de marcas a partir de la lista
      loadBrands(props.list);
      setData(loadBrands(props.list!));
    }
  }, [props.list]);

  useEffect(() => {
    // buscar props.value en la lista y asignarlo al brandSelected
    const foundBrand = brands.find(
      (item) => item.nombre.toLowerCase() === props.value?.toLowerCase()
    );
    if (foundBrand) {
      setBrandSelected(foundBrand);
    }
  }, [props.value]);

  const loadBrands = (list: List[]) => {
    const arrayBrand = list
      .map((item: List) => {
        return {
          _id: item.marca!,
          nombre: capitalizeFirstLetter(item.marca!),
        };
      })
      .filter((item, index, self) => {
        return (
          item.nombre !== "" &&
          item.nombre !== undefined &&
          index === self.findIndex((t) => t.nombre === item.nombre)
        );
      })
      .sort((a, b) => (a.nombre ?? "").localeCompare(b.nombre ?? ""));

    return arrayBrand;
  };

  const loadData = () => {
    if (brands.length === 0) return;

    const arrayBrand = brands
      .map((brand: Brand) => {
        return {
          _id: brand._id,
          nombre: capitalizeFirstLetter(brand.nombre),
          tags: brand.tags || [],
        };
      })
      .sort((a, b) => a.nombre.localeCompare(b.nombre));

    setData(arrayBrand);
  };

  useEffect(() => {
    if (statusBrand === BRAND_GETALL_SUCCESS) {
      loadData();
    }
  }, [brands]);

  const handleSelect = (value: Brand) => {
    setBrandSelected(value);
    if (value) props.onSelect(value.nombre);
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Autocomplete
        fullWidth
        disablePortal
        options={Array.isArray(data) ? data : []}
        getOptionLabel={(option: Brand) => option.nombre || ""}
        renderInput={(params) => <TextField {...params} />}
        size="small"
        value={brandSelected ? brandSelected : null}
        sx={{ width: "100%" }}
        //
        onChange={(event, value) => handleSelect(value!)}
      />
    </ThemeProvider>
  );
};

export default AutocompleteBrands;
