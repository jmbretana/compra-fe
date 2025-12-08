import React from "react";

import { Provider } from "@interfaces";
import { Box, IconButton } from "@mui/material";
import { capitalizeFirstLetter } from "@utils/utils";
import { COLORS } from "@values/colors";

import EditIcon from "@mui/icons-material/Edit";

interface TableProductsProps {
  data: Provider[];
  //
  onSelect: (provider: Provider) => void;
}

const ProvidersTable: React.FunctionComponent<TableProductsProps> = (props) => {
  const selectHandler = (provider: Provider) => {
    props.onSelect(provider);
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"column"}
        sx={{
          backgroundColor: COLORS.white,
          borderRadius: "20px",
          padding: "15px",
          gap: "10px",
        }}
      >
        {props.data.map((item) => {
          return (
            <Box
              key={item._id}
              sx={{
                padding: "5px 15px",
                fontSize: "1rem",
                borderBottom: `1px solid ${COLORS.grey_300}`,
                "&last-child": { borderBottom: "none" },
                ":hover": {
                  backgroundColor: COLORS.grey_400,
                  cursor: "pointer",
                },
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                key={item._id}
              >
                <Box
                  sx={{
                    width: "200px",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {capitalizeFirstLetter(item.razon_social)}
                </Box>
                <Box
                  sx={{
                    width: "130px",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.telefono}
                </Box>
                <Box
                  sx={{
                    width: "200px",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.email}
                </Box>
                <Box
                  sx={{
                    width: "100px",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.condicion_iva}
                </Box>
                <Box sx={{ alignContent: "center", alignItems: "center" }}>
                  <Box sx={{ display: "flex", gap: "0.5rem" }}>
                    <Box sx={{ display: "flex", gap: "0.5rem" }}>
                      <IconButton
                        color="secondary"
                        aria-label="consulta presupuesto"
                        onClick={() => selectHandler(item)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default ProvidersTable;
