import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import ProvidersTable from "./ProvidersTable";
import { TittleHeader } from "@common";
import Loading from "@common/Loading";

import { Provider } from "@interfaces";
import { PROVIDER_GETALL_SUCCESS } from "src/middleware/types/ProviderActionTypes";
import { GetAllProviders } from "src/middleware/actions/providersActions";

const ProvidersComponent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  let first = true;

  const dispatch = useDispatch<AppDispatch>();

  const { providers, statusProvider } = useSelector(
    (state: RootState) => state.providers
  );

  //

  useEffect(() => {
    if (first) {
      if (providers.length > 0) loadData();
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
      loadData();
    }
  }, [statusProvider]);

  const loadData = () => {
    const prov = providers.sort((a, b) => {
      if (a.razon_social < b.razon_social) return -1;
      if (a.razon_social > b.razon_social) return 1;
      return 0;
    });
    setData(prov);
    setLoading(false);
  };

  const handlerSelectProvider = (provider: Provider | "new") => {
    if (provider === "new") navigate("/provider/new");
    else navigate("/provider/" + provider._id);
  };

  //

  return (
    <Box mb={5}>
      {" "}
      <TittleHeader
        title="Proveedores"
        onAdd={() => handlerSelectProvider("new")}
      />
      {loading && <Loading />}
      {!loading && (
        <ProvidersTable
          data={data}
          //
          onSelect={handlerSelectProvider}
        />
      )}
    </Box>
  );
};

export default ProvidersComponent;
