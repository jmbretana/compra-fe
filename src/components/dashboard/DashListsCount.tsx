import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "src/middleware/store/store";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import { LIST_GETALL_SUCCESS } from "@ListActionTypes";
import { GetAllLists } from "@actions/listsActions";

const DashListsCount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { lists, statusLista } = useSelector((state: RootState) => state.lists);

  const [countList, setCountList] = useState(0);
  const [countWitoutBrand, setCountwithoutBrand] = useState(0);
  const [countWitoutMaster, setCountwithoutMaster] = useState(0);

  let first = true;

  useEffect(() => {
    if (first) {
      dispatch(GetAllLists());
      first = false;
    }
  }, []);

  useEffect(() => {
    if (statusLista === LIST_GETALL_SUCCESS) {
      setCountList(Number(lists.length));

      // guardar cantidad de listas sin marca
      const countBrand = lists.filter((item) => item.marca === "").length;
      setCountwithoutBrand(countBrand);

      // guardar cantidad de listas sin master
      const countMaster = lists.filter(
        (item) => item.productMaster === ""
      ).length;
      setCountwithoutMaster(countMaster);
    }
  }, [statusLista]);

  //

  const handleClick = () => {
    navigate("/lists");
  };

  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", width: "100%", borderRadius: "20px" }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total de articulos
        </Typography>

        <Typography component="h1" variant="h1" gutterBottom>
          {countList}
        </Typography>

        <Box display={"flex"} justifyContent={"flex-end"}>
          <Chip
            label="Ver detalle"
            variant="outlined"
            onClick={handleClick}
            color="success"
            icon={<SearchIcon />}
            size={"small"}
          />
        </Box>
      </CardContent>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total de articulos sin marca
        </Typography>

        <Typography component="h1" variant="h1" gutterBottom>
          {countWitoutBrand}
          {countList > 0 && (
            <Typography
              component="span"
              variant="subtitle2"
              color="text.secondary"
              sx={{ ml: 1 }}
            >
              ({((countWitoutBrand / countList) * 100).toFixed(1)}%)
            </Typography>
          )}
        </Typography>

        <Box display={"flex"} justifyContent={"flex-end"}>
          <Chip
            label="Ver detalle"
            variant="outlined"
            onClick={handleClick}
            color="success"
            icon={<SearchIcon />}
            size={"small"}
          />
        </Box>
      </CardContent>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total de articulos sin master
        </Typography>

        <Typography component="h1" variant="h1" gutterBottom>
          {countWitoutMaster}
          {countList > 0 && (
            <Typography
              component="span"
              variant="subtitle2"
              color="text.secondary"
              sx={{ ml: 1 }}
            >
              ({((countWitoutMaster / countList) * 100).toFixed(1)}%)
            </Typography>
          )}
        </Typography>

        <Box display={"flex"} justifyContent={"flex-end"}>
          <Chip
            label="Ver detalle"
            variant="outlined"
            onClick={handleClick}
            color="success"
            icon={<SearchIcon />}
            size={"small"}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashListsCount;
