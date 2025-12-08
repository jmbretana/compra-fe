import React from "react";
import { createBrowserRouter } from "react-router-dom";

import LayoutPrivate from "@layout/LayoutPrivate";
import LayoutRoot from "@layout/LayoutRoot";

import Login from "@pages/PageLogin";

import Amount from "@components/amount";
import AmountForm from "@components/amount/AmountsFormComponent";
import Bookmarks from "@components/bookmarks";
import BookmarksForm from "@components/bookmarks/BookmarksForm";
import BrandsComponent from "@components/brands";
import BrandsFormComponent from "@components/brands/BrandsForm";
import CarritoComponent from "@components/cart";
import Dashboard from "@components/dashboard";
import ImportComponent from "@components/import";
import ListasComponent from "@components/listas";
import ListasDepuracion from "@components/listasDepuracion";
import ListProductForm from "@components/listasDepuracion/ListProductForm";
import OrdersComponent from "@components/orders";
import OrdersFormComponent from "@components/orders/OrdersFormComponent";
import ProductsComponent from "@components/productsMaster";
import ProductsFormComponent from "@components/productsMaster/ProductsFormComponent";
import ProviderComponent from "@components/provider";
import ProvidersComponent from "@components/providers";
import ProtectedRoute from "@layout/ProtectedRoute.tsx";
import Searcher from "@components/searcher/Searcher";
import Stock from "@components/stock";
import StockForm from "@components/stock/form/StockForm";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LayoutRoot />,
      children: [
        {
          path: "/",
          children: [
            {
              index: true,
              element: <Login />,
            },
          ],
        },
        {
          path: "/login",
          element: <Login />,
        },

        // Catch-all route for 404 errors - redirect to searcher
        {
          path: "*",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <Searcher />
                </ProtectedRoute>
              ),
            },
          ],
        },

        {
          path: "/searcher",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <Searcher />
                </ProtectedRoute>
              ),
            },
          ],
        },

        {
          path: "/bookmarks",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <Bookmarks />
                </ProtectedRoute>
              ),
            },
          ],
        },

        {
          path: "/bookmarks/:id",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <BookmarksForm />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "/dashboard",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              ),
            },
          ],
        },

        {
          path: "/products",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <ProductsComponent />
                </ProtectedRoute>
              ),
            },
          ],
        },

        {
          path: "/lists",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <ListasComponent />
                </ProtectedRoute>
              ),
            },
          ],
        },

        // orders
        {
          path: "/orders",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <OrdersComponent />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "/orders/:id",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <OrdersFormComponent />
                </ProtectedRoute>
              ),
            },
          ],
        },
        // end orders
        {
          path: "/brands",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <BrandsComponent />
                </ProtectedRoute>
              ),
            },
          ],
        },

        {
          path: "/brands/:id",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <BrandsFormComponent />
                </ProtectedRoute>
              ),
            },
          ],
        },

        // Providers
        {
          path: "/providers",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <ProvidersComponent />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "/provider/:id",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <ProviderComponent />
                </ProtectedRoute>
              ),
            },
          ],
        },
        // end Providers

        {
          path: "/import",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <ImportComponent />
                </ProtectedRoute>
              ),
            },
          ],
        },

        {
          path: "/producto/:id",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <ProductsFormComponent />
                </ProtectedRoute>
              ),
            },
          ],
        },

        {
          path: "/cart",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <CarritoComponent />
                </ProtectedRoute>
              ),
            },
          ],
        },

        {
          path: "/clean",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <ListasDepuracion />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "/clean/:id",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <ListProductForm />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "/amount",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <Amount />
                </ProtectedRoute>
              ),
            },
          ],
        },

        {
          path: "/amount/:id",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <AmountForm />
                </ProtectedRoute>
              ),
            },
          ],
        },

        {
          path: "/stock",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <Stock />
                </ProtectedRoute>
              ),
            },
          ],
        },

        {
          path: "/stock/:id",
          element: <LayoutPrivate />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <StockForm />
                </ProtectedRoute>
              ),
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
