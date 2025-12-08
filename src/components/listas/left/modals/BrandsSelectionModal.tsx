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

interface ProductSelectionModalProps {
  open: boolean;
  brands: string[];
  onClose: () => void;
  onSelect: (value: string) => void;
}

interface GroupedProducts {
  [key: string]: string[];
}

const BrandsSelectionModal: React.FC<ProductSelectionModalProps> = ({
  open,
  brands,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts>({});
  const [expandedLetters, setExpandedLetters] = useState<string[]>([]);

  useEffect(() => {
    const grouped = brands.reduce((acc: GroupedProducts, brand) => {
      const firstLetter = brand?.charAt(0).toUpperCase() || "#";
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(brand);
      return acc;
    }, {});

    // Sort each group alphabetically
    Object.keys(grouped).forEach((letter) => {
      grouped[letter].sort((a, b) => a!.localeCompare(b!));
    });

    setGroupedProducts(grouped);
  }, [brands]);

  const filteredGroupedProducts = React.useMemo(() => {
    if (!searchTerm) return groupedProducts;

    const filtered: GroupedProducts = {};
    Object.keys(groupedProducts).forEach((letter) => {
      const filteredItems = groupedProducts[letter].filter((item) =>
        item?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredItems.length > 0) {
        filtered[letter] = filteredItems;
      }
    });

    return filtered;
  }, [groupedProducts, searchTerm]);

  const handleProductSelect = (brandName: string) => {
    onSelect(brandName);
    onClose();
    setSearchTerm("");
  };

  const handleAccordionChange = (letter: string) => {
    setExpandedLetters((prev) =>
      prev.includes(letter)
        ? prev.filter((l) => l !== letter)
        : [...prev, letter]
    );
  };

  const sortedLetters = Object.keys(filteredGroupedProducts).sort();

  return (
    <Modal
      open={open}
      onClose={onClose}
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
          maxHeight: "80vh",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 0,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: `1px solid ${COLORS.grey_300}`,
          }}
        >
          <Typography variant="h6" component="h2">
            Marcas
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Search */}
        <Box sx={{ p: 2, borderBottom: `1px solid ${COLORS.grey_300}` }}>
          <TextField
            fullWidth
            placeholder="Buscar marca..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: "grey.500" }} />,
            }}
          />
        </Box>

        {/* Product List */}
        <Box
          sx={{
            maxHeight: "60vh",
            overflow: "auto",
            p: 1,
          }}
        >
          {sortedLetters.length === 0 ? (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <TypographyCommon
                text="No se encontraron marcas"
                variant="subtitle2"
                light={true}
              />
            </Box>
          ) : (
            sortedLetters.map((letter) => (
              <Accordion
                key={letter}
                expanded={expandedLetters.includes(letter)}
                onChange={() => handleAccordionChange(letter)}
                sx={{ boxShadow: "none", "&:before": { display: "none" } }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    minHeight: "48px",
                    "&.Mui-expanded": { minHeight: "48px" },
                    backgroundColor: COLORS.grey_100,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      mr: 2,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {letter}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({filteredGroupedProducts[letter].length})
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <List dense>
                    {filteredGroupedProducts[letter].map((brand, index) => (
                      <React.Fragment key={brand || index}>
                        <ListItem disablePadding>
                          <ListItemButton
                            onClick={() => handleProductSelect(brand)}
                            sx={{
                              "&:hover": {
                                backgroundColor: COLORS.grey_100,
                              },
                            }}
                          >
                            <ListItemText
                              primary={
                                <TypographyCommon
                                  text={capitalizeFirstLetter(brand!)}
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
            ))
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default BrandsSelectionModal;
