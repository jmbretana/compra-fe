import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "../theme/getSignUpTheme";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { GetProvinces } from "@actions/geoActions";

import { Province } from "@interfaces";

interface AutocompleProvinceProps {
  value?: string;
  //
  onSelect: (value?: Province) => void;
}

const AutocompleteProvincia: React.FunctionComponent<
  AutocompleProvinceProps
> = (props) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));

  const dispatch = useDispatch<AppDispatch>();
  const { provinces } = useSelector((state: RootState) => state.geo);
  const [provinceSelected, setProvinceSelect] = useState<Province>();

  let first = true;

  useEffect(() => {
    if (first) {
      dispatch(GetProvinces());
      first = false;
    }
  }, []);

  useEffect(() => {
    if (provinces !== undefined && props.value !== undefined) {
      const value = provinces.find((item) => item.nombre === props.value);
      setProvinceSelect(value!);
    }
  }, [provinces]);

  useEffect(() => {
    props.onSelect(provinceSelected);
  }, [provinceSelected]);

  return (
    <ThemeProvider theme={SignUpTheme}>
      <Autocomplete
        fullWidth
        disablePortal
        options={provinces ? provinces : []}
        getOptionLabel={(option: any) => option.nombre || ""}
        renderInput={(params) => <TextField {...params} label="Provincia" />}
        size="small"
        value={provinceSelected ? provinceSelected : {}}
        //
        onChange={(event, value) =>
          setProvinceSelect(value ? value : undefined)
        }
      />
    </ThemeProvider>
  );
};

export default AutocompleteProvincia;
