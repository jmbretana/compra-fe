import React, { useState } from "react";
import { Box } from "@mui/material";
import { AutocompleteProveedores } from "@common/autocomplete";
import { ButtonUpload } from "@common/button";

import { handleFileCSV } from "./functions/fileHandlers";
import { handleFilePDF } from "./functions/fileHandlers";
import { handleFileXLSX } from "./functions/fileHandlers";
import { handleFileExcel } from "./functions/fileHandlers";

// Configurar el worker de PDF.js
interface ImportStep1Props {
  //
  onUpload: (proveedor: string, csvText: string[][]) => void;
}

const ImportStep1: React.FunctionComponent<ImportStep1Props> = (props) => {
  const [proveedor, setProveedor] = useState<string>();

  const handlerSelectProveedor = (proveedor: any) => {
    if (!proveedor) {
      setProveedor(undefined);
      return;
    }
    setProveedor(proveedor);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // obtener la extensión del archivo
    const fileExtension = file.name.split(".").pop();
    let csvArray: string[][] = [];
    switch (fileExtension) {
      case "csv":
        csvArray = await handleFileCSV(file);
        break;
      case "pdf":
        csvArray = await handleFilePDF(proveedor!, file);
        break;
      case "xlsx":
        csvArray = await handleFileXLSX(file);
        break;
      case "xls":
      case "xlt":
        csvArray = await handleFileExcel(file);
        break;
    }

    props.onUpload(proveedor!, csvArray);
  };

  //

  const uploadView = (
    <>
      <Box
        sx={{ border: "1px solid #E0E0E0", borderRadius: "20px", padding: 2 }}
      >
        <Box
          display={"flex"}
          gap={2}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Box sx={{ width: 350 }}>2. Seleccionar archivo</Box>
          <ButtonUpload
            accept=".xls,.xlsx,.xlt,.pdf"
            onUpload={handleFileUpload}
          />
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <Box
        sx={{ border: "1px solid #E0E0E0", borderRadius: "20px", padding: 2 }}
      >
        <Box
          display={"flex"}
          gap={2}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Box sx={{ width: 350 }}>1. Seleccione el proveedor</Box>
          <Box sx={{ width: 300 }}>
            <AutocompleteProveedores onSelect={handlerSelectProveedor} />
          </Box>
        </Box>
      </Box>
      {proveedor !== undefined && uploadView}
    </>
  );
};

export default ImportStep1;
