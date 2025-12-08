import React from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";
import { Product } from "@interfaces";

import { UpdateBookmark } from "@actions/bookmarksActions";

import { useDispatch } from "react-redux";
import { AppDispatch } from "src/middleware/store/store";
import { COLORS } from "@values/colors";

interface ButtonProps {
  product: Product;
  //
  onUpdate: (product: Product) => void;
}

const ButtonIconBookmark: React.FunctionComponent<ButtonProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [product, setProduct] = React.useState<Product>(props.product);

  const handlerBookmark = () => {
    const bookmarkUpdate = !props.product.bookmark;
    const productSelected = { ...props.product, bookmark: bookmarkUpdate };
    setProduct(productSelected);

    const formBookmark = {
      product_master_id: props.product.product_master_id,
      descripcion: props.product.descripcion,
      product: props.product,
    };

    try {
      dispatch(UpdateBookmark(formBookmark));
      props.onUpdate(productSelected);
    } catch (error) {
      console.error("Error al agregar a favoritos", error);
      dispatch(UpdateBookmark(formBookmark));
      props.onUpdate(productSelected);
    }
  };

  return (
    <IconButton
      color="secondary"
      aria-label="agregar"
      onClick={handlerBookmark}
      sx={{
        color: COLORS.grey,
      }}
    >
      {product.bookmark === true ? <StarIcon /> : <StarOutlineIcon />}
    </IconButton>
  );
};

export default ButtonIconBookmark;
