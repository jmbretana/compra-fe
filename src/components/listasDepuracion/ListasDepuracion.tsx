import React, { useEffect, useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import Loading from "@common/Loading";
import ListasTableComponent from "./ListasDepuracionTable";
import ListasResumeComponent from "./ListasDepuracionResume";
import {
  checkIfProductExists,
  checkIfBrandProductExists,
  checkAmount,
} from "@utils/utilsSearch";
import { useNavigate } from "react-router-dom";

import {
  GetAllListFiltered,
  updateProductList,
  UpdateManyProductList,
} from "@actions/listsActions";
import { GetAllProducts } from "@actions/productsActions";
import { GetAllBrands } from "@actions/brandsActions";
import { GetAllAmounts } from "@actions/amountsActions";

import { Brand, Product, SearchListItems, List, Amount } from "@interfaces";

import {
  LIST_GETALL_SUCCESS,
  LIST_FILTER_SUCCESS,
  LIST_UPDATE_SUCCESS,
} from "@ListActionTypes";
import { PRODUCT_GETALL_SUCCESS } from "@ProductActionTypes";
import { BRAND_GETALL_SUCCESS } from "@BrandActionTypes";

import ListasHeaderComponent from "./ListasDepuracionHeader";
import ListasHeaderSearch from "./ListasDepuracionHeaderSearch";
import ListasDepuracionLetter from "./ListasDepuracionLetter";

const ListasDepuracion = () => {
  let first = true;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [data, setData] = useState<List[]>([]);
  const [dataBrands, setDataBrands] = useState<Brand[]>([]);
  const [dataProductsMaster, setDataProductsMaster] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [showSnack, setShowSnack] = useState(false);
  const [search, setSearch] = useState<SearchListItems>();

  const { lists, statusLista } = useSelector((state: RootState) => state.lists);
  const { products, statusProduct } = useSelector(
    (state: RootState) => state.products
  );
  const { brands, statusBrand } = useSelector(
    (state: RootState) => state.brands
  );
  const { amounts } = useSelector((state: RootState) => state.amounts);

  useEffect(() => {
    if (first) {
      const initialSearch: SearchListItems = {
        //productMaster: "",
        //marca: "",
      };

      setSearch(initialSearch);
      loadListas(initialSearch);

      loadProducts();
      loadBrands();
      loadAmounts();
      first = false;
    }
  }, []);

  useEffect(() => {
    if (statusLista === LIST_GETALL_SUCCESS) {
      const orderList = orderDataLists(lists);
      setData(orderList);
      setLoading(false);
    }

    if (statusLista === LIST_FILTER_SUCCESS) {
      const orderList = orderDataLists(lists);
      setData(orderList);
      setLoading(false);
    }

    if (statusLista === LIST_UPDATE_SUCCESS) {
      setLoading(false);
    }
  }, [lists, statusLista]);

  useEffect(() => {
    if (statusProduct === PRODUCT_GETALL_SUCCESS) {
      loadDataProductMaster();
    }
  }, [products]);

  useEffect(() => {
    if (statusBrand === BRAND_GETALL_SUCCESS) {
      loadDataBrands();
    }
  }, [brands]);

  const loadListas = (params: SearchListItems) => {
    try {
      if (lists.length === 0) {
        setLoading(true);
        dispatch(GetAllListFiltered(params));
      } else {
        const orderList = orderDataLists(lists);
        setData(orderList);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al cargar las listas", error);
    }
  };

  const loadProducts = () => {
    try {
      if (lists.length > 0) loadDataProductMaster();
      else dispatch(GetAllProducts());
    } catch (error) {
      console.error("Error al cargar las articulos", error);
    }
  };

  const loadBrands = () => {
    try {
      if (lists.length > 0) loadDataBrands();
      else dispatch(GetAllBrands());
    } catch (error) {
      console.error("Error al cargar las marcas", error);
    }
  };

  const loadAmounts = () => {
    try {
      if (amounts.length === 0) dispatch(GetAllAmounts());
    } catch (error) {
      console.error("Error al cargar las cantidades", error);
      dispatch(GetAllAmounts());
    }
  };

  const orderDataLists = (searchList: List[]) => {
    const lista = Array.isArray(searchList) ? searchList : [];
    // Crear copia del array para no mutar el estado original
    let dataOrdered = [...lista].sort((a, b) => {
      if (a.articulo.trim() < b.articulo.trim()) {
        return -1;
      }
      if (a.articulo.trim() > b.articulo.trim()) {
        return 1;
      }

      return 0;
    });

    dataOrdered = dataOrdered.map((item) => ({
      ...item,
      articulo: item.articulo.trim().toLocaleLowerCase(),
    }));

    return dataOrdered;
  };

  const loadDataProductMaster = () => {
    setDataProductsMaster(Array.isArray(products) ? products : []);
  };

  const loadDataBrands = () => {
    const brand = Array.isArray(brands) ? brands : [];
    setDataBrands(brand);
    setLoadingBrands(false);
  };

  //

  const handlerRefreshList = () => {
    setLoading(true);
    loadListas(search || {});
    // || { productMaster: "", marca: "" });
  };

  const handlerRefreshNewProduct = () => {
    let check = true;

    lists.map((item) => {
      if (item.productMaster === "") {
        const masterProduct = checkIfProductExists(
          item.articulo,
          dataProductsMaster
        );

        if (masterProduct !== "") {
          const productList = {
            ...item,
            productMaster: masterProduct,
          };

          try {
            check = false;
            setLoading(true);
            dispatch(updateProductList(productList));
          } catch (error) {
            console.error("Error al cargar las listas", error);
            setLoading(true);
            dispatch(updateProductList(productList));
          }
        }
      }
    });

    if (check) {
      setLoading(false);
      setShowSnack(true);
    }
  };

  const handlerRefreshAmount = () => {
    let check = true;

    lists.map((item) => {
      if (item.unidad === "") {
        //ordenar amounts por cantidad desc y unidad asc - crear copia para no mutar el estado
        const amountsOrdered = [...amounts].sort((a, b) => {
          if (a.cantidad < b.cantidad) return 1;
          if (a.cantidad > b.cantidad) return -1;
          if (a.unidad < b.unidad) return -1;
          if (a.unidad > b.unidad) return 1;
          return 0;
        });

        const amount = checkAmount(item.articulo, amountsOrdered) as Amount;

        if (amount.cantidad !== "") {
          const productList = {
            ...item,
            unidad: amount.unidad || "",
            cantidad: amount.cantidad || "",
            tipo: amount.tipo || "",
            medida: amount.medida || "",
          };

          try {
            check = false;
            dispatch(updateProductList(productList));
          } catch (error) {
            console.error("Error al cargar las listas", error);
            dispatch(updateProductList(productList));
          } finally {
            setLoading(false);
          }
        }
      }
    });

    if (check) {
      setLoading(false);
      setShowSnack(true);
    }
  };

  const handlerRefreshBrandProduct = async () => {
    let check = true;

    const listFiltered = data.filter((item) => item.marca === undefined);
    const listWithoutBrand: List[] = [];

    listFiltered.map((item) => {
      const result = checkIfBrandProductExists(item.articulo, dataBrands);

      if (result !== null) {
        listWithoutBrand.push({
          ...item,
          marca: result,
        });
      }
    });

    // enviar los items sin marca a actualizar todos juntos
    if (listWithoutBrand.length === 0) {
      setLoading(false);
      setShowSnack(true);
      return;
    }

    const updateItems = async () => {
      // enviar a UpdateManyProductList la lista de items sin marca
      try {
        check = false;

        // enviar de a lotes de 50 items
        const chunkSize = 50;
        for (let i = 0; i < listWithoutBrand.length; i += chunkSize) {
          const chunk = listWithoutBrand.slice(i, i + chunkSize);
          await dispatch(UpdateManyProductList(chunk));
        }
      } catch (error) {
        console.error("Error al cargar las listas", error);
      }

      setLoading(false);
    };

    if (check) {
      setLoading(false);
      setShowSnack(true);
    }

    updateItems();
  };

  const handlerSearch = (searchList: SearchListItems) => {
    let filterData = lists;

    // filter by articulo
    filterData = filterData.filter((item) => {
      if (
        searchList.articulo === "" ||
        searchList.articulo === null ||
        searchList.articulo === undefined
      ) {
        return true; // si no hay filtro, mostrar todos
      } else {
        return item.articulo
          .toLowerCase()
          .includes(searchList.articulo.toLowerCase());
      }
    });

    // filter by brand
    filterData = filterData.filter((item) => {
      if (searchList.withoutBrand) {
        return item.marca === undefined || item.marca === "";
      } else {
        return true;
      }
    });

    // filter by amount
    filterData = filterData.filter((item) => {
      if (searchList.withoutAmount) {
        return item.unidad === "";
      } else {
        return true;
      }
    });
    const orderList = orderDataLists(filterData);
    setData(orderList);
  };

  const handlerClean = () => {
    const orderList = orderDataLists(lists);
    setData(orderList);
  };

  const handlerLetter = (letter: string) => {
    const filteredData = data.filter((item) =>
      item.articulo.toLowerCase().startsWith(letter.toLowerCase())
    );

    setData(filteredData);
  };

  const handleCloseSnack = () => {
    setShowSnack(false);
  };
  //

  const handlerEditProduct = (product: List) => {
    navigate(`/clean/${product._id}`);
  };

  return (
    <Box mb={5}>
      <ListasHeaderComponent
        loadingBrands={loadingBrands}
        //
        onRefreshList={handlerRefreshList}
        onRefreshBrandProduct={handlerRefreshBrandProduct}
        onRefreshNewProduct={handlerRefreshNewProduct}
        onRefreshAmountProduct={handlerRefreshAmount}
      />

      <ListasHeaderSearch onSearch={handlerSearch} onClean={handlerClean} />

      <ListasDepuracionLetter data={data} onLetterClick={handlerLetter} />

      {loading && <Loading />}
      {!loading && (
        <ListasTableComponent
          data={data}
          masterProduct={products}
          onEditProduct={handlerEditProduct}
        />
      )}
      {!loading && data.length > 0 && <ListasResumeComponent data={data} />}

      <Snackbar
        open={showSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          No se encontraron articulos para actualizar
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ListasDepuracion;
