import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Provider } from "@interfaces";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import { COLORS } from "@values/colors";
import SaveIcon from "@mui/icons-material/Save";
import {
  GetAllProviders,
  CreateProvider,
  UpdateProvider,
} from "@actions/providersActions";
import { AppDispatch, RootState } from "src/middleware/store/store";
import {
  BoxCardWhite,
  ButtonComponent,
  InputComponent,
  InputPhone,
} from "@common";
import {
  PROVIDER_CREATE_SUCCESS,
  PROVIDER_UPDATE_SUCCESS,
} from "@ProviderActionTypes";
import {
  AutocompleteTipoPrecio,
  AutocompleteTipoIVA,
} from "@common/autocomplete";
//

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

interface ProviderFormProps {
  edit: boolean;
  provider: Provider | undefined;
  //
}

const ProviderForm: React.FunctionComponent<ProviderFormProps> = ({
  edit,
  provider,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<Provider>({
    razon_social: "",
    email: "",
    condicion_iva: "",
    tipo_precio: "",
  });

  const { statusProvider } = useSelector((state: RootState) => state.providers);

  useEffect(() => {
    if (edit && provider) {
      setFormData({
        _id: (provider as Provider)._id,
        razon_social: (provider as Provider).razon_social,
        email: (provider as Provider).email,
        telefono: (provider as Provider).telefono,
        condicion_iva: (provider as Provider).condicion_iva || "",
        tipo_precio: (provider as Provider).tipo_precio || "",
      });
    }
  }, [provider]);

  useEffect(() => {
    if (statusProvider === PROVIDER_CREATE_SUCCESS && provider) {
      dispatch(GetAllProviders());
      navigate("/providers");
    }

    if (statusProvider === PROVIDER_UPDATE_SUCCESS && provider) {
      dispatch(GetAllProviders());
      navigate("/providers");
    }
  }, [statusProvider]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (edit) dispatch(UpdateProvider(formData));
    else dispatch(CreateProvider(formData));
  };

  const handleChange = (e: any) => {
    switch (e.target.name) {
      case "razon_social":
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        break;
      default:
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        break;
    }
  };

  const handleCancel = () => {
    navigate("/providers");
  };

  return (
    <BoxCardWhite>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <Grid container spacing={3} sx={{ background: COLORS.white }}>
          <FormGrid size={{ xs: 6, md: 6 }}>
            <Typography>Razon social</Typography>
            <InputComponent
              id="razon_social"
              name="razon_social"
              required={true}
              value={formData.razon_social}
            />
          </FormGrid>

          <FormGrid size={{ xs: 6, md: 6 }}>
            <Typography>Teléfono</Typography>
            <InputPhone
              id="telefono"
              name="telefono"
              required={false}
              value={formData.telefono}
            />
          </FormGrid>

          <FormGrid size={{ xs: 3 }}>
            <Typography>Condición Precios</Typography>
            <AutocompleteTipoIVA
              value={formData.condicion_iva}
              onSelect={(value) =>
                setFormData({ ...formData, condicion_iva: value })
              }
            />
          </FormGrid>

          <FormGrid size={{ xs: 3 }}>
            <Typography>Tipo precio</Typography>
            <AutocompleteTipoPrecio
              value={formData.tipo_precio}
              onSelect={(value) =>
                setFormData({ ...formData, tipo_precio: value })
              }
            />
          </FormGrid>

          <FormGrid size={{ xs: 6, md: 6 }}>
            <Typography>Email</Typography>
            <InputComponent
              id="email"
              name="email"
              required={false}
              value={formData.email}
            />
          </FormGrid>
          <FormGrid size={{ xs: 12 }}>
            <Box justifyContent={"end"} display={"flex"}>
              {" "}
              <ButtonComponent
                text="Cancelar"
                color="secondary"
                onClick={() => handleCancel()}
                sx={{
                  marginRight: "10px",
                  borderRadius: "20px",
                  padding: "5px 20px",
                }}
                variant="text"
              />{" "}
              <ButtonComponent
                type="submit"
                startIcon={<SaveIcon />}
                text="Grabar"
                sx={{
                  borderRadius: "20px",
                  padding: "5px 20px",
                }}
                color="secondary"
                onClick={() => undefined}
              />
            </Box>
          </FormGrid>
        </Grid>
      </form>
    </BoxCardWhite>
  );
};

export default ProviderForm;
