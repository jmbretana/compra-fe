import { configureStore } from "@reduxjs/toolkit";

import { AmountReducer } from "src/middleware/redux/amountsReducer";
import { BookmarkReducer } from "@redux/bookmarksReducer";
import { BrandReducer } from "src/middleware/redux/brandsReducer";
import { CartReducer } from "src/middleware/redux/cartReducer";
import { GeoReducer } from "src/middleware/redux/geoReducer";
import { ListasReducer } from "src/middleware/redux/listasReducer";
import { OrderReducer } from "@redux/ordersReducer";
import { ProductReducer } from "src/middleware/redux/productsReducer";
import { ProviderReducer } from "src/middleware/redux/providersReducer";
import { SnackReducer } from "src/middleware/redux/snackReducer";
import { UserReducer } from "src/middleware/redux/usersReducer";

export const store = configureStore({
  reducer: {
    amounts: AmountReducer,
    bookmarks: BookmarkReducer,
    brands: BrandReducer,
    cart: CartReducer,
    geo: GeoReducer,
    lists: ListasReducer,
    orders: OrderReducer,
    products: ProductReducer,
    providers: ProviderReducer,
    snack: SnackReducer,
    users: UserReducer,
  },
});

// Define RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
