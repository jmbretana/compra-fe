import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ButtonComponent } from "@common";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import Loading from "@common/Loading";
import ProvidersListasTableComponent from "./ProvidersListasTableComponent";

import { GetAllLists } from "@actions/listsActions";

import { List } from "@interfaces";
import { COLORS } from "@values/colors";

import { LIST_GETALL_SUCCESS } from "src/middleware/types/ListActionTypes";

import { AutocompleteProveedores } from "@common/autocomplete";
import SearchIcon from "@mui/icons-material/Search";

import ModalPricesEvolution from "./graphics/ModalPricesEvolution";
import { StatCardProps } from "./graphics/StatCard";
import { capitalizeFirstLetter } from "@utils/utils";

const ProvidersComponent = () => {
  const [data, setData] = useState<List[]>([]);

  const [dataCard, setDataCard] = useState<StatCardProps>();
  const [loading, setLoading] = useState(true);
  const [proveedor, setProveedor] = useState<string>("");

  const [openModal, setOpenModal] = useState(false);

  let first = true;

  const dispatch = useDispatch<AppDispatch>();

  const { lists, statusLista } = useSelector((state: RootState) => state.lists);

  //

  useEffect(() => {
    if (first) {
      if (lists.length > 0) loadData();
      else dispatch(GetAllLists());
      first = false;
    }
  }, [dispatch]);

  useEffect(() => {
    if (statusLista === LIST_GETALL_SUCCESS) {
      loadData();
    }
  }, [lists]);

  const loadData = () => {
    const lista = Array.isArray(lists) ? lists : [];
    const dataFilter = lista.filter((item) => item.proveedor === proveedor);
    setData(orderAndClearData(dataFilter));
    setLoading(false);
  };

  const orderAndClearData = (data: List[]) => {
    // Ordenar por descripcion y fecha
    data.sort((a, b) => {
      const descripcionComparison = a.articulo.localeCompare(b.articulo);
      if (descripcionComparison !== 0) {
        return descripcionComparison;
      }
      return new Date(b.fecha!).getTime() - new Date(a.fecha!).getTime(); // Ordenar por fecha descendente
    });

    // Filtrar para dejar solo el registro con la fecha más actualizada para cada combinación de proveedor y artículo
    const uniqueData = data.reduce((acc, current) => {
      const key = `${current.proveedor}-${current.articulo}`;
      if (!acc[key]) {
        acc[key] = current;
      }
      return acc;
    }, {} as Record<string, List>);

    return Object.values(uniqueData);
  };

  const handleSelectProvedor = (proveedor: string) => {
    setProveedor(proveedor.toLowerCase());
  };

  const handlerSearch = () => {
    setLoading(true);
    dispatch(GetAllLists());
  };

  const handlerSelectProduct = (product: List) => {
    const historicPrices = data
      .map((item) => {
        return {
          _id: item._id,
          date: item.fecha,
          price: item.precioSinIva,
          articulo: item.articulo,
        };
      })
      .filter((item) => item.articulo === product.articulo);

    // Generar un array de fechas para los últimos 30 días
    const dates = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    // Crear un objeto para mapear las fechas a los precios
    const priceMap = historicPrices.reduce((acc, { date, price }) => {
      if (date) {
        acc[date] = price!;
      }
      return acc;
    }, {} as Record<string, number>);

    // Construir el array final usando el array de fechas y el objeto de mapeo
    const priceData = [];
    let lastPrice = 0;
    for (const date of dates) {
      if (priceMap[date] !== undefined) {
        lastPrice = priceMap[date];
      }
      priceData.push(lastPrice);
    }

    const dataCardProduct: StatCardProps = {
      title: capitalizeFirstLetter(product.articulo),
      value: product.precioSinIva!.toString(),
      interval: "Last 30 days",
      trend: "neutral",
      data: priceData,
    };

    setDataCard(dataCardProduct);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  //

  return (
    <Box mb={5}>
      {" "}
      <Box display={"flex"} justifyContent={"space-between"} paddingBottom={2}>
        <Box display={"flex"}>
          <Typography
            sx={{
              color: COLORS.grey_dark,
              fontFamily: "Lexend",
              fontWeight: 400,
              fontSize: "32px",
              lineHeight: "40px",
            }}
            variant="h5"
          >
            {" "}
            Proveedores
          </Typography>
        </Box>
      </Box>
      <Box display={"flex"} paddingBottom={2}>
        <Box display={"flex"}>
          <AutocompleteProveedores onSelect={handleSelectProvedor} />
        </Box>

        <Box display="flex" gap="5px">
          <ButtonComponent
            startIcon={<SearchIcon />}
            text="Buscar"
            sx={{
              minWidth: "110px",
              backgroundColor: COLORS.black,
              color: COLORS.white,
              fontWeight: 600,
              borderRadius: "20px",
              padding: "5px 20px",
            }}
            //
            onClick={() => handlerSearch()}
          />
        </Box>
      </Box>
      {loading && <Loading />}
      {!loading && (
        <ProvidersListasTableComponent
          data={data}
          //
          onSelect={handlerSelectProduct}
        />
      )}
      {dataCard && (
        <ModalPricesEvolution
          open={openModal}
          dataCard={dataCard}
          //
          onClose={handleCloseModal}
        />
      )}
      <Box mt={3}></Box>
    </Box>
  );
};

export default ProvidersComponent;
