import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

import { TypographyCommon } from "@common";
import { COLORS } from "@values/colors";

import { capitalizeFirstLetter } from "@utils/utils";
import UniversalSelectionModal from "./modals/UniversalSelectionModal";

interface ButtonProps {
  brands: string[];
  //
  onSelect: (value: string) => void;
}

const ListasLeftBrands: React.FunctionComponent<ButtonProps> = (props) => {
  const [data, setData] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [displayedBookmarks, setDisplayedBookmarks] = useState<string[]>([]);

  const MAX_DISPLAYED_ITEMS = 5;

  useEffect(() => {
    const brand = props.brands.filter(
      (item) => item !== "" && item !== undefined && item !== "null"
    );

    // set data
    setData(brand);
    // Set only first MAX_DISPLAYED_ITEMS for initial display
    setDisplayedBookmarks(brand.slice(0, MAX_DISPLAYED_ITEMS));
  }, [props.brands]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleProductSelect = (productName: string) => {
    props.onSelect(productName);
  };

  return (
    <Box>
      <Box pb={1}>
        <TypographyCommon text="Marcas" variant="subtitle2"></TypographyCommon>
      </Box>
      <Box>
        {displayedBookmarks.map((item) => (
          <Box
            key={item.toLowerCase()}
            onClick={() => props.onSelect(item.toLowerCase())}
            // estilo de hover
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: COLORS.blue,
              },
            }}
          >
            <TypographyCommon
              variant="subtitle2"
              text={capitalizeFirstLetter(item)}
              light={true}
            />
          </Box>
        ))}

        {data.length > MAX_DISPLAYED_ITEMS && (
          <Button
            size="small"
            variant="text"
            onClick={handleOpenModal}
            sx={{
              textTransform: "none",
              color: COLORS.blue,
              fontSize: "0.875rem",
              fontWeight: "normal",
              padding: "2px 0px",
              minWidth: "auto",
              "&:hover": {
                backgroundColor: "transparent",
                color: COLORS.blue_800,
                textDecoration: "none",
              },
            }}
          >
            Mostrar más
          </Button>
        )}
      </Box>

      <UniversalSelectionModal
        open={modalOpen}
        items={data}
        title="Marcas"
        searchPlaceholder="Buscar marca..."
        emptyMessage="No se encontraron marcas"
        onClose={handleCloseModal}
        onSelect={handleProductSelect}
      />
    </Box>
  );
};

export default ListasLeftBrands;
