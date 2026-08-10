import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "@/types/product.types";
import { getProducts } from "./services/productApi";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  return getProducts();
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productSlice.reducer;
