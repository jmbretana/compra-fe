import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { AppDispatch } from "src/middleware/store/store";
import { COLORS } from "@values/colors";
import { ButtonComponent } from "@common";
import {
  CreateManyProductList,
  UpdateManyProductList,
} from "@actions/listsActions";

import { List } from "@interfaces";
import clsx from "clsx";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// styles
const useStyles = makeStyles(() =>
  createStyles({
    boxContainer: {
      margin: "20px 0",
    },

    boxContainerChips: {
      display: "flex",
      flexDirection: "row",
      gap: 1,
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 2,
      marginTop: "10px",
    },

    chipContent: {
      display: "flex",
      flexDirection: "row",
      gap: "10px",
      alignItems: "center",
      alignContent: "end",
      marginTop: 2,
      marginBottom: 2,
      borderRadius: 20,
      padding: "5px 15px",
      justifyContent: "space-between",
    },

    chipContentBlue: {
      backgroundColor: COLORS.blue_light,
    },
    typoChip: {
      color: COLORS.blue_dark,
      fontSize: "1.5em",
      fontWeight: 700,
    },

    boxCreateSuccess: {
      color: COLORS.green_dark,
      fontSize: "1em",
      fontWeight: 700,
      border: `2px solid ${COLORS.green_light}`,
      borderRadius: "20px",
      padding: "5px 15px",
      backgroundColor: COLORS.green_light,
    },
  })
);

interface ImportCounterResumeProps {
  error: boolean;
  productListNew: List[];
  productListExisting: List[] | undefined;
}

const ImportCounterResume: React.FunctionComponent<ImportCounterResumeProps> = (
  props
) => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const counterTotalToCreate: number = props.productListNew
    ? props.productListNew.length
    : 0;

  const counterMaster = props.productListNew.filter(
    (item) => item.productMaster
  ).length;

  const counterExistingProducts = props.productListExisting
    ? props.productListExisting.length
    : 0;

  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [finishProcess, setFinishProcess] = useState<boolean>(false);

  const submitImport = async () => {
    setLoadingUpdate(true);
    try {
      // poner flag vigente en false a los productos existentes
      if (props.productListExisting && props.productListExisting.length > 0) {
        await updateExistingProducts(props.productListExisting);
        await createNewProducts(props.productListExisting);
      }

      // crear nuevos productos de los productos existentes
      if (counterTotalToCreate > 0)
        // crear nuevos productos de los productos nuevos
        await createNewProducts(props.productListNew);
    } finally {
      setLoadingUpdate(false);
      setFinishProcess(true);
    }
  };

  const updateExistingProducts = async (listToUpdate: List[]) => {
    // actualizar listToUpdate enviando solo _id y vigente: false
    const updatedList = listToUpdate.map((item) => ({
      _id: item._id,
      articulo: item.articulo,
      vigente: false,
    }));

    try {
      // enviar de a lotes de 50 items
      const chunkSize = 50;
      for (let i = 0; i < updatedList.length; i += chunkSize) {
        const chunk = updatedList.slice(i, i + chunkSize);
        await dispatch(UpdateManyProductList(chunk));
      }
    } catch (error) {
      console.error("Error al cargar las listas", error);
    }
  };

  const createNewProducts = async (listToCreate: List[]) => {
    setLoadingUpdate(true);
    try {
      const batchSize = 300;
      const batches = [];

      for (let i = 0; i < listToCreate.length; i += batchSize) {
        const batch = listToCreate.slice(i, i + batchSize);
        batches.push(batch);
      }

      let counter = counterTotalToCreate;
      for (let i = 0; i < batches.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay of 1000ms between batches
        //

        await dispatch(CreateManyProductList(batches[i]));
        counter = counter - batches[i].length;
      }
    } catch (error) {
      console.error("Error al cargar las listas", error);
      throw error; // Re-throw the error to be caught in the outer try-catch
    }
  };

  //

  return (
    <Box className={classes.boxContainer}>
      <Box className={classes.boxContainerChips}>
        <Box className={classes.chipContent}>
          <Typography className={classes.typoChip}>
            {counterTotalToCreate}
          </Typography>
          <Typography>productos nuevos</Typography>
        </Box>

        <Box className={classes.chipContent}>
          <Typography className={classes.typoChip}>
            {counterExistingProducts}
          </Typography>
          <Typography>productos existentes a actualizar</Typography>
        </Box>

        <Box className={clsx(classes.chipContent, classes.chipContentBlue)}>
          <Typography className={clsx(classes.typoChip)}>
            {counterMaster}{" "}
          </Typography>
          <Typography>articulos detectados</Typography>
        </Box>
      </Box>

      <hr />

      {(counterTotalToCreate > 0 || counterExistingProducts > 0) &&
        !props.error && (
          <>
            <Box mt={2}>
              {!finishProcess && (
                <Box display={"flex"} gap={"5px"} alignItems={"center"}>
                  <ButtonComponent
                    text="Importar articulos"
                    variant="contained"
                    loading={loadingUpdate}
                    //
                    onClick={submitImport}
                    startIcon={<SaveAltIcon />}
                  />
                </Box>
              )}
              {finishProcess && (
                <Box className={classes.boxCreateSuccess}>
                  Creación de articulos finalizada :)
                </Box>
              )}
            </Box>
          </>
        )}

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loadingUpdate}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default ImportCounterResume;
