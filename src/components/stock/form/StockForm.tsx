import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@common/Loading";
import { TittleHeader } from "@common";
import { Box, Tab, Tabs } from "@mui/material";
import { COLORS } from "@values/colors";
import { AppDispatch, RootState } from "src/middleware/store/store";

import StockFormTable from "./StockFormTable";

import { Product, ProductStock, StockOrder } from "@interfaces";
import { stockGroups } from "@interfaces/enum";

import { GetAllProductFiltered } from "@actions/productsActions";
import { PRODUCT_GETALL_FILTER_SUCCESS } from "@ProductActionTypes";
//

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StockFormComponent: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<StockOrder>();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<number>(0);

  let first = true;

  const { products, statusProduct } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (first) {
      first = false;
      try {
        dispatch(GetAllProductFiltered({ stock: true }));
      } catch (error) {
        console.error("Error al obtener el articulo", error);
      }
    }
  }, []);

  useEffect(() => {
    if (statusProduct === PRODUCT_GETALL_FILTER_SUCCESS) {
      setLoading(false);

      const productsStock: ProductStock[] = [];
      products.map((item: Product) => {
        productsStock.push({
          product_master_id: item.product_master_id!,
          cantidad: 0,
          descripcion: item.descripcion,
          categoria: item.categoria ? item.categoria || "" : "",
        });
      });

      // ordenar por categoria y descripcion
      productsStock.sort((a, b) => {
        if (a.categoria && b.categoria) {
          if (a.categoria < b.categoria) return -1;
          if (a.categoria > b.categoria) return 1;
        }
        if (a.descripcion < b.descripcion) return -1;
        if (a.descripcion > b.descripcion) return 1;
        return 0;
      });

      const stockOrder: StockOrder = {
        fecha: new Date().toISOString(),
        categories: [],
      };

      stockGroups.map((group) => {
        group.categorias.map((cat) => {
          const productByCat: ProductStock[] = [];

          productsStock.map((product) => {
            if (product.categoria?.toLowerCase() === cat.toLowerCase()) {
              productByCat.push({
                product_master_id: product.product_master_id,
                descripcion: product.descripcion,
                cantidad: 0,
                marca: product.marca,
                unidad: product.unidad,
                tipo: product.tipo,
                medida: product.medida,
              });
            }
          });

          stockOrder.categories.push({
            category: cat,
            products: productByCat,
          });
        });
      });

      setData(stockOrder);
    }
  }, [statusProduct]);

  const handleCancel = () => {
    gotBack();
  };

  const gotBack = () => {
    // chequear previusUrl
    const previousUrl = localStorage.getItem("previousUrl");

    if (previousUrl) {
      navigate(previousUrl);
    } else {
      navigate("/products");
    }
  };

  const handleEdit = (id: string) => {
    console.info(id);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const formStock = (group: string) => {
    // filtrar categorias por grupo
    const filteredCategories = stockGroups.find(
      (g) => g.name === group
    )?.categorias;

    const filteredData = data!.categories.filter((cat) =>
      filteredCategories!.includes(cat.category)
    );

    return <StockFormTable categories={filteredData!} onEdit={handleEdit} />;
  };

  return (
    <>
      <TittleHeader
        title={id === "new" ? "Solicitar Stock" : "Editar Solicitud de Stock"}
        //
        onCancel={handleCancel}
      />
      <>
        {loading && <Loading />}
        {!loading && !data && (
          <Box sx={{ padding: "20px", textAlign: "center" }}>
            No hay articulos disponibles para solicitar stock.
          </Box>
        )}

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Categorías de Stock"
        >
          {stockGroups.map((group) => (
            <Tab key={group.id} label={group.name} {...a11yProps(0)} />
          ))}
        </Tabs>

        {!loading &&
          data &&
          stockGroups.map((group, index) => (
            <CustomTabPanel value={value} index={index} key={group.id}>
              <Box
                sx={{
                  background: COLORS.white,
                  borderRadius: "20px",
                  border: "1px solid #e0e0e0",
                  padding: "20px",
                }}
              >
                {formStock(group.name)}
              </Box>
            </CustomTabPanel>
          ))}
      </>
    </>
  );
};

export default StockFormComponent;
