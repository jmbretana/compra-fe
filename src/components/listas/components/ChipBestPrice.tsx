import React from "react";
import { List } from "@interfaces";
import { Box } from "@mui/material";
import { calculatePricePerQuantity } from "../functions/functionsList";

interface ChipBestPriceProps {
  item: List;
  list: List[];
}

const ChipBestPrice: React.FC<ChipBestPriceProps> = ({ item, list }) => {
  const filteredList = list.filter(
    (listItem) =>
      listItem.productMaster?.toLowerCase() ===
        item.productMaster!.toLowerCase() && listItem.unidad !== ""
  );

  // Sort items by price to find best and second best
  const sortedByPrice = filteredList
    .map((listItem) => ({
      ...listItem,
      pricePerQuantity: calculatePricePerQuantity(listItem),
    }))
    .sort((a, b) => a.pricePerQuantity - b.pricePerQuantity);

  const bestPriceItem = sortedByPrice[0];
  const secondBestPriceItem = sortedByPrice[1];

  // Check if the current item is the one with the best price
  const isBestPrice = item._id === bestPriceItem._id;
  const isSecondBestPrice =
    secondBestPriceItem && item._id === secondBestPriceItem._id;

  // Calculate price difference percentage between best and second best
  const hasPriceWarning = () => {
    if (!bestPriceItem || !secondBestPriceItem) return false;

    const bestPrice = bestPriceItem.pricePerQuantity;
    const secondBestPrice = secondBestPriceItem.pricePerQuantity;

    // Avoid division by zero and ensure prices are valid
    if (bestPrice <= 0 || secondBestPrice <= 0) return false;

    // Calculate percentage difference: (second_best - best) / best * 100
    const percentageDiff = ((secondBestPrice - bestPrice) / bestPrice) * 100;

    // Return true if difference is more than 20%
    return percentageDiff > 20;
  };

  //const showWarning = isBestPrice && hasPriceWarning();
  const showWarning = false; // Temporarily disable warning for testing

  // Generate warning tooltip message
  const getWarningTooltip = () => {
    if (!showWarning || !bestPriceItem || !secondBestPriceItem)
      return undefined;

    const bestPrice = bestPriceItem.pricePerQuantity;
    const secondBestPrice = secondBestPriceItem.pricePerQuantity;
    const percentageDiff = ((secondBestPrice - bestPrice) / bestPrice) * 100;

    return `Posible error de etiquetado - diferencia de precio: ${percentageDiff.toFixed(
      1
    )}% sobre el segundo mejor precio`;
  };

  if (!isBestPrice && !isSecondBestPrice) {
    return null;
  }

  return (
    <Box display="flex" gap={1}>
      {showWarning && (
        <Box
          style={{
            backgroundColor: "#f44336",
            color: "white",
            padding: "4px 14px",
            borderRadius: "20px",

            textAlign: "center",
            fontSize: "0.8rem",
            position: "relative",
          }}
          title={getWarningTooltip()}
        >
          ⚠️
        </Box>
      )}

      {isBestPrice && (
        <Box
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "4px 14px",
            borderRadius: "20px",
            width: "120px",
            textAlign: "center",
            fontSize: "0.8rem",
            position: "relative",
          }}
        >
          Mejor Precio
        </Box>
      )}
      {!isBestPrice && isSecondBestPrice && (
        <Box
          style={{
            backgroundColor: "#ff9800",
            color: "white",
            padding: "4px 14px",
            borderRadius: "20px",
            width: "120px",
            textAlign: "center",
            fontSize: "0.8rem",
            position: "relative",
          }}
        >
          2do Mejor
        </Box>
      )}
    </Box>
  );
};

export default ChipBestPrice;
