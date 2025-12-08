import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { TypographyCommon } from "@common";
import { COLORS } from "@values/colors";
import { capitalizeFirstLetter } from "@utils/utils";

interface ProductUnique {
  descripcion: string;
}

interface UniqueProductSelectionModalProps {
  open: boolean;
  products: ProductUnique[];
  onClose: () => void;
  onSelect: (value: string) => void;
}

interface GroupedProducts {
  [key: string]: ProductUnique[];
}

const UniqueProductSelectionModal: React.FC<
  UniqueProductSelectionModalProps
> = ({ open, products, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts>({});
  const [expandedLetters, setExpandedLetters] = useState<string[]>([]);

  useEffect(() => {
    // Group products by first letter
    const grouped = products.reduce((acc: GroupedProducts, product) => {
      const firstLetter = product.descripcion?.charAt(0).toUpperCase() || "#";
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(product);
      return acc;
    }, {});

    // Sort each group alphabetically
    Object.keys(grouped).forEach((letter) => {
      grouped[letter].sort((a, b) =>
        a.descripcion!.localeCompare(b.descripcion!)
      );
    });

    setGroupedProducts(grouped);
  }, [products]);

  const filteredGroupedProducts = React.useMemo(() => {
    if (!searchTerm) return groupedProducts;

    const filtered: GroupedProducts = {};
    Object.keys(groupedProducts).forEach((letter) => {
      const filteredItems = groupedProducts[letter].filter((item) =>
        item.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredItems.length > 0) {
        filtered[letter] = filteredItems;
      }
    });
    return filtered;
  }, [groupedProducts, searchTerm]);

  const handleLetterToggle = (letter: string) => {
    setExpandedLetters((prev) =>
      prev.includes(letter)
        ? prev.filter((l) => l !== letter)
        : [...prev, letter]
    );
  };

  const handleProductClick = (productName: string) => {
    onSelect(productName);
    onClose();
  };

  const handleClose = () => {
    setSearchTerm("");
    setExpandedLetters([]);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="product-selection-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: "60%" },
          maxWidth: "600px",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          borderRadius: "8px",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" component="h2">
            Seleccionar Artículo
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Search */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <TextField
            fullWidth
            placeholder="Buscar artículo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: "grey.400" }} />,
            }}
            size="small"
          />
        </Box>

        {/* Products List */}
        <Box sx={{ flex: 1, overflow: "auto", p: 1 }}>
          {Object.keys(filteredGroupedProducts)
            .sort()
            .map((letter) => (
              <Accordion
                key={letter}
                expanded={expandedLetters.includes(letter)}
                onChange={() => handleLetterToggle(letter)}
                sx={{ boxShadow: "none", "&:before": { display: "none" } }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: COLORS.grey_100,
                    minHeight: "40px",
                    "& .MuiAccordionSummary-content": {
                      margin: "8px 0",
                    },
                  }}
                >
                  <TypographyCommon
                    text={`${letter} (${filteredGroupedProducts[letter].length})`}
                    variant="subtitle2"
                  />
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                  <List dense>
                    {filteredGroupedProducts[letter].map((product, index) => (
                      <React.Fragment key={product.descripcion}>
                        <ListItem disablePadding>
                          <ListItemButton
                            onClick={() =>
                              handleProductClick(product.descripcion)
                            }
                            sx={{
                              py: 0.5,
                              "&:hover": {
                                backgroundColor: COLORS.blue_100,
                              },
                            }}
                          >
                            <ListItemText
                              primary={
                                <TypographyCommon
                                  text={capitalizeFirstLetter(
                                    product.descripcion
                                  )}
                                  variant="subtitle2"
                                />
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                        {index < filteredGroupedProducts[letter].length - 1 && (
                          <Divider />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
        </Box>

        {/* Footer with count */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <TypographyCommon
            text={`${products.length} artículos disponibles`}
            variant="subtitle2"
            light={true}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default UniqueProductSelectionModal;
