import { List, Navigation } from "@interfaces";

export const getPageNavigationParams = (urlParams: URLSearchParams) => {
  const productMaster = urlParams.get("productMaster");
  const productFilter = urlParams.get("productFilter");
  const provider = urlParams.get("provider");
  const brand = urlParams.get("brand");
  const amountMedida = urlParams.get("amountMedida");
  const amountUnidad = urlParams.get("amountUnidad");
  const orderBy = urlParams.get("order_by");

  const navigation: Navigation = {
    productMaster: productMaster ? productMaster.toLowerCase() : "",
    productFilter: productFilter ? productFilter.toLowerCase() : "",
    provider: provider ? provider.toLowerCase() : "",
    brand: brand ? brand.toLowerCase() : "",
    orderBy: orderBy ? orderBy.toLowerCase() : "",
    amount: {
      medida: amountMedida ? amountMedida.toLowerCase() : "",
      unidad: amountUnidad ? amountUnidad.toLowerCase() : "",
      tipo: "unidad",
      tags: [],
      cantidad: "1",
    },
  };

  return navigation;
};

export const searchParams = (lists: List[], navigation: Navigation) => {
  let filteredData = lists.filter((item) => {
    const matchesProductMaster = navigation.productMaster
      ? item.productMaster?.toLowerCase() ===
        navigation.productMaster.toLowerCase()
      : true;

    return matchesProductMaster;
  });

  if (navigation.productFilter !== "" && navigation.productMaster === "") {
    filteredData = lists.filter((item) => {
      const filterWords = navigation.productFilter
        ? navigation.productFilter.toLowerCase().split(" ").filter(Boolean)
        : [];

      const matchesProductFilter =
        filterWords.length > 0
          ? filterWords.every((word) =>
              item.articulo?.toLowerCase().includes(word)
            )
          : true;

      return matchesProductFilter;
    });
  }

  filteredData = filteredData.filter((item) => {
    const matchesProvider = navigation.provider
      ? item.proveedor?.toLowerCase() === navigation.provider.toLowerCase()
      : true;

    return matchesProvider;
  });

  filteredData = filteredData.filter((item) => {
    const matchesBrand = navigation.brand
      ? item.marca?.toLowerCase() === navigation.brand.toLowerCase()
      : true;

    return matchesBrand;
  });

  filteredData = filteredData.filter((item) => {
    const matchesAmount = navigation.amount?.medida
      ? item.medida?.toLowerCase() ===
          navigation.amount?.medida.toLowerCase() &&
        item.unidad?.toLowerCase() === navigation.amount?.unidad.toLowerCase()
      : true;
    return matchesAmount;
  });

  if (navigation.orderBy) {
    filteredData = filteredData.sort((a, b) => {
      if (navigation.orderBy === "asc_price") {
        return (a.precioSinIva || 0) - (b.precioSinIva || 0);
      } else if (navigation.orderBy === "desc_price") {
        return (b.precioSinIva || 0) - (a.precioSinIva || 0);
      } else if (navigation.orderBy === "asc_quantity") {
        return (Number(a.cantidad) || 0) - (Number(b.cantidad) || 0);
      } else if (navigation.orderBy === "desc_quantity") {
        return (Number(b.cantidad) || 0) - (Number(a.cantidad) || 0);
      }
      return 0;
    });
  }

  return filteredData;
};

export const buildURLParams = (page: string, navigation: Navigation) => {
  let params = "?page_navigation=" + page;

  if (navigation.productMaster && navigation.productMaster !== "") {
    params += `&productMaster=${navigation.productMaster}`;
  }

  if (navigation.productFilter && navigation.productFilter !== "") {
    params += `&productFilter=${navigation.productFilter}`;
  }

  if (navigation.provider && navigation.provider !== "") {
    params += `&provider=${navigation.provider}`;
  }

  if (navigation.brand && navigation.brand !== "") {
    params += `&brand=${navigation.brand}`;
  }

  if (navigation.amount && navigation.amount.unidad !== "") {
    params += `&amountMedida=${navigation.amount.medida}`;
    params += `&amountUnidad=${navigation.amount.unidad}`;
  }

  if (navigation.orderBy && navigation.orderBy !== "") {
    params += `&order_by=${navigation.orderBy}`;
  }

  return params;
};
