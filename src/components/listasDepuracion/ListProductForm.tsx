import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@common/Loading";
import { TittleHeader } from "@common";
import { Box, Switch, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import { COLORS } from "@values/colors";
import SaveIcon from "@mui/icons-material/Save";
import { AppDispatch, RootState } from "src/middleware/store/store";
import { ButtonComponent, InputComponent } from "@common";
import {
  LIST_DELETE_SUCCESS,
  LIST_GET_SUCCESS,
} from "src/middleware/types/ListActionTypes";
import {
  InitialStatusList,
  DeleteListById,
  GetListById,
  updateProductList,
} from "@actions/listsActions";
import { List } from "@interfaces";
import { ButtonDelete } from "@common/button";

import {
  AutocompleteBrands,
  AutocompleteProductMaster,
  AutocompleteUnidad,
} from "@common/autocomplete";

//

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const ListProductForm: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<List>({
    articulo: "",
    productMaster: "",
  });

  const { list, statusLista } = useSelector((state: RootState) => state.lists);

  useEffect(() => {
    try {
      dispatch(GetListById(id!));
    } catch (error) {
      console.error("Error al obtener el articulo", error);
    }
  }, [id]);

  useEffect(() => {
    if (statusLista === LIST_GET_SUCCESS && list) {
      setLoading(false);
      setFormData({
        _id: list._id,
        articulo: list.articulo ? list.articulo.toUpperCase() : "",
        medida: list.medida,
        unidad: list.unidad,
        cantidad: list.cantidad,
        marca: list.marca,
        proveedor: list.proveedor,
        categoria: list.categoria,
        subcategoria: list.subcategoria,
        precioSinIva: list.precioSinIva,
        precio: list.precio,
        productMaster: list.productMaster,
        bookmark: list.bookmark,
        tipo: list.tipo,
        vigente: list.vigente,
      });
    }

    if (statusLista === LIST_DELETE_SUCCESS) {
      dispatch(InitialStatusList());
      handleCancel();
    }
  }, [list, statusLista]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      (event as any).nativeEvent instanceof KeyboardEvent &&
      (event as any).nativeEvent.key === "Enter"
    ) {
      return;
    }

    dispatch(updateProductList(formData));
  };

  const handleChange = (e: any) => {
    switch (e.target.name) {
      case "articulo":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value ? e.target.value.toUpperCase() : "",
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

  const handlerDeleteProduct = (_id: string) => {
    dispatch(DeleteListById(_id));
  };

  const handleCancel = () => {
    const previousUrl = localStorage.getItem("previousUrl");
    if (previousUrl && !previousUrl.includes("/clean")) {
      navigate(previousUrl);
    } else {
      navigate("/clean");
    }
  };

  const handleSelectUnidad = (value: string) => {
    setFormData({
      ...formData,
      unidad: value,
    });
  };

  const formProducto = () => {
    return (
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <Grid container spacing={3} sx={{ background: COLORS.white }}>
          <FormGrid size={{ xs: 6, md: 6 }}>
            <Typography>Articulo</Typography>
            <InputComponent
              id="articulo"
              name="articulo"
              required={true}
              value={formData.articulo}
            />
          </FormGrid>
          <FormGrid size={{ xs: 6 }}>
            <Typography>Master</Typography>
            <AutocompleteProductMaster
              valueString={formData.productMaster}
              onSelect={(value) =>
                setFormData({ ...formData, productMaster: value?.descripcion })
              }
            />
          </FormGrid>
          <FormGrid size={{ xs: 4, md: 2 }}>
            <Typography>Medida</Typography>
            <InputComponent
              id="medida"
              name="medida"
              required={true}
              value={formData.medida}
            />
          </FormGrid>

          <FormGrid size={{ xs: 4, md: 2 }}>
            <Typography>Unidad</Typography>
            <AutocompleteUnidad
              value={formData.unidad}
              onSelect={handleSelectUnidad}
            />
          </FormGrid>
          <FormGrid size={{ xs: 4, md: 2 }}>
            <Typography>Cantidad</Typography>
            <InputComponent
              id="cantidad"
              name="cantidad"
              required={true}
              value={formData.cantidad}
            />
          </FormGrid>
          <FormGrid size={{ xs: 4 }}>
            <Typography>Marca</Typography>
            <AutocompleteBrands
              value={formData.marca}
              onSelect={(value) => setFormData({ ...formData, marca: value })}
            />
          </FormGrid>
          <FormGrid size={{ xs: 2 }}>
            <Typography>Vigente</Typography>
            <Switch
              id="vigente"
              name="vigente"
              checked={formData.vigente ? true : false}
              onChange={(e) =>
                setFormData({ ...formData, vigente: e.target.checked })
              }
            />
          </FormGrid>
          <FormGrid
            size={{ xs: 12 }}
            sx={{
              paddingTop: "10px",
              borderTop: `1px solid ${COLORS.grey_300}`,
            }}
          >
            <Box justifyContent={"space-between"} display={"flex"}>
              {" "}
              <Box>
                {formData._id && (
                  <ButtonDelete
                    title="Borrar producto"
                    onClick={() => handlerDeleteProduct(formData._id!)}
                    sx={{
                      color: COLORS.black,
                      backgroundColor: "transparent",
                    }}
                  />
                )}
              </Box>
              <Box>
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
            </Box>
          </FormGrid>
        </Grid>
      </form>
    );
  };

  return (
    <>
      <TittleHeader
        title={"Editar Articulo"}
        //
        onCancel={handleCancel}
      />
      <>
        {loading && <Loading />}

        <Box
          sx={{
            background: COLORS.white,
            borderRadius: "20px",
            border: "1px solid #e0e0e0",
            padding: "20px",
          }}
        >
          {!loading && formProducto()}
        </Box>
      </>
    </>
  );
};

export default ListProductForm;
