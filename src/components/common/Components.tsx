import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";

export const FormGridColumn = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
}));

export const FormGridRow = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "row",
  padding: "0px 0px",
  margin: "0px 0px",
  lineHeight: "0px",
}));
