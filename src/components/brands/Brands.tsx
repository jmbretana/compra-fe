import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import Loading from "@common/Loading";
import { TittleHeader } from "@common";
import { capitalizeFirstLetter } from "@utils/utils";

import BrandsTableComponent from "./BrandsTable";
import { BRAND_GETALL_SUCCESS } from "@BrandActionTypes";
import { GetAllBrands } from "@actions/brandsActions";
import { Brand } from "@interfaces";
import { FormGridRow } from "@common/Components";
import { InputComponent, TypographyCommon } from "@common";

const BrandsComponent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Brand[]>([]);
  const [dataFilter, setDataFilter] = useState<Brand[]>([]);
  const [descripcion, setDescripcion] = useState<string>("");
  const [loading, setLoading] = useState(true);

  let first = true;

  const dispatch = useDispatch<AppDispatch>();
  const { brands, statusBrand } = useSelector(
    (state: RootState) => state.brands
  );

  useEffect(() => {
    if (first) {
      if (brands.length > 0) loadBrands();
      else {
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
    if (statusBrand === BRAND_GETALL_SUCCESS) {
      loadBrands();
    }
  }, [brands]);

  const loadBrands = () => {
    const sortedData = Array.isArray(brands)
      ? brands.map((brand) => {
          return {
            _id: brand._id,
            nombre: capitalizeFirstLetter(brand.nombre),
            tags: brand.tags || [],
          };
        })
      : [];

    setData(sortedData);
    setDataFilter(sortedData);
    setLoading(false);
  };

  const handlerEditBrand = (id: string) => {
    navigate("/brands/" + id);
  };

  const handleChangeDescripcion = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescripcion(event.target.value);

    // order by descripcion
    const sortedData = [...data].sort((a, b) => {
      return a.nombre.localeCompare(b.nombre);
    });

    if (event.target.value.length >= 3) {
      const filteredData = sortedData.filter((item) => {
        const matchesDescripcion = item.nombre
          .toLowerCase()
          .includes(event.target.value.toLowerCase());

        return matchesDescripcion;
      });

      setDataFilter(filteredData);
    } else {
      setDataFilter(sortedData);
    }
  };

  return (
    <Box mb={5}>
      <TittleHeader title={"Marcas"} onAdd={() => handlerEditBrand("new")} />

      <Box display={"flex"} flexDirection={"row"} width={"1000px"} gap={2}>
        <FormGridRow size={{ xs: 2 }}>
          <TypographyCommon text="Marca" />
        </FormGridRow>
        <FormGridRow size={{ xs: 4 }}>
          <InputComponent
            id="descripcion"
            name="descripcion"
            required={true}
            value={descripcion}
            //
            onChange={handleChangeDescripcion}
          />
        </FormGridRow>
      </Box>

      {loading && <Loading />}
      {!loading && (
        <BrandsTableComponent
          data={dataFilter}
          onEdit={(id) => handlerEditBrand(id)}
        />
      )}
    </Box>
  );
};

export default BrandsComponent;
