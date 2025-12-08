import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignUpTheme from "@theme/getSignUpTheme";
import { COLORS } from "@values/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import Loading from "@common/Loading";

import { ListItem } from "@interfaces/enum";
import { Provider } from "@interfaces";
import { PROVIDER_GETALL_SUCCESS } from "src/middleware/types/ProviderActionTypes";
import { GetAllProviders } from "src/middleware/actions/providersActions";

interface ButtonProps {
  value?: string;
  //
  onSelect: (value: string) => void;
}

const AutocompleteProveedores: React.FunctionComponent<ButtonProps> = (
  props
) => {
  const SignUpTheme = createTheme(getSignUpTheme("light"));
  const [data, setData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [valueSelect, setValueSelect] = useState<ListItem>();

  let first = true;

  const dispatch = useDispatch<AppDispatch>();

  const { providers, statusProvider } = useSelector(
    (state: RootState) => state.providers
  );

  useEffect(() => {
    if (first) {
      if (providers.length > 0) loadData(providers);
      else {
        try {
          dispatch(GetAllProviders());
        } catch (error) {
          console.error("error", error);
        }
      }
      first = false;
    }
  }, [dispatch]);

  useEffect(() => {
    if (statusProvider === PROVIDER_GETALL_SUCCESS) {
      loadData(providers);
    }
  }, [providers]);

  //

  const loadData = (providers: Provider[]) => {
    let providersList: ListItem[] = providers.map((provider: Provider) => ({
      id: provider._id ? Number(provider._id) : 0,
      name: provider.razon_social.toLowerCase(),
    }));
    providersList = providersList.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    setData(providersList);
    setLoading(false);
  };

  const filterHandler = (value: ListItem) => {
    if (value !== null) {
      props.onSelect(value.name);
      setValueSelect(value);
    } else {
      setValueSelect({ id: 0, name: "" });
    }
  };

  useEffect(() => {
    if (props.value !== undefined) {
      const value = data.find((item) => item.name === props.value);
      setValueSelect(value!);
    }
  }, [props.value]);

  return (
    <ThemeProvider theme={SignUpTheme}>
      {loading && <Loading />}
      {!loading && data.length === 0 && <>No hay proveedores</>}
      {!loading && data.length > 0 && (
        <Autocomplete
          disablePortal
          options={data}
          sx={{ background: COLORS.grey_light, width: "100%" }}
          getOptionLabel={(option: ListItem) => option.name}
          renderInput={(params) => <TextField {...params} />}
          size="small"
          onChange={(event, value, reason) => {
            // Detecta si se hizo clear (se presionó la X)
            if (reason === "clear") {
              props.onSelect("");
              setValueSelect({ id: 0, name: "" });
            } else if (value) {
              filterHandler(value);
            }
          }}
          value={
            valueSelect
              ? valueSelect
              : {
                  id: 0,
                  name: "",
                }
          }
        />
      )}
    </ThemeProvider>
  );
};

export default AutocompleteProveedores;
