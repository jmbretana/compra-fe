import React from "react";
import { Box, Typography } from "@mui/material";
import { COLORS } from "@values/colors";
import { List } from "@interfaces";
//
import ImportStep2Table from "./ImportStep2Table";
import ImportCounterResume from "./ImportCounterResume";

interface ImportStep2Props {
  error: boolean;
  productListNew: List[];
  productListExisting: List[] | undefined;
}

const ImportStep2: React.FunctionComponent<ImportStep2Props> = (props) => {
  const productListNew: List[] = props.productListNew;
  const productListExisting: List[] | undefined = props.productListExisting;

  //

  return (
    <Box sx={{ border: "1px solid #E0E0E0", borderRadius: "20px", padding: 2 }}>
      <Typography
        variant="h4"
        sx={{
          color: COLORS.grey_dark,
        }}
      >
        Articulos Nuevos
      </Typography>
      <ImportStep2Table data={productListNew} />

      {productListExisting && (
        <>
          <Typography
            variant="h4"
            sx={{
              color: COLORS.grey_dark,
            }}
          >
            Articulos Existentes
          </Typography>
          <ImportStep2Table data={productListExisting} update={true} />
        </>
      )}

      <ImportCounterResume
        productListNew={productListNew}
        productListExisting={productListExisting}
        error={props.error}
      />
    </Box>
  );
};

export default ImportStep2;
