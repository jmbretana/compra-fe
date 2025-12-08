import React from "react";
import { Box } from "@mui/material";

import DashBrandsCount from "./DashBrandsCount";
import DashListsCount from "./DashListsCount";

import { TittleHeader } from "@common";

const Dashboard = () => {
  //

  return (
    <Box mb={5}>
      <TittleHeader title={"Dashboard"} />

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        paddingBottom={2}
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
      >
        <Box
          sx={{
            width: { xs: "100%" },
          }}
        >
          <DashListsCount />
        </Box>
        <Box sx={{ width: { xs: "100%" } }}>
          <DashBrandsCount />
        </Box>
        <Box sx={{ width: { xs: "100%" } }}></Box>
      </Box>
      <Box sx={{ width: { xs: "100%" } }}></Box>
    </Box>
  );
};

export default Dashboard;
