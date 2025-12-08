import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Brand, List } from "@interfaces";
import Loading from "@common/Loading";

import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import { COLORS } from "@values/colors";
import { TittleHeader } from "@common";

import SaveIcon from "@mui/icons-material/Save";

import {
  GetAllBrands,
  GetBrand,
  CreateBrand,
  UpdateBrand,
} from "@actions/brandsActions";
import { AppDispatch, RootState } from "src/middleware/store/store";
import { ButtonComponent, InputComponent } from "@common";
import { GetAllLists, UpdateManyProductList } from "@actions/listsActions";
import {
  BRAND_CREATE_SUCCESS,
  BRAND_GET_SUCCESS,
  BRAND_UPDATE_SUCCESS,
} from "@BrandActionTypes";
//

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const BrandsFormComponent: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const edit = id == "new" ? false : true;
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Brand>({
    nombre: "",
    tags: [],
  });

  const { brand, statusBrand } = useSelector(
    (state: RootState) => state.brands
  );

  let first = true;
  const { lists } = useSelector((state: RootState) => state.lists);

  useEffect(() => {
    if (edit && first) {
      first = false;
      try {
        dispatch(GetBrand(id!));
        dispatch(GetAllLists());
      } catch (error) {
        console.error("Error al obtener la marca", error);
        dispatch(GetBrand(id!));
        dispatch(GetAllLists());
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (statusBrand === BRAND_GET_SUCCESS && brand && edit) {
      if (brand && "nombre" in brand) {
        setFormData({
          _id: (brand as Brand)._id,
          nombre: (brand as Brand).nombre,
          tags: (brand as Brand).tags || [],
        });
        setLoading(false);
      }
    }

    if (statusBrand === BRAND_CREATE_SUCCESS && brand) {
      dispatch(GetAllBrands());
      const brand_id = brand._id;
      navigate("/brands/" + brand_id);
    }

    if (statusBrand === BRAND_UPDATE_SUCCESS) {
      dispatch(GetAllBrands());
    }
  }, [statusBrand]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData && formData.tags && formData.tags.length === 0) {
      formData.tags = formData.nombre.split(",");
    }

    if (edit) {
      try {
        dispatch(UpdateBrand(formData));
      } catch (error) {
        console.error("Error al obtener la marca", error);
        dispatch(UpdateBrand(formData));
      }
    } else dispatch(CreateBrand(formData));
  };

  const handleChange = (e: any) => {
    switch (e.target.name) {
      case "tags":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value.split(","),
        });
        break;
      case "nombre":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
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

  const updateItems = async (listToUpdate: List[]) => {
    // enviar a UpdateManyProductList la lista de items sin marca
    try {
      // enviar de a lotes de 50 items
      const chunkSize = 50;
      for (let i = 0; i < listToUpdate.length; i += chunkSize) {
        const chunk = listToUpdate.slice(i, i + chunkSize);
        await dispatch(UpdateManyProductList(chunk));
      }
    } catch (error) {
      console.error("Error al cargar las listas", error);
    }

    setLoading(false);
  };

  const handleUpdateList = () => {
    const listToUpdate: List[] = [];

    lists.map((item: List) => {
      let find = false;
      const articulo = item.articulo.toLowerCase();

      formData.tags?.map((tag) => {
        // controlar si el tag existe en el articulo pero que el mismo tenga a los costados un espacio y no sea parte de otra palabra
        if (articulo.includes(" " + tag.trim().toLowerCase() + " ")) {
          find = true;
        }
      });

      if (find) {
        const productList: List = {
          ...item,
          marca: formData.nombre,
        };

        listToUpdate.push(productList);
      }
    });

    updateItems(listToUpdate);
  };

  const handleCancel = () => {
    navigate("/brands");
  };

  const formBrand = () => {
    return (
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <Grid container spacing={3} sx={{ background: COLORS.white }}>
          <FormGrid size={{ xs: 6, md: 6 }}>
            <Typography>Nombre</Typography>
            <InputComponent
              id="nombre"
              name="nombre"
              required={true}
              value={formData.nombre}
            />
          </FormGrid>

          <FormGrid size={{ xs: 6, md: 6 }}>
            <Typography>Etiquetas</Typography>
            <InputComponent
              id="tags"
              name="tags"
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
                onClick={() => handleUpdateList()}
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
        title={id === "new" ? "Agregar Marca" : "Editar Marca"}
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
          {!loading && formBrand()}
        </Box>
      </>
    </>
  );
};

export default BrandsFormComponent;
