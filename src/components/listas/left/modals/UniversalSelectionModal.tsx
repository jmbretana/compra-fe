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

// Tipos base para los items que puede manejar el modal
type ModalItemType = Bookmark | { descripcion: string } | string;

interface UniversalSelectionModalProps {
  open: boolean;
  items: ModalItemType[];
  title: string;
  searchPlaceholder: string;
  emptyMessage: string;
  onClose: () => void;
  onSelect: (value: string) => void;
}

interface GroupedItems {
  [key: string]: ModalItemType[];
}

// Función helper para obtener la descripción de un item
const getItemDescription = (item: ModalItemType): string => {
  if (typeof item === "string") {
    return item;
  }
  if ("descripcion" in item && item.descripcion) {
    return item.descripcion;
  }
  return String(item);
};

// Función helper para obtener el ID único de un item
const getItemId = (item: ModalItemType, index: number): string => {
  if (typeof item === "string") {
    return `${item}-${index}`;
  }
  if ("_id" in item && item._id) {
    return item._id;
  }
  if ("descripcion" in item) {
    return `${item.descripcion}-${index}`;
  }
  return `item-${index}`;
};

const UniversalSelectionModal: React.FC<UniversalSelectionModalProps> = ({
  open,
  items,
  title,
  searchPlaceholder,
  emptyMessage,
  onClose,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupedItems, setGroupedItems] = useState<GroupedItems>({});
  const [expandedLetters, setExpandedLetters] = useState<string[]>([]);

  useEffect(() => {
    // Group items by first letter
    const grouped = items.reduce((acc: GroupedItems, item) => {
      const description = getItemDescription(item);
      const firstLetter = description?.charAt(0).toUpperCase() || "#";
      
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(item);
      return acc;
    }, {});

    // Sort each group alphabetically
    Object.keys(grouped).forEach((letter) => {
      grouped[letter].sort((a, b) => {
        const descA = getItemDescription(a);
        const descB = getItemDescription(b);
        return descA.localeCompare(descB);
      });
    });

    setGroupedItems(grouped);
  }, [items]);

  const filteredGroupedItems = React.useMemo(() => {
    if (!searchTerm) return groupedItems;

    const filtered: GroupedItems = {};
    Object.keys(groupedItems).forEach((letter) => {
      const filteredItems = groupedItems[letter].filter((item) => {
        const description = getItemDescription(item);
        return description?.toLowerCase().includes(searchTerm.toLowerCase());
      });
      if (filteredItems.length > 0) {
        filtered[letter] = filteredItems;
      }
    });
    return filtered;
  }, [groupedItems, searchTerm]);

  const handleItemSelect = (itemDescription: string) => {
    onSelect(itemDescription);
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

  const handleClose = () => {
    setSearchTerm("");
    setExpandedLetters([]);
    onClose();
  };

  const sortedLetters = Object.keys(filteredGroupedItems).sort();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="universal-selection-modal"
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
            {title}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Search */}
        <Box sx={{ p: 2, borderBottom: `1px solid ${COLORS.grey_300}` }}>
          <TextField
            fullWidth
            placeholder={searchPlaceholder}
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: "grey.500" }} />,
            }}
          />
        </Box>

        {/* Items List */}
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
                text={emptyMessage}
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
                      ({filteredGroupedItems[letter].length})
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <List dense>
                    {filteredGroupedItems[letter].map((item, index) => {
                      const description = getItemDescription(item);
                      const itemId = getItemId(item, index);
                      
                      return (
                        <React.Fragment key={itemId}>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => handleItemSelect(description)}
                              sx={{
                                "&:hover": {
                                  backgroundColor: COLORS.grey_100,
                                },
                              }}
                            >
                              <ListItemText
                                primary={
                                  <TypographyCommon
                                    text={capitalizeFirstLetter(description)}
                                    variant="subtitle2"
                                  />
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                          {index < filteredGroupedItems[letter].length - 1 && (
                            <Divider />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>

        {/* Footer with count */}
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${COLORS.grey_300}`,
            textAlign: "center",
          }}
        >
          <TypographyCommon
            text={`${items.length} elementos disponibles`}
            variant="subtitle2"
            light={true}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default UniversalSelectionModal;
