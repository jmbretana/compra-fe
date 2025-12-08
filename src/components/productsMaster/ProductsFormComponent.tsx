import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Product, List } from "@interfaces";
import Loading from "@common/Loading";
import { TittleHeader } from "@common";
import { Box, Switch, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import { COLORS } from "@values/colors";
import SaveIcon from "@mui/icons-material/Save";
import {
  GetProduct,
  GetAllProducts,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from "@actions/productsActions";
import { AppDispatch, RootState } from "src/middleware/store/store";
import { ButtonComponent, InputComponent, TagsComponent } from "@common";
import {
  PRODUCT_GET_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
} from "src/middleware/types/ProductActionTypes";
import { ButtonDelete } from "@common/button";
import AutocompleteCategorias from "@common/autocomplete/AutocompleteCategorias";
import { GetAllLists, UpdateManyProductList } from "@actions/listsActions";
import { AutocompleteSubcategorias } from "@common/autocomplete";

//

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const FormProductComponent: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  let first = true;

  const [formData, setFormData] = useState<Product>({
    descripcion: "",
    categoria: "",
    subcategoria: "",
    product_base: false,
    bookmark: false,
    stock: false,
    tags: [],
  });

  const { product, products, statusProduct } = useSelector(
    (state: RootState) => state.products
  );
  const { lists } = useSelector((state: RootState) => state.lists);

  useEffect(() => {
    if (id !== "new" && first) {
      first = false;
      setEdit(true);
      try {
        dispatch(GetProduct(id!));
        dispatch(GetAllLists());
        dispatch(GetAllProducts());
      } catch (error) {
        console.error("Error al obtener el articulo", error);
        dispatch(GetProduct(id!));
        dispatch(GetAllLists());
        dispatch(GetAllProducts());
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (statusProduct === PRODUCT_GET_SUCCESS && product) {
      setLoading(false);
      setFormData({
        product_master_id: id,
        descripcion: product.descripcion.toUpperCase(),
        categoria: product.categoria,
        subcategoria: product.subcategoria,
        tags: product.tags,
        bookmark: product.bookmark,
        stock: product.stock,
        product_base: product.product_base,
      });
    }

    if (statusProduct === PRODUCT_CREATE_SUCCESS && product) {
      navigate("/producto/" + product.product_master_id);
    }

    if (statusProduct === PRODUCT_DELETE_SUCCESS) {
      dispatch(GetAllProducts());
      navigate("/products");
    }
  }, [statusProduct]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Prevent submit on Enter key
    if (
      (event as any).nativeEvent instanceof KeyboardEvent &&
      (event as any).nativeEvent.key === "Enter"
    ) {
      return;
    }

    if (edit) dispatch(UpdateProduct(formData));
    else {
      try {
        dispatch(CreateProduct(formData));
      } catch (error) {
        console.error("Error al crear el articulo", error);
        dispatch(CreateProduct(formData));
      }
    }
  };

  const handleChange = (e: any) => {
    switch (e.target.name) {
      case "product_base":
      case "stock":
      case "bookmark":
        setFormData({
          ...formData,
          [e.target.name]: e.target.checked,
        });
        break;
      case "tags":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value.split(","),
        });
        break;
      case "descripcion":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value.toUpperCase(),
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

  const handleDelete = () => {
    try {
      dispatch(DeleteProduct(formData.product_master_id!));
    } catch (error) {
      console.error("Error al eliminar el articulo", error);
      dispatch(DeleteProduct(formData.product_master_id!));
    }
  };

  const searchTags = (tags: string[], articulo: string) => {
    let find = false;
    tags?.map((tag) => {
      tag = tag.trim().toLowerCase();

      if (tag === "") return;

      if (tag.includes("%")) {
        const parts = tag.split("%");
        let countParts = parts.length;

        parts.forEach((part) => {
          part = part.trim();
          if (articulo.includes(part.toLowerCase())) {
            countParts--;
          }
        });

        if (countParts === 0) {
          find = true;
        }
      }

      if (articulo.includes(tag)) {
        find = true;
      }
    });

    return find;
  };

  const handleUpdateList = () => {
    const listToUpdate: List[] = [];

    if (formData.product_base) {
      const productFilter = products.filter(
        (item) =>
          (item.subcategoria?.toLowerCase() ?? "") ===
            formData.subcategoria?.toLowerCase() && item.product_base !== true
      );

      // quitar de lists todos aquellos items que tengan algunos de los product master que estan en productFilter
      const listsFiltered = lists.filter(
        (item) =>
          !productFilter.some(
            (product) =>
              product.descripcion.toLowerCase() ===
              item.productMaster?.toLowerCase()
          )
      );

      listsFiltered.map((listItem) => {
        const articulo = listItem.articulo.toLowerCase().replace("  ", " ");

        const find = searchTags(formData!.tags!, articulo);

        if (find && listItem.productMaster === "") {
          const productList = {
            ...listItem,
            product_master_id: formData.product_master_id,
            productMaster: formData.descripcion,
            categoria: formData.categoria,
            subcategoria: formData.subcategoria,
          };
          listToUpdate.push(productList);
        }
      });
    }

    if (!formData.product_base) {
      lists.map((item) => {
        const articulo = item.articulo.toLowerCase().replace("  ", " ");

        const find = searchTags(formData!.tags!, articulo);

        if (find) {
          const productList = {
            ...item,
            product_master_id: formData.product_master_id,
            productMaster: formData.descripcion,
            categoria: formData.categoria,
            subcategoria: formData.subcategoria,
          };
          listToUpdate.push(productList);
        }
      });
    }

    updateItems(listToUpdate);
  };

  const onUpdateTags = (tags: string[]) => {
    setFormData({ ...formData, tags });
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

  const formProducto = () => {
    return (
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <Grid container spacing={3} sx={{ background: COLORS.white }}>
          <FormGrid size={{ xs: 5, md: 5 }}>
            <Typography>Articulo</Typography>
            <InputComponent
              id="descripcion"
              name="descripcion"
              required={true}
              value={formData.descripcion}
            />
          </FormGrid>

          <FormGrid size={{ xs: 3 }}>
            <Typography>Categoria</Typography>
            <AutocompleteCategorias
              value={formData.categoria}
              onSelect={(value: string) => {
                setFormData({
                  ...formData,
                  categoria: value,
                });
              }}
            />
          </FormGrid>
          <FormGrid size={{ xs: 4 }}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              alignContent={"center"}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Typography>Base</Typography>

                <Switch
                  id="product_base"
                  name="product_base"
                  checked={formData.product_base ? true : false}
                  onChange={(e) =>
                    setFormData({ ...formData, product_base: e.target.checked })
                  }
                />
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Typography>Favorito</Typography>

                <Switch
                  id="bookmark"
                  name="bookmark"
                  checked={formData.bookmark ? true : false}
                  onChange={(e) =>
                    setFormData({ ...formData, bookmark: e.target.checked })
                  }
                />
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                alignContent={"center"}
              >
                <Typography>Stock</Typography>

                <Switch
                  id="stock"
                  name="stock"
                  checked={formData.stock ? true : false}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.checked })
                  }
                />
              </Box>
            </Box>
          </FormGrid>
          <FormGrid size={{ xs: 6, md: 6 }}>
            <Typography>Subcategoria</Typography>

            <AutocompleteSubcategorias
              categoria={formData.categoria}
              subcategoria={formData.subcategoria}
              onSelect={(value: string) => {
                setFormData({
                  ...formData,
                  subcategoria: value,
                });
              }}
            />
          </FormGrid>
          <FormGrid size={{ xs: 6, md: 6 }}>
            <Typography>Tags</Typography>
            <TagsComponent tags={formData.tags} onChange={onUpdateTags} />
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
              <ButtonDelete
                onClick={() => handleDelete()}
                title="Eliminar articulo"
              />
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
            </Box>
          </FormGrid>
        </Grid>
      </form>
    );
  };

  return (
    <>
      <TittleHeader
        title={id === "new" ? "Agregar Articulo" : "Editar Articulo"}
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

export default FormProductComponent;
