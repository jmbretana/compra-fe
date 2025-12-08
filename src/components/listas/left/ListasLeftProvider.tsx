import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { TypographyCommon } from "@common";
import { COLORS } from "@values/colors";
import { Provider } from "@interfaces";
import { capitalizeFirstLetter } from "@utils/utils";
import { RootState } from "src/middleware/store/store";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "src/middleware/store/store";
import { GetAllProviders } from "@actions/providersActions";
import { PROVIDER_GETALL_SUCCESS } from "@ProviderActionTypes";

interface ButtonProps {
  providers: Provider[];
  //
  onSelect: (value: string) => void;
}

const LeftProvider: React.FunctionComponent<ButtonProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { providers, statusProvider } = useSelector(
    (state: RootState) => state.providers
  );

  useEffect(() => {
    if (providers && providers.length > 0) {
      // Ordenar los proveedores alfabéticamente por razon_social
      providers.sort((a, b) => a.razon_social.localeCompare(b.razon_social));
    } else {
      dispatch(GetAllProviders());
    }
  }, []);

  useEffect(() => {
    if (statusProvider === PROVIDER_GETALL_SUCCESS) {
      providers.sort((a, b) => a.razon_social.localeCompare(b.razon_social));
    }
  }, [statusProvider]);

  return (
    <Box>
      <Box pb={1}>
        <TypographyCommon
          text="Proveedor"
          variant="subtitle2"
        ></TypographyCommon>
      </Box>
      <Box>
        {providers.map((item: Provider) => (
          <Box
            key={item._id}
            onClick={() => props.onSelect(item.razon_social)}
            // estilo de hover
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: COLORS.blue,
              },
            }}
          >
            <TypographyCommon
              variant="subtitle2"
              text={capitalizeFirstLetter(item.razon_social)}
              light={true}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LeftProvider;
