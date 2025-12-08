import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "../theme/getSignUpTheme";
import { COLORS } from "@values/colors";
import dayjs from "dayjs";

interface ButtonProps {
  value?: string;
  //
  onSelect: (value: string) => void;
}

type ListItem = {
  id: number;
  name: string;
};

const AutocompleteDias: React.FunctionComponent<ButtonProps> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));
  const [list, setList] = useState<ListItem[]>();

  useEffect(() => {
    const dates: ListItem[] = [];
    for (let i = 0; i < 40; i++) {
      dates.push({
        id: i,
        name: dayjs().subtract(i, "day").format("YYYY-MM-DD"),
      });
    }
    setList(dates);
  }, []);

  const [valueSelect, setValueSelect] = useState<ListItem>({
    id: 0,
    name: "",
  });

  const filterHandler = (value: ListItem) => {
    setValueSelect(value);
    props.onSelect(value.name);
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Autocomplete
        disablePortal
        options={list ? list : []}
        sx={{ background: COLORS.white, marginRight: "10px", width: 200 }}
        getOptionLabel={(option: ListItem) => option.name}
        renderInput={(params) => <TextField {...params} label="Fecha" />}
        size="small"
        onChange={(event, value) => filterHandler(value!)}
        value={
          valueSelect
            ? valueSelect
            : {
                id: 0,
                name: "",
              }
        }
      />
    </ThemeProvider>
  );
};

export default AutocompleteDias;
