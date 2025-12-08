import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loading: React.FunctionComponent = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} padding={5}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
