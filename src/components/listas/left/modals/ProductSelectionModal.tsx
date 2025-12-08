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
import { Bookmark } from "@interfaces";

interface ProductSelectionModalProps {
  open: boolean;
  bookmarks: Bookmark[];
  onClose: () => void;
  onSelect: (value: string) => void;
}

interface GroupedProducts {
  [key: string]: Bookmark[];
}

const ProductSelectionModal: React.FC<ProductSelectionModalProps> = ({
  open,
  bookmarks,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts>({});
  const [expandedLetters, setExpandedLetters] = useState<string[]>([]);

  useEffect(() => {
    // Group products by first letter
    const grouped = bookmarks.reduce((acc: GroupedProducts, bookmark) => {
      const firstLetter = bookmark.descripcion?.charAt(0).toUpperCase() || "#";
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(bookmark);
      return acc;
    }, {});

    // Sort each group alphabetically
    Object.keys(grouped).forEach((letter) => {
      grouped[letter].sort((a, b) =>
        a.descripcion!.localeCompare(b.descripcion!)
      );
    });

    setGroupedProducts(grouped);
  }, [bookmarks]);

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

  const handleProductSelect = (productName: string) => {
    onSelect(productName);
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
            Articulos
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Search */}
        <Box sx={{ p: 2, borderBottom: `1px solid ${COLORS.grey_300}` }}>
          <TextField
            fullWidth
            placeholder="Buscar articulo..."
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
                text="No se encontraron articulos"
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
                    {filteredGroupedProducts[letter].map((product, index) => (
                      <React.Fragment key={product._id || index}>
                        <ListItem disablePadding>
                          <ListItemButton
                            onClick={() =>
                              handleProductSelect(product.descripcion!)
                            }
                            sx={{
                              "&:hover": {
                                backgroundColor: COLORS.grey_100,
                              },
                            }}
                          >
                            <ListItemText
                              primary={
                                <TypographyCommon
                                  text={capitalizeFirstLetter(
                                    product.descripcion!
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
            ))
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductSelectionModal;
