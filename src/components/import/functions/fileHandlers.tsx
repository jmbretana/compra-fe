import * as XLSX from "xlsx";
import Papa from "papaparse";
import { EnumProviders } from "@enums";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// Configurar el worker de PDF.js
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

export const handleFilePDF = async (
  proveedor: string,
  file: File
): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;

        let text;
        switch (proveedor!.toUpperCase()) {
          case EnumProviders.ALYSER:
            text = await extractTextFromPDF_ALYSER(arrayBuffer);
            break;
          case EnumProviders.EMPORIO:
            text = await extractTextFromPDF_EMPORIO(arrayBuffer);
            break;
          case EnumProviders.DOS_SANTOS_PEREIRA:
            text = await extractTextFromPDF_DOS(arrayBuffer);
            break;
          default:
            text = await extractTextFromPDF(arrayBuffer);
            break;
        }

        const csvArray = processTextToCSV(text);
        resolve(csvArray);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
};

export const handleFileXLSX = async (file: File): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const csvArray = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as string[][];
      resolve(csvArray);
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
};

export const handleFileExcel = async (file: File): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        // Asume que el archivo tiene una sola hoja
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const csvArray = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        }) as string[][];

        resolve(csvArray);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
};

export const handleFileCSV = (file: File): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          resolve(result.data as string[][]);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => reject(error),
    });
  });
};

const extractTextFromPDF_ALYSER = async (
  arrayBuffer: ArrayBuffer
): Promise<string> => {
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    let count = 0;
    let salto = true;

    content.items.forEach((item: any) => {
      if (item.str && item.str.trim() !== "") {
        if (salto) {
          // controlar si el campo es numerico
          if (item.str.match(/^\d+$/)) {
            // Si el texto es un número, agregar una coma
            text += item.str.trim() + ";";
            salto = false;
          } else {
            // De lo contrario, agregar el texto sin cambios
            salto = true;
          }
        } else {
          // verificar si el texto tiene el simbol $
          if (item.str.includes("$")) {
            // Si el texto contiene un símbolo de dólar, agregar una coma
            text += item.str + "\n";
            salto = true;
          } else {
            // De lo contrario, agregar el texto sin cambios
            text += item.str.trim() + ";";
          }
        }
      }

      ++count;

      if (count === 6) {
        //text += "\n";
        count = 0;
      }
    });
  }

  return text;
};

const extractTextFromPDF_EMPORIO = async (
  arrayBuffer: ArrayBuffer
): Promise<string> => {
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    let count = 0;

    content.items.forEach((item: any) => {
      if (item.str && item.str.trim() !== "") {
        text += item.str.trim().replace("&", "") + ";";
        ++count;
        if (count === 3) {
          text += "\n";
          count = 0;
        }
      }
    });
  }

  return text;
};

const extractTextFromPDF_DOS = async (
  arrayBuffer: ArrayBuffer
): Promise<string> => {
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    let count = 0;
    let salto = true;

    content.items.forEach((item: any) => {
      if (item.str && item.str.trim() !== "") {
        if (salto) {
          // controlar si el campo es numerico
          if (item.str.match(/^\d+$/)) {
            // Si el texto es un número, agregar una coma
            text += item.str.trim() + ";";
            salto = false;
          } else {
            // De lo contrario, agregar el texto sin cambios
            salto = true;
          }
        } else {
          // verificar si el texto tiene el simbol $
          if (item.str.includes("$")) {
            // Si el texto contiene un símbolo de dólar, agregar una coma
            text += item.str + "\n";
            salto = true;
          } else {
            // De lo contrario, agregar el texto sin cambios
            text += item.str.trim() + ";";
          }
        }
      }

      ++count;

      if (count === 6) {
        //text += "\n";
        count = 0;
      }
    });
  }

  return text;
};

const extractTextFromPDF = async (
  arrayBuffer: ArrayBuffer
): Promise<string> => {
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  let text = "";
  let line = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    if (i !== 1) {
      const pageText = content.items
        .map((item: any) => item.str)
        .slice(1) // Saltear la primera línea
        .join(" ");

      text += pageText.replace(" Página   " + i, "");

      // extraer la primer palabra de la linea
      const firstWord = text.split("  ");

      firstWord.forEach((word: string) => {
        // buscar patron de si una palabra comienza con dos letras y luego tiene numeros
        const regex = /^[a-zA-Z]{2}\d+/;
        if (regex.test(word)) {
          line += "\n";
        }

        line += word + ",";
      });
    }
  }

  line = line.replace(/,\n/g, "\n"); // Eliminar comas al final de cada línea
  return line;
};

const processTextToCSV = (text: string): string[][] => {
  // Procesar el texto para convertirlo a formato CSV
  const lines = text.split("\n").filter((line) => line.trim() !== ""); // Eliminar líneas vacías
  const csvRows = lines.map((line) =>
    line.split(";").map((item) => item.trim())
  );
  return csvRows;
};
