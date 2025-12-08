import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { TypographyCommon } from "@common";
import { COLORS } from "@values/colors";

import { List } from "@interfaces";
import { capitalizeFirstLetter } from "@utils/utils";
import UniversalSelectionModal from "./modals/UniversalSelectionModal";

interface ButtonProps {
  data: List[]; // Lista de datos para mostrar los articulos únicos
  provider?: string;
  //
  onSelect: (value: string) => void;
}

interface ProductUnique {
  descripcion: string;
}

const LeftUniqueProducts: React.FunctionComponent<ButtonProps> = (props) => {
  const [data, setData] = useState<ProductUnique[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<ProductUnique[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const MAX_DISPLAYED_ITEMS = 10;

  useEffect(() => {
    const dataArray: ProductUnique[] = [];
    // A partir del props.data armar un listado de product master unicos
    const products = props.provider
      ? props.data.filter(
          (p) => p.proveedor === props.provider && p.productMaster !== ""
        )
      : props.data.filter((p) => p.productMaster !== "");

    products.forEach((item) => {
      if (item.productMaster) {
        // Verificar si el articulo ya existe en data
        if (!dataArray.some((d) => d.descripcion === item.productMaster)) {
          dataArray.push({
            descripcion: item.productMaster,
          });
        }
      }
    });

    const sortedData = dataArray.sort((a, b) =>
      a.descripcion.localeCompare(b.descripcion)
    );
    setData(sortedData);
    // Set only first MAX_DISPLAYED_ITEMS for initial display
    setDisplayedProducts(sortedData.slice(0, MAX_DISPLAYED_ITEMS));

    // Ordenar los articulos por nombre
  }, [props.data]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleProductSelect = (productName: string) => {
    props.onSelect(productName);
    setModalOpen(false); // Cerrar modal después de seleccionar
  };

  return (
    <Box>
      <Box pb={1}>
        <TypographyCommon
          text="Articulos"
          variant="subtitle2"
        ></TypographyCommon>
      </Box>
      <Box>
        {displayedProducts.map((item) => (
          <Box
            key={item.descripcion}
            onClick={() => props.onSelect(item.descripcion)}
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
              text={capitalizeFirstLetter(item.descripcion)}
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
        title="Artículos"
        searchPlaceholder="Buscar artículo..."
        emptyMessage="No se encontraron artículos"
        onClose={handleCloseModal}
        onSelect={handleProductSelect}
      />
    </Box>
  );
};

export default LeftUniqueProducts;
