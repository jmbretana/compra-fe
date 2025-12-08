import React from "react";

import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";

import { COLORS } from "@values/colors";

export const menuListItems = {
  color: COLORS.grey,
  colorNight: COLORS.white,
  activeColor: COLORS.black,
  activeColorNight: COLORS.blue,
  items: [
    {
      text: "Buscador",
      icon: <SearchIcon />,
      link: "/searcher",
      name: "buscador",
      roles: ["user", "admin"],
    },
    {
      text: "Listas",
      icon: <ListIcon />,
      link: "/lists",
      name: "listas",
      roles: ["user", "admin"],
    },
    {
      text: "Pedidos",
      icon: <ListAltIcon />,
      link: "/orders",
      name: "pedidos",
      roles: ["user", "admin"],
    },
    {
      text: "Favoritos",
      icon: <StarBorderIcon />,
      link: "/bookmarks",
      name: "favoritos",
      roles: ["user", "admin"],
    },

    {
      text: "Stock",
      icon: <InventoryIcon />,
      link: "/stock",
      name: "stock",
      roles: ["user", "admin"],
    },
    {
      text: "Importar",
      icon: <ImportExportIcon />,
      link: "/import",
      name: "importar",
      roles: ["admin"],
    },

    {
      text: "",
      icon: <ShoppingCartIcon />,
      link: "/cart",
      name: "carrito",
      roles: ["user", "admin"],
    },
  ],
};

export const mainListConfigItems = [
  {
    text: "Articulos",
    icon: <Inventory2OutlinedIcon />,
    link: "/products",
    name: "articulos",
    roles: ["admin"], // Add roles property
  },
  {
    text: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    link: "/dashboard",
    name: "dashboard",
    roles: ["admin"],
  },
  {
    text: "Listas Depuración",
    icon: <ListIcon />,
    link: "/clean",
    name: "depuracion",
    roles: ["admin"],
  },
  {
    text: "Marcas",
    icon: <CategoryIcon />,
    link: "/brands",
    name: "brands",
    roles: ["admin"],
  },
  {
    text: "Medidas",
    icon: <FormatListNumberedIcon />,
    link: "/amount",
    name: "amounts",
    roles: ["admin"],
  },

  {
    text: "Proveedores",
    icon: <LocalShippingIcon />,
    link: "/providers",
    name: "providers",
    roles: ["admin"],
  },
];
