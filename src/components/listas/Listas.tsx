import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import Loading from "@common/Loading";
import { GetPaginatedProducts } from "@actions/listsActions";
import { List, Navigation, Pagination } from "@interfaces";
import { LIST_PAGINATED_SUCCESS } from "@ListActionTypes";

import ListasHeaderComponent from "./ListasHeaderComponent";
import ListasLeftContent from "./left/ListasLeft";
import ListasCenterContent from "./center/ListasCenterContent";

import { useNavigate } from "react-router-dom";
import {
  buildURLParams,
  getPageNavigationParams,
  searchParams,
} from "./navigation/navigationFunctions";

const ListasComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const [cleanTimestamp, setCleanTimestamp] = useState<number>(0);
  const [data, setData] = useState<List[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    total_pages: 1,
    items_per_page: 50,
    total_items: 0,
    has_next_page: false,
    has_prev_page: false,
  });
  const [loading, setLoading] = useState(true);
  const [navigationCache, setNavigationCache] = useState<Navigation | null>(
    null
  );

  const { paginatedData, lists, statusLista } = useSelector(
    (state: RootState) => state.lists
  );

  const initialFetchRef = React.useRef(false);

  useEffect(() => {
    if (!initialFetchRef.current && (!lists || lists.length === 0)) {
      initialFetchRef.current = true;
      loadListas();
    } else {
      getPageNavigation(lists);
    }
  }, [loading, lists]);

  useEffect(() => {
    loadListas();
  }, [location]);

  useEffect(() => {
    if (paginatedData?.data && statusLista === LIST_PAGINATED_SUCCESS) {
      setData(paginatedData?.data);
      setPagination(paginatedData.pagination);
      setLoading(false);
    }
  }, [paginatedData]);

  const getPageNavigation = (lists: List[]) => {
    const urlParams = new URLSearchParams(window.location.search);
    const navigation = getPageNavigationParams(urlParams);
    setNavigationCache(navigation);

    const dataFilter = searchParams(lists, navigation);
    return dataFilter;
  };

  const loadListas = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const navigation = getPageNavigationParams(urlParams);
    let page = urlParams.get("page_navigation");

    if (page === null || page === undefined) {
      page = "1";
    }

    const initialSearch = {
      page: page,
      vigente: true,
      articulo: navigation.productFilter || "",
      productMaster: navigation.productMaster || "",
      brand: navigation.brand || "",
      proveedor: navigation.provider || "",
    };

    try {
      setLoading(true);
      //dispatch(GetAllListFiltered(initialSearch));
      GetPaginatedProducts(initialSearch)(dispatch);
    } catch (error) {
      console.error("Error al cargar las listas", error);
    }
  };

  const handlerChangeOrder = (value: string) => {
    const sortedData = [...data];

    if (value === "asc_price") {
      sortedData.sort((a, b) => a.precioSinIva! - b.precioSinIva!);
    } else if (value === "desc_price") {
      sortedData.sort((a, b) => b.precioSinIva! - a.precioSinIva!);
    } else if (value === "asc_quantity") {
      sortedData.sort(
        (a, b) => (Number(a.cantidad) || 0) - (Number(b.cantidad) || 0)
      );
    } else if (value === "desc_quantity") {
      sortedData.sort(
        (a, b) => (Number(b.cantidad) || 0) - (Number(a.cantidad) || 0)
      );
    }

    const navigation: Navigation | null = navigationCache;

    if (navigation) {
      navigation.orderBy = value;
      setNavigationCache(navigation);
    }

    if (navigation) {
      const params = buildURLParams("1", navigation);
      navigate(`/lists${params}`);
    }
  };

  const handlerSearch = (navigation: Navigation) => {
    navigation.orderBy = navigation.orderBy || "";
    setNavigationCache(navigation);

    const params = buildURLParams("1", navigation);
    navigate(`/lists${params}`);
  };

  const handlerSearchDescription = (value: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const navigation = getPageNavigationParams(urlParams);
    navigation.productFilter = value;
    const params = buildURLParams("1", navigation);

    setNavigationCache(navigation);
    navigate(`/lists${params}`);
  };

  const handlerClean = () => {
    setNavigationCache(null);
    setCleanTimestamp(Date.now());
    navigate("/lists?page_navigation=1");
    loadListas();
  };

  const editProductHandler = (item: List) => {
    let currentUrl = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const paramString = urlParams.toString();

    currentUrl = `${window.location.pathname}?${paramString}`;
    localStorage.setItem("previousUrl", currentUrl);

    navigate(`/clean/${item._id}`);
  };

  const handlerChangePage = (page: number) => {
    const urlParams = new URLSearchParams(window.location.search);
    const productMaster = urlParams.get("productMaster");
    const provider = urlParams.get("provider");
    const brand = urlParams.get("brand");
    const navigator: Navigation = {
      productMaster: productMaster ? productMaster : "",
      provider: provider ? provider : "",
      brand: brand ? brand : "",
    };

    const params = buildURLParams(page.toString(), navigator);
    navigate(`/lists${params}`);
  };
  //

  return (
    <Box mb={2}>
      <ListasHeaderComponent
        //
        onCleanList={handlerClean}
        onRefreshList={loadListas}
      />

      <Box display={"flex"} flexDirection={"row"}>
        <ListasLeftContent
          data={data}
          cleanTimestamp={cleanTimestamp}
          navigationCache={navigationCache}
          //
          onSearch={handlerSearch}
        />
        <Box
          sx={{
            display: "flex",
            padding: "10px 0px",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {loading && <Loading />}
          {!loading && (
            <ListasCenterContent
              data={data}
              navigation={navigationCache}
              pagination={pagination}
              //
              onEditProduct={editProductHandler}
              onChangePage={handlerChangePage}
              onChangeOrder={handlerChangeOrder}
              onSearchDescripcion={handlerSearchDescription}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ListasComponent;
