import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Bookmark, Product } from "@interfaces";
import Loading from "@common/Loading";

import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import { COLORS } from "@values/colors";
import { TittleHeader } from "@common";

import SaveIcon from "@mui/icons-material/Save";

import {
  GetAllBookmarks,
  GetBookmark,
  CreateBookmark,
  UpdateBookmark,
} from "@actions/bookmarksActions";
import { AppDispatch, RootState } from "src/middleware/store/store";
import { ButtonComponent } from "@common";
import {
  BOOKMARK_CREATE_SUCCESS,
  BOOKMARK_GET_SUCCESS,
  BOOKMARK_UPDATE_SUCCESS,
} from "@BookmarkActionTypes";
import {
  AutocompleteBrands,
  AutocompleteProductMaster,
} from "@common/autocomplete";
//

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const BookmarksForm: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const edit = id == "new" ? false : true;
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Bookmark>({
    descripcion: "",
    product: undefined,
  });

  const { bookmark, statusBookmark } = useSelector(
    (state: RootState) => state.bookmarks
  );

  let first = true;

  useEffect(() => {
    if (edit && first) {
      first = false;
      try {
        dispatch(GetBookmark(id!));
      } catch (error) {
        console.error("Error al obtener la marca", error);
        dispatch(GetBookmark(id!));
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (statusBookmark === BOOKMARK_GET_SUCCESS && bookmark && edit) {
      if (bookmark && "descripcion" in bookmark) {
        setFormData({
          _id: bookmark._id,
          product_master_id: bookmark.product_master_id,
          descripcion: bookmark.descripcion,
          product: bookmark.product,
          brand: bookmark.brand,
        });
        setLoading(false);
      }
    }

    if (statusBookmark === BOOKMARK_CREATE_SUCCESS && bookmark) {
      dispatch(GetAllBookmarks());
      //const boomark_id = bookmark.product_master_id;
      navigate("/bookmarks");
    }

    if (statusBookmark === BOOKMARK_UPDATE_SUCCESS) {
      dispatch(GetAllBookmarks());
    }
  }, [statusBookmark]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (edit) {
      try {
        dispatch(UpdateBookmark(formData));
      } catch (error) {
        console.error("Error al obtener la marca", error);
        dispatch(UpdateBookmark(formData));
      }
    } else dispatch(CreateBookmark(formData));
  };

  const handleChangeProducto = (product: Product | undefined) => {
    setFormData({
      ...formData,
      product_master_id: product ? product.product_master_id : "",
      descripcion: product ? product.descripcion : "",
      product: product,
    });
  };

  const handleChangeMarca = (value: string | undefined) => {
    setFormData({
      ...formData,
      brand: value ? value : "",
    });
  };

  const handleCancel = () => {
    navigate("/bookmarks");
  };

  const formBookmark = () => {
    return (
      <form onSubmit={handleSubmit} onChange={() => {}}>
        <Grid container spacing={3} sx={{ background: COLORS.white }}>
          <FormGrid size={{ xs: 6, md: 6 }}>
            <Typography>Articulo</Typography>
            <AutocompleteProductMaster
              onSelect={handleChangeProducto}
              value={formData.product ? formData.product : undefined}
            />
          </FormGrid>

          <FormGrid size={{ xs: 6, md: 6 }}>
            <Typography>Marca</Typography>
            <AutocompleteBrands onSelect={handleChangeMarca} />
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
        title={id === "new" ? "Agregar Favorito" : "Editar Favorito"}
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
          {!loading && formBookmark()}
        </Box>
      </>
    </>
  );
};

export default BookmarksForm;
