import React, { useEffect, useState } from "react";
import { Alert, Box } from "@mui/material";
import Loading from "@common/Loading";
import { TittleHeader } from "@common";
import { List } from "@interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";

import { GetAllProducts } from "@actions/productsActions";
import { GetAllLists } from "@actions/listsActions";
import { GetAllAmounts } from "@actions/amountsActions";
import { GetAllBrands } from "@actions/brandsActions";

import { PRODUCT_GETALL_SUCCESS } from "@ProductActionTypes";

import { ButtonComponent } from "@common";
import ClearIcon from "@mui/icons-material/Clear";

//

import ImportStep1 from "./ImportStep1";
import ImportStep2 from "./ImportStep2";

import { orderColumn } from "./functions/orderProviders";

const ImportComponent: React.FunctionComponent = () => {
  let first = true;
  const dispatch = useDispatch<AppDispatch>();

  const [csvData, setCSVData] = useState<List[]>([]);
  const [productListExisting, setProductListExisting] = useState<List[]>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [showNoTable, setShowNoTable] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(false);

  const { products, statusProduct } = useSelector(
    (state: RootState) => state.products
  );

  const { lists } = useSelector((state: RootState) => state.lists);
  const { brands } = useSelector((state: RootState) => state.brands);
  const { amounts } = useSelector((state: RootState) => state.amounts);

  useEffect(() => {
    if (first) {
      if (products.length === 0) dispatch(GetAllProducts());
      if (lists.length === 0) dispatch(GetAllLists());

      if (amounts.length === 0) dispatch(GetAllAmounts());

      if (brands.length === 0) dispatch(GetAllBrands());

      first = false;
    }
  }, []);

  useEffect(() => {
    if (statusProduct === PRODUCT_GETALL_SUCCESS) {
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (csvData.length > 0) {
        setLoading(false);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [csvData.length]);

  //

  const handleUpload = async (proveedor: string, csvText: string[][]) => {
    // buscar lista de productos del proveedor
    const listProvider = await loadListProductsProvider(lists, proveedor);

    let data: List[] = [];
    data = orderColumn(brands, amounts, proveedor!, csvText, products);

    let productListNuevos: List[] = [];
    let productListExistentes: List[] = [];

    // cargar listas de productos nuevos (que no existen en la lista de productos)
    productListNuevos = loadNewProducts(data, listProvider!);

    // cargar lista de productos que no sean nuevos dado que existen en la listProvider
    if (data.length > 0 && listProvider && listProvider?.length > 0) {
      productListExistentes = listProvider.filter((item) =>
        data!.some(
          (provItem) =>
            provItem.articulo.toLowerCase() === item.articulo.toLowerCase() &&
            provItem.proveedor!.toLowerCase() ===
              item.proveedor!.toLowerCase() &&
            provItem.vigente === true &&
            provItem.precioSinIva !== item.precioSinIva
        )
      );
    } else {
      productListExistentes = [];
    }

    console.log(productListNuevos);
    console.log(productListExistentes);
    
    handleImportList(productListNuevos, productListExistentes);
  };

  const viewNoTable = (
    <Alert variant="filled" severity="warning">
      Sin articulos para actualizar de este proveedor
    </Alert>
  );

  const viewError = (
    <Box mt={2} pb={2}>
      <Alert variant="filled" severity="info">
        {errorMessage}
      </Alert>
    </Box>
  );

  const loadListProductsProvider = async (list: List[], proveedor: string) => {
    // Crear un conjunto de artículos de dataList
    let ListImport: List[] = [];

    if (!list || list.length === 0) {
      setShowNoTable(true);
      setShowTable(false);
      setShowError(false);
      setErrorMessage("No hay listas para este proveedor");
      return;
    }

    ListImport = list.filter(
      (item) => item.proveedor?.toLowerCase() === proveedor.toLowerCase()
    );

    setLoading(false);
    return ListImport;
  };

  const handlerClear = () => {
    setShowNoTable(false);
    setShowTable(false);
    setErrorMessage("");
    setShowError(false);
    setCSVData([]);
  };

  const handleImportList = (
    productListNuevos: List[],
    productListExistentes: List[]
  ) => {
    const counterTotalToCreate = productListNuevos.length;
    const counterExistingProducts = productListExistentes.length;

    if (counterTotalToCreate === 0 && counterExistingProducts === 0) {
      handleErrorImport(
        true,
        "No hay articulos nuevos/existentes para importar"
      );
      return;
    } else {
      setShowNoTable(false);
      setCSVData(productListNuevos);
      setProductListExisting(productListExistentes);

      setLoading(false);
      setShowTable(true);
      setShowNoTable(false);
      setShowError(false);
    }
  };

  const handleErrorImport = (error: boolean, message: string) => {
    setShowError(error);
    setErrorMessage(message);
    //
    setShowNoTable(false);
    setShowTable(false);
  };

  const loadNewProducts = (data: List[], dataListProvider: List[]) => {
    if (!data?.length) return [];
    if (!dataListProvider?.length || dataListProvider === undefined)
      return data;

    // Devuelve solo los productos de data que NO existan en dataListProvider
    const result: List[] = data.filter(
      (item) =>
        !dataListProvider.some(
          (provItem) =>
            provItem.articulo.toLowerCase() === item.articulo.toLowerCase() &&
            provItem.proveedor!.toLowerCase() === item.proveedor!.toLowerCase()
        )
    );

    return result;
  };

  const renderCSV = () => {
    return (
      <Box mt={2} sx={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        <ImportStep2
          productListNew={csvData}
          productListExisting={productListExisting}
          error={showError}
        />
      </Box>
    );
  };

  return (
    <>
      <TittleHeader title="Importar articulos">
        <ButtonComponent
          startIcon={<ClearIcon />}
          text="Limpiar"
          sx={{
            minWidth: "110px",
            backgroundColor: "#80e143",
            color: "#000",
            fontWeight: 600,
            borderRadius: "20px",
            padding: "5px 20px",
          }}
          //
          onClick={() => handlerClear()}
        />
      </TittleHeader>

      <Box paddingBottom={2}>
        {loading && <Loading />}

        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <ImportStep1 onUpload={handleUpload} />
        </Box>

        <Box>
          {!loading && showTable && !showNoTable && renderCSV()}
          {!loading && showNoTable && viewNoTable}
          {!loading && showError && viewError}
        </Box>
      </Box>
    </>
  );
};

export default ImportComponent;
