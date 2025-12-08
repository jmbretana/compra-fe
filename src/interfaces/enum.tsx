export type ListItem = {
  id: number;
  name: string;
};

type ListItemStock = {
  id: number;
  name: string;
  categorias: string[];
};

export const enum EnumProviders {
  ALYSER = "ALYSER",
  BLANCALUNA = "BLANCALUNA",
  BAVOSI = "BAVOSI",
  DGM = "DGM",
  DAILOLEX = "DAILOLEX",
  DISTRIBUIDORA_DEL_PUERTO = "DISTRIBUIDORA DEL PUERTO", // Uncomment if needed
  DOS_SANTOS_PEREIRA = "DOS SANTOS PEREIRA",
  EMPORIO = "EMPORIO",
  GESON = "GESON",
  LODISER = "LODISER",
  LUNIC = "LUNIC",
  NACCATO = "NACCATO",
}

export const enum ProductCategorias {
  ALCOHOL = "Alcoholes varios",
  ACEITES = "Aceites y Grasas",
  ALMACEN = "Almacen",
  BEBIDAS = "Bebidas",
  CARNES = "Carnes y Pescados",
  CERVEZAS = "Cervezas",
  CAFES = "Café",
  CONDIMENTOS = "Condimentos y Especias",
  CONGELADOS = "Congelados",
  DESCARTABLES = "Descartables, Vasos y Empaques",
  FRUTAS = "Frutas y Verduras",
  GASEOSAS = "Gaseosas y aguas",
  LÁCTEOS = "Lácteos y Huevos",
  LIMPIEZA = "Limpieza e Higiene",
  PANADERIA = "Panadería y Repostería",
  VINOS = "Vinos y Licores",
}

export const stockGroups: ListItemStock[] = [
  { id: 1, name: "BARRA", categorias: ["Bebidas", "Vinos y Licores"] },
  {
    id: 2,
    name: "LIMPIEZA Y DESCARTABLES",
    categorias: ["Limpieza e Higiene", "Descartables, Vasos y Empaques"],
  },
  {
    id: 3,
    name: "VAJILLA Y CRISTALERÍA",
    categorias: ["Vajilla y Cristalería"],
  },
  {
    id: 4,
    name: "COCINA",
    categorias: ["Almacen", "Aceites y grasas", "Verdulería"],
  },
  { id: 5, name: "SALSAS", categorias: ["Salsas"] },
];
