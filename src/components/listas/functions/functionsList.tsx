import { List } from "@interfaces";
import { EnumProviders, ProductCategorias } from "@enums";

export const calculateFinalPrice = (item: List) => {
  let price = item.precioSinIva || 0;
  const quantity = Number(item.cantidad || 1);

  switch (item.proveedor?.toUpperCase()) {
    case EnumProviders.BAVOSI:
      if (item.unidad === "kg") {
        price = price * quantity * Number(item.medida!);
        break;
      }
      price = price * quantity;
      break;
    case EnumProviders.DOS_SANTOS_PEREIRA:
      price = price * quantity;
      break;
    case EnumProviders.LUNIC:
      if (item.categoria === ProductCategorias.FRUTAS) {
        price = price * (Number(item.medida) || 1); // aplicar recargo del 10% para frutas
      }
      break;
  }

  return price.toFixed(2);
};

export const calculatePricePerQuantity = (item: List) => {
  let price = 0;

  const priceUnit = Number(calculateFinalPrice(item));
  const quantity = Number(item.cantidad);
  const medida = Number(item.medida) || 1;

  price = ((priceUnit / medida) * convertUnit(item.unidad!)) / (quantity || 1);
  price = Number(price.toFixed(2));

  return price;
};

export const calculateUnitPrice = (item: List) => {
  let resultPrice = "0.00";

  switch (item.unidad) {
    case "cc":
      // precio por lts
      resultPrice = (
        (Number(item.precioSinIva) / Number(item.medida)) *
        1000
      ).toFixed(2);
      return resultPrice;
      break;
    default:
      break;
  }

  if (Number(item.medida) > 0) {
    resultPrice = (Number(item.precioSinIva) / Number(item.medida)).toFixed(2);
  }

  return resultPrice;
};

export const calculateUnit = (unidad: string) => {
  let resultUnidad = unidad;

  switch (unidad) {
    case "cc":
      // precio por lts
      resultUnidad = "lts";
      break;
    case "gr":
      // precio por kg
      resultUnidad = "kg";
      break;
    case "ml":
      // precio por lts
      resultUnidad = "lts";
      break;
    case "dgr":
      // precio por dgr
      resultUnidad = "dgr";
      break;
    default:
      break;
  }

  return resultUnidad;
};

export const convertUnit = (unidad: string) => {
  let value = 1;

  switch (unidad) {
    case "cc":
    case "gr":
    case "ml":
      // precio por lts
      value = 1000;
      break;

    default:
      break;
  }

  return value;
};
