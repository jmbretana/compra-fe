import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TypographyCommon } from "@common";

import { Navigation, SearchItem } from "@interfaces";
import { capitalizeFirstLetter } from "@utils/utils";
import { COLORS } from "@values/colors";

interface ButtonProps {
  navigation: Navigation;
  //
  onRemoveFilter: (value: SearchItem) => void;
}

const LeftFilters: React.FunctionComponent<ButtonProps> = (props) => {
  const [navigation, setNavigation] = useState<SearchItem[]>([]);

  useEffect(() => {
    const array: SearchItem[] = [];

    if (props.navigation.brand && props.navigation.brand !== "") {
      array.push({ type: "brand", name: props.navigation.brand });
    } else {
      const index = array.findIndex((item) => item.type === "brand");
      if (index !== -1) {
        array.splice(index, 1);
      }
    }

    if (props.navigation.provider && props.navigation.provider !== "") {
      array.push({ type: "provider", name: props.navigation.provider });
    } else {
      const index = array.findIndex((item) => item.type === "provider");
      if (index !== -1) {
        array.splice(index, 1);
      }
    }

    if (
      props.navigation.productMaster &&
      props.navigation.productMaster !== ""
    ) {
      array.push({
        type: "productMaster",
        name: props.navigation.productMaster,
      });
    } else {
      const index = array.findIndex((item) => item.type === "product");
      if (index !== -1) {
        array.splice(index, 1);
      }
    }

    if (props.navigation.amount) {
      array.push({ type: "amount", name: props.navigation.amount.medida });
    } else {
      const index = array.findIndex((item) => item.type === "amount");
      if (index !== -1) {
        array.splice(index, 1);
      }
    }

    setNavigation(array);
  }, [
    props.navigation.brand,
    props.navigation.provider,
    props.navigation.productMaster,
    props.navigation.amount,
  ]);

  const handleRemoveFilter = (value: SearchItem) => {
    const newNavigation = navigation.filter((item) => item.name !== value.name);
    setNavigation(newNavigation);
    props.onRemoveFilter(value);
  };

  return (
    <Box mb={2}>
      <Box pb={1}>
        <TypographyCommon text="Filtros" variant="subtitle2" />
      </Box>
      <Box gap={0.5} display="flex" flexDirection="column">
        {navigation.map(
          (item, index) =>
            item.name && (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  padding: "1px 5px",
                  backgroundColor: COLORS.white,
                }}
              >
                <TypographyCommon
                  text={capitalizeFirstLetter(item.name)}
                  variant="subtitle2"
                  light={true}
                  sx={{
                    color: COLORS.grey_600 + "!important",
                    fontSize: "0.8em",
                  }}
                />
                <Box
                  onClick={() => handleRemoveFilter(item)}
                  sx={{
                    cursor: "pointer",
                    padding: "3px 9px",
                    borderRadius: "50%",
                    transition: "background-color .1s ease-out",
                    "&:hover": {
                      backgroundColor: COLORS.grey_300,
                    },
                  }}
                >
                  <TypographyCommon
                    light={true}
                    text="x"
                    variant="subtitle2"
                    sx={{
                      color: COLORS.grey_500 + "!important",
                    }}
                  />
                </Box>
              </Box>
            )
        )}
      </Box>
    </Box>
  );
};

export default LeftFilters;
