import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Fab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TypographyCommon } from "@common";
import { COLORS } from "@values/colors";
import {
  List,
  Product,
  Provider,
  Navigation,
  SearchItem,
  Amount,
} from "@interfaces";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

import { LeftProvider, ListasLeftAmounts } from ".";

import AutocompleteProductMaster from "@common/autocomplete/AutocompleteProductMaster";
import LeftBrands from "./ListasLeftBrands";
import LeftFilters from "./ListasLeftFilters";
//import LeftUniqueProducts from "./ListasLeftUniqueProducts";

interface ListasHeaderProps {
  data: List[];
  cleanTimestamp: number;
  navigationCache: Navigation | null; // Cache de navegación para restaurar filtros
  //
  onSearch: (navigation: Navigation) => void;
}

const ListasLeftContent: React.FunctionComponent<ListasHeaderProps> = (
  props
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [navigation, setNavigation] = useState<Navigation>({
    productMaster: "",
  });

  const [amounts, setAmounts] = useState<Amount[]>([]); // Estado para almacenar los montos únicos
  const [brands, setBrands] = useState<string[]>([]); // Estado para almacenar las marcas únicas
  const [masterProduct, setMasterProduct] = useState<Product>();
  const [providers, setProviders] = useState<Provider[]>([]);

  // Efecto para limpiar el estado interno cuando cambia cleanTimestamp
  useEffect(() => {
    if (props.cleanTimestamp > 0) {
      setNavigation({
        orderBy: "",
        productMaster: "",
        provider: "",
      });
      setMasterProduct(undefined);
    }
  }, [props.cleanTimestamp]);

  useEffect(() => {
    if (props.data && props.data.length > 0) {
      // Extraer proveedores únicos de la lista de datos
      const uniqueProviders = Array.from(
        new Set(props.data.map((item) => item.proveedor) as string[])
      ).map((providerName) => {
        return {
          razon_social: providerName,
          _id: providerName, // Asignar un ID único basado en el nombre
        };
      });

      // Extraer marcas únicas de la lista de datos
      const uniqueBrands = Array.from(
        new Set(props.data.map((item) => item.marca?.toLowerCase()) as string[])
      ).sort((a, b) => a.localeCompare(b)); // ordenar alfabéticamente

      // ordenar alfabéticamente
      uniqueProviders.sort((a, b) =>
        a.razon_social.localeCompare(b.razon_social)
      );

      setProviders(uniqueProviders);
      setBrands(uniqueBrands);
      setAmounts(searchUniqueAmounts(props.data));
    }
  }, [props.data]);

  useEffect(() => {
    if (props.navigationCache) {
      setNavigation(props.navigationCache);
    }
  }, [props.navigationCache]);

  const searchUniqueAmounts = (data: List[]) => {
    // Extraer medidas y cantidades únicas de la lista de datos
    // Unir medidas, cantidades y unidades únicas de la lista de datos
    const uniqueAmountsMap = new Map<string, Amount>();

    data.forEach((item) => {
      if (!item.medida || !item.unidad) {
        return; // Skip items without medida or unidad
      }
      const key = `${item.medida}|${item.unidad}`;
      if (!uniqueAmountsMap.has(key)) {
        uniqueAmountsMap.set(key, {
          medida: item.medida ? item.medida : "",
          cantidad: "",
          unidad: item.unidad ? item.unidad : "",
          tags: [],
          tipo: item.tipo ? item.tipo : "",
        });
      }
    });

    // ordenar los montos únicos por unidad y medida
    const sortedUniqueAmounts = Array.from(uniqueAmountsMap.values()).sort(
      (a, b) => {
        if (a.unidad < b.unidad) return -1;
        if (a.unidad > b.unidad) return 1;
        if (a.medida < b.medida) return -1;
        if (a.medida > b.medida) return 1;
        return 0;
      }
    );

    // si esta vacio, retornar undefined
    if (sortedUniqueAmounts.length === 0) {
      return [];
    }
    return sortedUniqueAmounts;
  };

  const handlerSelectProduct = (value?: Product) => {
    setNavigation({
      ...navigation,
      productMaster: value ? value.descripcion : "",
    });
    setMasterProduct(value);
    props.onSearch({
      ...navigation,
      productMaster: value ? value.descripcion : "",
    });
  };

  /*
  const handleSelectBookmark = (value: string) => {
    const nav = {
      ...navigation,
      productMaster: value ? value : "",
    };

    setNavigation(nav);
    props.onSearch(nav);
  };
  */

  const handleSelectAmount = (value: Amount) => {
    const nav = {
      ...navigation,
      amount: value ? value : undefined,
    };

    setNavigation(nav);
    props.onSearch(nav);
  };

  const handleSelectProvider = (value: string) => {
    const nav = {
      ...navigation,
      provider: value ? value : "",
    };

    setNavigation(nav);
    props.onSearch(nav);
  };

  const handleSelectBrand = (value: string) => {
    const nav = {
      ...navigation,
      brand: value ? value : "",
    };

    setNavigation(nav);
    props.onSearch(nav);
  };

  const handleRemoveFilter = (value: SearchItem) => {
    const newNavigation = { ...navigation };

    if (value.type === "productMaster") {
      newNavigation.productMaster = "";
    } else if (value.type === "provider") {
      newNavigation.provider = "";
    } else if (value.type === "brand") {
      newNavigation.brand = "";
    } else if (value.type === "amount") {
      newNavigation.amount = undefined;
    }

    setNavigation(newNavigation);

    props.onSearch(newNavigation);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Contenido común de los filtros que se usa tanto en desktop como en mobile
  const renderFilterContent = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: isMobile ? "100%" : "250px",
        padding: 2,
      }}
    >
      {(navigation.productMaster !== "" ||
        navigation.provider !== "" ||
        navigation.brand !== "") && (
        <LeftFilters
          navigation={navigation}
          onRemoveFilter={handleRemoveFilter}
        />
      )}

      {navigation.productMaster === "" && (
        <Box pb={2}>
          <Box>
            <TypographyCommon text="Articulos" variant="subtitle2" />
          </Box>
          <Box>
            <AutocompleteProductMaster
              clear={props.cleanTimestamp > 0}
              value={masterProduct}
              onSelect={handlerSelectProduct}
            />
          </Box>
        </Box>
      )}

      {/*
      (navigation.productFilter !== "" ||
        (navigation.provider && navigation.provider !== "")) && (
        <LeftUniqueProducts
          data={props.data}
          provider={navigation.provider}
          onSelect={handleSelectBookmark}
        />
      )
      */}

      {amounts.length > 0 &&
        navigation.productMaster !== "" &&
        props.data.length > 0 && (
          <Box pt={2}>
            <ListasLeftAmounts
              amounts={amounts}
              onSelect={handleSelectAmount}
            />
          </Box>
        )}

      <Box pt={2}>
        <LeftProvider providers={providers} onSelect={handleSelectProvider} />
      </Box>

      <Box pt={2}>
        <LeftBrands brands={brands} onSelect={handleSelectBrand} />
      </Box>
    </Box>
  );

  return (
    <>
      {/* Versión Desktop */}
      {!isMobile && renderFilterContent()}

      {/* Versión Mobile - Botón flotante */}
      {isMobile && (
        <>
          <Fab
            color="primary"
            aria-label="filtros"
            onClick={toggleDrawer}
            sx={{
              position: "fixed",
              bottom: 80,
              right: 16,
              zIndex: 1000,
              backgroundColor: COLORS.black,
              color: COLORS.white,
              "&:hover": {
                backgroundColor: COLORS.black,
                opacity: 0.8,
              },
            }}
          >
            <FilterListIcon />
          </Fab>

          <Drawer
            anchor="bottom"
            open={isDrawerOpen}
            onClose={closeDrawer}
            PaperProps={{
              sx: {
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                maxHeight: "85vh",
                paddingBottom: 2,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 16px 8px 16px",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <TypographyCommon text="Filtros" variant="h6" />
              <IconButton onClick={closeDrawer} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            {renderFilterContent()}
          </Drawer>
        </>
      )}
    </>
  );
};

export default ListasLeftContent;
