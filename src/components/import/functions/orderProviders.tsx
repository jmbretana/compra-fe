import { List, Brand, Amount, Product } from "@interfaces";
import {
  checkIfProductExists,
  checkIfBrandProductExists,
  checkAmount,
} from "@utils/utilsSearch";
import { EnumProviders } from "@enums";

const debug = false;

const clearPrice = (price: any): string => {
  let precio = ""; // Eliminar caracteres no numéricos

  // Validar que price existe y convertir a string si es necesario
  if (price == null || price == undefined) return "";

  const priceStr = String(price);
  if (priceStr == "" || priceStr == "null" || priceStr == "undefined")
    return "";

  if (!priceStr.includes(",")) {
    const numericPrice = parseFloat(priceStr);
    if (!isNaN(numericPrice)) {
      precio = numericPrice.toFixed(2);
    } else {
      console.error("Invalid numeric value:", priceStr);
    }
  }

  if (priceStr.includes(",")) {
    try {
      precio = priceStr?.replace(/[^0-9.,]/g, ""); // Eliminar caracteres no numéricos
      precio = precio?.replace(".", "");
    } catch (error) {
      console.error("Error al procesar el precio - A:", priceStr, error);
      return "";
    }

    try {
      precio = precio?.replace(".", "");
    } catch (error) {
      console.error("Error al procesar el precio - B:", priceStr, error);
      return "";
    }

    try {
      if (precio?.includes(".")) {
        precio = precio?.replace(".", "");
      }
    } catch (error) {
      console.error("Error al procesar el precio - C:", priceStr, error);
      return "";
    }

    if (precio?.includes(",")) {
      precio = precio?.replace(",", ".");
    }
  }

  return precio;
};

const validatePrice = (price: string): boolean => {
  return (
    price === "" || price === "0" || isNaN(Number(price)) || Number(price) === 0
  );
};

const clearString = (str: string): string => {
  let titulo = str?.trim().toLowerCase();
  titulo = titulo?.replace("*", ""); // Reemplazar guiones por espacios
  titulo = titulo.charAt(0).toUpperCase() + titulo.slice(1);

  titulo = titulo.replace("undefined", "");
  // Eliminar caracteres especiay espacios en blanco al inicio y al final
  return titulo.trim();
};

const completeRowProduct = (
  rowProduct: List,
  brands: Brand[],
  amounts: Amount[],
  products: Product[]
): List => {
  rowProduct._id = "";
  rowProduct.articulo = clearString(rowProduct.articulo);
  rowProduct.marca = checkIfBrandProductExists(rowProduct.articulo, brands);
  rowProduct.productMaster = checkIfProductExists(
    rowProduct.articulo,
    products
  );

  const amount = checkAmount(rowProduct.articulo, amounts) as
    | Amount
    | undefined;

  rowProduct.unidad = amount ? amount.unidad : "";
  rowProduct.cantidad = amount ? amount.cantidad : "";
  rowProduct.tipo = amount ? amount.tipo : "";
  rowProduct.medida = amount ? amount.medida : "";

  return rowProduct;
};

export const orderColumn = (
  brands: Brand[],
  amounts: Amount[],
  proveedor: string,
  csvData: string[][],
  products: Product[]
): List[] => {
  const newRows: List[] = [];

  try {
    csvData.forEach((row) => {
      try {
        const proveedores = proveedor.toUpperCase();
        let description = "";
        let precioSinIva = "";
        let marca = "";
        let cantidad = "";
        switch (proveedores) {
          case EnumProviders.ALYSER: {
            description = row[1];
            precioSinIva = clearPrice(row[3]);
            break;
          }
          case EnumProviders.BAVOSI: {
            description = row[1];
            precioSinIva = row[10].replace("$", "");
            precioSinIva = precioSinIva.replace(",", "");
            break;
          }
          case EnumProviders.BLANCALUNA: {
            description = row[2];
            precioSinIva = row[4];
            break;
          }
          case EnumProviders.DGM: {
            const price = row[8];
            description = row[0];

            if (price === "") return;
            if (price === "Iva incluido") return;

            if (description === undefined || description === "")
              description = row[3];
            if (description === undefined || description === "") return;
            description = description.substring(10, description.length - 1);
            precioSinIva = clearPrice(price);
            break;
          }
          case EnumProviders.DISTRIBUIDORA_DEL_PUERTO: {
            description = row[4];
            precioSinIva = clearPrice(row[9]);
            break;
          }
          case EnumProviders.DOS_SANTOS_PEREIRA: {
            if (row[1] === undefined || row[1] === "") return;
            if (row[2] === undefined || row[2] === "") return;

            description = row[1] + row[2];
            description = description.replace("..................", " ");
            precioSinIva = row[3];

            break;
          }
          case EnumProviders.EMPORIO: {
            description = row[2] + "x " + row[3];
            description = description.replace("&", " ");
            precioSinIva = row[4];
            break;
          }
          case EnumProviders.GESON: {
            description = row[2] + " " + row[3] + " x" + row[4];
            precioSinIva = clearPrice(row[5]);
            marca = row[0];
            cantidad = row[4];

            break;
          }
          case EnumProviders.LODISER: {
            description = row[1] + " " + row[3] + " " + row[4];
            precioSinIva = clearPrice(row[5]);
            description = description.replace("*", "");
            break;
          }
          case EnumProviders.LUNIC: {
            description = row[1];
            if (
              description.includes("ml") ||
              description.includes("kg") ||
              description.includes("gr") ||
              row[3].includes("gr")
            ) {
              precioSinIva = row[10].replace(",", "").replace("$", "");
            }
            break;
          }
          case EnumProviders.NACCATO: {
            description = row[1];
            const price = row[2];
            precioSinIva = clearPrice(price);
            break;
          }
        }

        // Validar precio antes de procesar
        if (debug && validatePrice(precioSinIva)) {
          console.error("Invalid price, skipping row:", precioSinIva);
          return; // Esto saltará la iteración actual del forEach
        }

        // Validar descripción
        if (debug && description === "") {
          console.error("Invalid description, skipping row:", description);
          return;
        }

        let rowProduct: List = {
          proveedor: proveedores.toLowerCase(),
          articulo: description.toLowerCase(),
          precioSinIva: Number(precioSinIva),
          precio: 0,
          categoria: "",
          fecha: "",
          subcategoria: "",
          productMaster: "",
          marca: marca ? marca.toLowerCase() : "",
          unidad: "",
          cantidad: cantidad,
          tipo: "",
          medida: "",
          vigente: true,
        };

        rowProduct = completeRowProduct(rowProduct, brands, amounts, products);
        newRows.push(rowProduct);
      } catch (error) {
        console.error("Error processing row:", row, error);
      }
    });

    // ordenar alfabeticamente por articulo
    newRows.sort((a, b) => {
      if (a.articulo < b.articulo) return -1;
      if (a.articulo > b.articulo) return 1;
      return 0;
    });
  } catch (error) {
    console.error(error);
  }

  return newRows;
};
