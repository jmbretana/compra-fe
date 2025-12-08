import React, { useEffect, useState, useCallback, useRef } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import Loading from "@common/Loading";
import { InputComponent, TittleHeader, TypographyCommon } from "@common";
import { GetAllProducts } from "@actions/productsActions";
import { Product } from "@interfaces";
import ProductsTableComponent from "./ProductsTableComponent";
import { PRODUCT_GETALL_SUCCESS } from "src/middleware/types/ProductActionTypes";
import { capitalizeFirstLetter } from "@utils/utils";
import ProductsTableFooterPagination from "./ProductsTableFooterPagination";
import { FormGridRow } from "@common/Components";
import { AutocompleteCategorias } from "@common/autocomplete";

const ProductsComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState<Product[]>([]);
  const [dataFilter, setDataFilter] = useState<Product[]>([]);
  const [descripcion, setDescripcion] = useState<string>("");
  const [categoria, setCategoria] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<string>("1");
  const hasInitialized = useRef(false);

  const { products, statusProduct } = useSelector(
    (state: RootState) => state.products
  );

  const calculatePages = () => {
    const totalPages = Math.ceil(data.length / pageSize);
    return totalPages;
  };

  const pageSize = 30;
  const pages = calculatePages();

  // Memoizar la función loadData para evitar recreaciones innecesarias
  const loadData = useCallback(() => {
    const info = Array.isArray(products)
      ? products.map((product) => {
          return {
            product_master_id: product.product_master_id,
            descripcion: capitalizeFirstLetter(product.descripcion),
            categoria: capitalizeFirstLetter(product.categoria),
            subcategoria: capitalizeFirstLetter(product.subcategoria),
            tags: product.tags ? product.tags : undefined,
            bookmark: product.bookmark,
          };
        })
      : [];

    const sortedData = [...info].sort((a, b) => {
      return a.descripcion.localeCompare(b.descripcion);
    });
    setData(sortedData);
    setDataFilter(sortedData);
    setLoading(false);
  }, [products]);

  // Memoizar handlerRefreshList
  const handlerRefreshList = useCallback(() => {
    setLoading(true);
    dispatch(GetAllProducts());
  }, [dispatch]);

  useEffect(() => {
    // Solo ejecutar una vez al montar el componente
    if (!hasInitialized.current) {
      hasInitialized.current = true;

      if (products.length > 0) {
        // Si ya hay productos, cargarlos directamente
        loadData();
      } else {
        // Si no hay productos, hacer fetch
        handlerRefreshList();
      }
    }
  }, [products.length, loadData, handlerRefreshList]);

  useEffect(() => {
    // Solo procesar cuando el status cambie a SUCCESS y ya se haya inicializado
    if (statusProduct === PRODUCT_GETALL_SUCCESS && hasInitialized.current) {
      loadData();
    }
  }, [statusProduct, loadData]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page_navigation");
    if (page !== null) {
      setPage(page);
    } else {
      setPage("1");
    }
  }, [location]);

  const handlerDeleteProduct = (id: string) => {
    console.info("Delete product with id:", id);
  };

  const handlerEditProduct = (id: string) => {
    const currentUrl = window.location.pathname + window.location.search;
    localStorage.setItem("previousUrl", currentUrl);

    navigate("/producto/" + id);
  };

  const handlePageSelection = (page: number) => {
    setPage(page.toString());

    let params = "";
    params += `?page_navigation=${page}`;
    navigate(`/products${params}`);
  };

  const handleChangeDescripcion = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescripcion(event.target.value);

    // order by descripcion
    const sortedData = [...data].sort((a, b) => {
      return a.descripcion.localeCompare(b.descripcion);
    });

    if (event.target.value.length >= 3) {
      const filteredData = sortedData.filter((item) => {
        const matchesDescripcion = item.descripcion
          .toLowerCase()
          .includes(event.target.value.toLowerCase());

        return matchesDescripcion;
      });

      setDataFilter(filteredData);
    } else {
      setDataFilter(sortedData);
    }
  };

  const handleChangeCategoria = (value: string | null) => {
    setCategoria(value || undefined);
    if (value) {
      const filteredData = data.filter(
        (item) => item.categoria!.toLowerCase() === value.toLowerCase()
      );
      setDataFilter(filteredData);
    } else {
      setDataFilter(data);
    }
  };

  return (
    <Box mb={5}>
      <TittleHeader
        title="Articulos"
        onAdd={() => handlerEditProduct("new")}
        onRefresh={handlerRefreshList}
      />

      <Box
        display={"flex"}
        flexDirection={"row"}
        mb={5}
        width={"1000px"}
        gap={4}
      >
        <Box display={"flex"} flexDirection={"row"} gap={1}>
          <FormGridRow size={{ xs: 2 }}>
            <TypographyCommon text="Articulo" />
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
        <Box display={"flex"} flexDirection={"row"} gap={1}>
          <FormGridRow size={{ xs: 2 }}>
            <TypographyCommon text="Categoría" />
          </FormGridRow>
          <FormGridRow size={{ xs: 10 }}>
            <AutocompleteCategorias
              value={categoria}
              onSelect={handleChangeCategoria}
            />
          </FormGridRow>
        </Box>
      </Box>

      {loading && <Loading />}

      {!loading && (
        <>
          {dataFilter.length > 0 && (
            <ProductsTableFooterPagination
              pages={pages}
              page={parseInt(page)}
              //
              onPageSelected={handlePageSelection}
            />
          )}
          <ProductsTableComponent
            data={dataFilter}
            pageSelected={page}
            pageSize={pageSize}
            //
            onDelete={(id) => handlerDeleteProduct(id)}
            onEdit={(id) => handlerEditProduct(id)}
          />

          {dataFilter.length > 0 && (
            <ProductsTableFooterPagination
              pages={pages}
              page={parseInt(page)}
              //
              onPageSelected={handlePageSelection}
            />
          )}
        </>
      )}

      {!loading && dataFilter.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={5}
          mb={5}
        >
          <Box mt={2}>
            <TypographyCommon text="No se encontraron articulos." />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductsComponent;
