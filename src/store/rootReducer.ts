import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "@/features/products/productSlice";
import cartReducer from "@/features/cart/cartSlice";
import checkoutReducer from "@/features/checkout/checkoutSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
});

export default rootReducer;
