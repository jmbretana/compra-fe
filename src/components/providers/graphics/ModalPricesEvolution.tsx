import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ButtonComponent } from "@common";

import StatCard, { StatCardProps } from "./StatCard";

interface ButtonProps {
  open: boolean;
  dataCard: StatCardProps;
  //
  onClose: () => void;
}

const ModalPricesEvolution: React.FunctionComponent<ButtonProps> = (props) => {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Evolucion de precios"}</DialogTitle>
      <DialogContent
        sx={{
          width: "600px",
        }}
      >
        <StatCard {...props.dataCard} />
      </DialogContent>
      <DialogActions>
        <ButtonComponent
          text="Cerrar"
          color="secondary"
          onClick={() => handleClose()}
          sx={{
            marginRight: "10px",
            borderRadius: "20px",
            padding: "5px 20px",
          }}
        />{" "}
      </DialogActions>
    </Dialog>
  );
};

export default ModalPricesEvolution;
