import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as checkoutApi from "@/features/checkout/services/checkoutApi";
import type { CreateOrderPayload, PaymentOrder } from "@/features/checkout/types/checkout.types";

interface CheckoutState {
  currentOrder: PaymentOrder | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CheckoutState = {
  currentOrder: null,
  status: "idle",
};

export const createOrder = createAsyncThunk("checkout/createOrder", async (payload: CreateOrderPayload) => {
  return checkoutApi.createOrder(payload);
});

// Gọi khi mount trang /checkout/:orderId mà chưa có currentOrder trong Redux (vd khách F5 trang).
export const fetchOrder = createAsyncThunk("checkout/fetchOrder", async (orderId: string) => {
  return checkoutApi.getOrder(orderId);
});

export const refreshOrderStatus = createAsyncThunk("checkout/refreshOrderStatus", async (orderId: string) => {
  return checkoutApi.getOrderStatus(orderId);
});

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.error("[checkoutSlice] createOrder rejected:", action.error);
        state.status = "failed";
      })
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.status = "failed";
        state.currentOrder = null;
      })
      .addCase(refreshOrderStatus.fulfilled, (state, action) => {
        if (state.currentOrder) {
          state.currentOrder.status = action.payload;
        }
      });
  },
});

export default checkoutSlice.reducer;
