import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@common/Loading";
import { Box, Tab, Tabs } from "@mui/material";
import { GetAllProviders, GetProvider } from "@actions/providersActions";
import { AppDispatch, RootState } from "src/middleware/store/store";
import { TittleHeader } from "@common";
import {
  PROVIDER_CREATE_SUCCESS,
  PROVIDER_GET_SUCCESS,
} from "@ProviderActionTypes";

import ProviderForm from "./ProviderForm";
//

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ProviderComponent: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const edit = id == "new" ? false : true;
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [value, setValue] = React.useState(0);

  const { provider, statusProvider } = useSelector(
    (state: RootState) => state.providers
  );

  useEffect(() => {
    setHasLoaded(false);
  }, [id]);

  useEffect(() => {
    if (id && id !== "new" && !hasLoaded) {
      dispatch(GetProvider(id));
      setHasLoaded(true);
    } else if (id === "new") {
      setLoading(false);
    }
  }, [id, dispatch, hasLoaded]);

  useEffect(() => {
    if (statusProvider === PROVIDER_GET_SUCCESS && provider) {
      setLoading(false);
    }

    if (statusProvider === PROVIDER_CREATE_SUCCESS && provider) {
      dispatch(GetAllProviders());
      navigate("/providers");
    }
  }, [statusProvider]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCancel = () => {
    navigate("/providers");
  };

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box mt={2}>{children}</Box>}
      </div>
    );
  }

  function tabSelection(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <TittleHeader
        title={id === "new" ? "Agregar Proveedor" : "Editar Proveedor"}
        onCancel={handleCancel}
      />

      <>
        {loading && <Loading />}

        {!loading && (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Info" {...tabSelection(0)} />
                <Tab label="Lista" {...tabSelection(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <ProviderForm edit={edit} provider={provider} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}></CustomTabPanel>
          </Box>
        )}
      </>
    </>
  );
};

export default ProviderComponent;
