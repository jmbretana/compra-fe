import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import Loading from "@common/Loading";
import { InputComponent, TittleHeader, TypographyCommon } from "@common";

import AmountsTableComponent from "./AmountsTableComponent";
import { AMOUNT_GETALL_SUCCESS } from "@AmountActionTypes";
import { GetAllAmounts } from "@actions/amountsActions";
import { Amount, List } from "@interfaces";
import { ButtonDelete } from "@common/button";

import { AutocompleteUnidad } from "@common/autocomplete";
import { FormGridColumn } from "@common/Components";
import { COLORS } from "@values/colors";

import { GetAllLists } from "@actions/listsActions";
import { handleUpdateList, updateItems } from "./functions/functionsAmount";
import { LIST_GETALL_SUCCESS } from "@ListActionTypes";

const AmountsComponent = () => {
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState<string>("");
  const [data, setData] = useState<Amount[]>([]);
  const [dataList, setDataList] = useState<List[]>();
  const [dataFilter, setDataFilter] = useState<Amount[]>([]);
  const [loading, setLoading] = useState(true);
  const [medida, setMedida] = useState<string>("");

  let first = true;

  const dispatch = useDispatch<AppDispatch>();
  const { amounts, statusAmount } = useSelector(
    (state: RootState) => state.amounts
  );
  const { lists, statusLista } = useSelector((state: RootState) => state.lists);

  useEffect(() => {
    if (first) {
      if (amounts.length > 0) loadAmounts();
      if (lists.length === 0) {
        dispatch(GetAllLists());
      }

      try {
        dispatch(GetAllAmounts());
      } catch (error) {
        console.error("Error al cargar las marcas", error);
        dispatch(GetAllAmounts());
      }

      first = false;
    }
  }, []);

  useEffect(() => {
    if (statusAmount === AMOUNT_GETALL_SUCCESS) {
      loadAmounts();
    }
  }, [amounts]);

  useEffect(() => {
    if (statusLista === LIST_GETALL_SUCCESS) {
      setLoading(false);
      setDataList(lists);
    }
  }, [lists, statusLista]);

  const loadAmounts = () => {
    setData(amounts);
    setDataFilter(amounts);
    setLoading(false);
  };

  const handlerEditAmount = (id: string) => {
    navigate("/amount/" + id);
  };

  const handlerRefreshAmount = (formData: Amount) => {
    const listToUpdate: List[] = handleUpdateList(dataList!, formData);
    try {
      if (listToUpdate.length === 0) {
        console.info("No hay listas para actualizar");
        return;
      }
      updateItems(listToUpdate, dispatch);
    } catch (error) {
      console.error("Error al actualizar la lista", error);
    }
  };

  const handleSelectUnidad = (value: string) => {
    let filterData = data;
    filterData = filterData.filter((item) => item.unidad === value);
    setDataFilter(filterData);
  };

  const handleChangeMedida = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMedida(event.target.value);
    const filterData = data;

    if (event.target.value.length >= 0) {
      const filteredData = filterData.filter((item) => {
        const matchesDescripcion = item.medida
          .toLowerCase()
          .includes(event.target.value.toLowerCase());

        return matchesDescripcion;
      });

      setDataFilter(filteredData);
    } else {
      setDataFilter(filterData);
    }
  };

  const handleChangeCantidad = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCantidad(event.target.value);
    const filterData = data;

    if (event.target.value.length >= 0) {
      const filteredData = filterData.filter((item) => {
        const matchesDescripcion = item.cantidad
          .toLowerCase()
          .includes(event.target.value.toLowerCase());

        return matchesDescripcion;
      });

      setDataFilter(filteredData);
    } else {
      setDataFilter(filterData);
    }
  };

  const handlerRefreshAmounList = () => {
    setMedida("");
    setCantidad("");
    setDataFilter(data);
  };

  const viewTipo = () => {
    return (
      <Box
        display={"flex"}
        flexDirection={"row"}
        width={"1000px"}
        gap={2}
        mb={2}
      >
        <FormGridColumn sx={{ gap: 1 }} size={{ xs: 4 }}>
          <TypographyCommon text="Medida" />
          <InputComponent
            id="medida"
            name="medidas"
            required={true}
            value={medida}
            //
            onChange={handleChangeMedida}
          />
        </FormGridColumn>

        <FormGridColumn sx={{ gap: 1 }} size={{ xs: 2 }}>
          <TypographyCommon text="Unidad" />
          <AutocompleteUnidad onSelect={handleSelectUnidad} />
        </FormGridColumn>
        <FormGridColumn sx={{ gap: 1 }} size={{ xs: 3 }}>
          <TypographyCommon text="Cantidad" />
          <InputComponent
            id="medida"
            name="medidas"
            value={cantidad}
            //
            onChange={handleChangeCantidad}
          />
        </FormGridColumn>
        <FormGridColumn size={{ xs: 6 }}>
          <ButtonDelete
            title="Limpiar filtros"
            onClick={() => handlerRefreshAmounList()}
            sx={{
              marginTop: "40px",
              color: COLORS.black,
              backgroundColor: "transparent",
            }}
          />
        </FormGridColumn>
      </Box>
    );
  }; //

  return (
    <Box mb={5}>
      <TittleHeader title={"Medidas"} onAdd={() => handlerEditAmount("new")} />

      {loading && <Loading />}

      {!loading && viewTipo()}
      {!loading && (
        <AmountsTableComponent
          data={dataFilter}
          //
          onEdit={(id) => handlerEditAmount(id)}
          onRefresh={handlerRefreshAmount}
        />
      )}
    </Box>
  );
};

export default AmountsComponent;
