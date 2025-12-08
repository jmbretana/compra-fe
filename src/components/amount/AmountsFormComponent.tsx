import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Amount, List } from "@interfaces";
import Loading from "@common/Loading";

import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import { COLORS } from "@values/colors";
import { TittleHeader } from "@common";

import SaveIcon from "@mui/icons-material/Save";

import {
  GetAllAmounts,
  GetAmount,
  CreateAmount,
  UpdateAmount,
} from "@actions/amountsActions";
import { AppDispatch, RootState } from "src/middleware/store/store";
import { ButtonComponent, InputComponent } from "@common";

import { AMOUNT_CREATE_SUCCESS, AMOUNT_GET_SUCCESS } from "@AmountActionTypes";
import { LIST_UPDATE_SUCCESS } from "@ListActionTypes";
import {
  AutocompleteTipoUnidad,
  AutocompleteUnidad,
} from "@common/autocomplete";
//
import { GetAllLists } from "@actions/listsActions";
import { handleUpdateList, updateItems } from "./functions/functionsAmount";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const AmountsFormComponent: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const edit = id == "new" ? false : true;
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Amount>({
    unidad: "",
    cantidad: "",
    tags: [],
    tipo: "",
    medida: "",
  });

  const { amount, statusAmount } = useSelector(
    (state: RootState) => state.amounts
  );

  const { statusLista } = useSelector((state: RootState) => state.lists);
  const { lists } = useSelector((state: RootState) => state.lists);

  let first = true;

  useEffect(() => {
    if (edit && first) {
      first = false;
      try {
        dispatch(GetAmount(id!));
        dispatch(GetAllLists());
      } catch (error) {
        console.error("Error al obtener la cantidad", error);
        dispatch(GetAmount(id!));
        dispatch(GetAllLists());
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (statusAmount === AMOUNT_GET_SUCCESS && amount && edit) {
      setFormData(amount);
      setLoading(false);
    }

    if (statusAmount === AMOUNT_CREATE_SUCCESS && amount) {
      dispatch(GetAllAmounts());
      navigate("/amount/" + amount._id);
    }
  }, [statusAmount]);

  useEffect(() => {
    if (statusLista === LIST_UPDATE_SUCCESS) {
      setLoading(false);
    }
  }, [statusLista]);

  const handleUpdate = () => {
    const listToUpdate: List[] = handleUpdateList(lists, formData);
    try {
      if (listToUpdate.length === 0) return;
      setLoading(true);
      updateItems(listToUpdate, dispatch);
    } catch (error) {
      console.error("Error al actualizar la lista", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (edit) {
      try {
        dispatch(UpdateAmount(formData));
      } catch (error) {
        console.error("Error al actualizar la cantidad", error);
        dispatch(UpdateAmount(formData));
      }
    } else {
      try {
        dispatch(CreateAmount(formData));
      } catch (error) {
        console.error("Error al crear la cantidad", error);
        dispatch(CreateAmount(formData));
      }
    }
  };

  const handleChange = (e: any) => {
    switch (e.target.name) {
      case "tags":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value.split(","),
        });
        break;

      default:
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        break;
    }
  };

  const handleCancel = () => {
    navigate("/amount");
  };

  const handleSelectUnidad = (value: string) => {
    setFormData({
      ...formData,
      unidad: value,
    });
  };

  const handleSelectTipoUnidad = (value: string) => {
    setFormData({
      ...formData,
      tipo: value,
    });
  };

  const formAmount = () => {
    return (
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <Grid container spacing={3} sx={{ background: COLORS.white }}>
          <FormGrid size={{ xs: 2, md: 2 }}>
            <Typography>Unidad</Typography>
            <AutocompleteUnidad
              value={formData.unidad}
              onSelect={handleSelectUnidad}
            />
          </FormGrid>

          <FormGrid size={{ xs: 2, md: 2 }}>
            <Typography>Medida</Typography>
            <InputComponent
              id="medida"
              name="medida"
              required={true}
              value={formData.medida}
            />
          </FormGrid>

          <FormGrid size={{ xs: 2, md: 2 }}>
            <Typography>Tipo</Typography>
            <AutocompleteTipoUnidad
              value={formData.tipo}
              onSelect={handleSelectTipoUnidad}
            />
          </FormGrid>

          <FormGrid size={{ xs: 2, md: 2 }}>
            <Typography>Cantidad</Typography>
            <InputComponent
              id="cantidad"
              name="cantidad"
              required={true}
              value={formData.cantidad}
            />
          </FormGrid>

          <FormGrid size={{ xs: 6, md: 6 }}>
            <Typography>Tags</Typography>
            <InputComponent
              id="tags"
              name="tags"
              required={true}
              value={formData.tags?.join(",")}
            />
          </FormGrid>
          <FormGrid size={{ xs: 6 }}> </FormGrid>

          <FormGrid size={{ xs: 12 }}>
            <Box justifyContent={"end"} display={"flex"}>
              {" "}
              <ButtonComponent
                text="Cancelar"
                color="secondary"
                onClick={() => handleCancel()}
                sx={{
                  marginRight: "10px",
                  borderRadius: "20px",
                  padding: "5px 20px",
                }}
                variant="text"
              />{" "}
              <ButtonComponent
                text="Actualizar en Lista"
                color="info"
                onClick={handleUpdate}
                sx={{
                  marginRight: "10px",
                  borderRadius: "20px",
                  padding: "5px 20px",
                }}
              />{" "}
              <ButtonComponent
                type="submit"
                startIcon={<SaveIcon />}
                text="Grabar"
                sx={{
                  borderRadius: "20px",
                  padding: "5px 20px",
                }}
                color="secondary"
                onClick={() => undefined}
              />
            </Box>
          </FormGrid>
        </Grid>
      </form>
    );
  };

  return (
    <>
      <TittleHeader
        title={id === "new" ? "Agregar medida" : "Editar medida"}
        onCancel={handleCancel}
      />
      <>
        <Box
          sx={{
            background: COLORS.white,
            borderRadius: "20px",
            border: "1px solid #e0e0e0",
            padding: "20px",
          }}
        >
          {loading && <Loading />}
          {!loading && formAmount()}
        </Box>
      </>
    </>
  );
};

export default AmountsFormComponent;
