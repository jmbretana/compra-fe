import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@theme/getSignUpTheme";
import { COLORS } from "@values/colors";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
interface ButtonProps {
  value?: string;
  //
  onSelect: (value: string) => void;
}

const list: ListItem[] = [
  {
    id: 1,
    name: "Menor precio",
    value: "asc_price",
    icon: <ArrowDownwardIcon sx={{ color: COLORS.red }} />,
  },
  {
    id: 3,
    name: "Menor cantidad",
    value: "asc_quantity",
    icon: <ArrowDownwardIcon sx={{ color: COLORS.red }} />,
  },
  {
    id: 2,
    name: "Mayor precio",
    value: "desc_price",
    icon: <ArrowUpwardIcon sx={{ color: COLORS.green_dark }} />,
  },
  {
    id: 4,
    name: "Mayor cantidad",
    value: "desc_quantity",
    icon: <ArrowUpwardIcon sx={{ color: COLORS.green_dark }} />,
  },
];

type ListItem = {
  id: number;
  name: string;
  value: string;
  icon?: React.ReactNode;
};

const AutocompleteOrderList: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const [valueSelect, setValueSelect] = useState<ListItem>({
    id: 1,
    name: "Menor precio",
    value: "asc_price",
  });

  const selectHandler = (value: ListItem) => {
    props.onSelect(value.value);
    setValueSelect(value);
  };

  useEffect(() => {
    if (props.value !== undefined) {
      const value = list.find((item) => item.name === props.value);
      setValueSelect(value!);
    }
  }, [props.value]);

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Autocomplete
        disablePortal
        options={list}
        sx={{ background: COLORS.grey_light, width: 190 }}
        getOptionLabel={(option: ListItem) => option.name}
        renderInput={(params) => <TextField {...params} label="" />}
        size="small"
        onChange={(event, value) => selectHandler(value!)}
        value={
          valueSelect
            ? valueSelect
            : {
                id: 1,
                name: "Menor ",
                value: "asc_price",
              }
        }
        renderOption={(props, option, state) => (
          <li
            {...props}
            style={{
              padding: "7px",
              borderBottom:
                state.index === list.length - 1
                  ? "none"
                  : `1px solid ${COLORS.grey_400}`,
              gap: "7px",
            }}
          >
            {option.icon}
            <span style={{ fontWeight: 500 }}>{option.name}</span>
          </li>
        )}
      />
    </ThemeProvider>
  );
};

export default AutocompleteOrderList;
