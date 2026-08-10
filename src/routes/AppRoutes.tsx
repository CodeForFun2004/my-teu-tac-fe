import { Route, Routes } from "react-router-dom";
import HomePage from "@/features/home/HomePage";
import ProductListPage from "@/features/products/ProductListPage";
import ProductDetailPage from "@/features/products/ProductDetailPage";
import CartPage from "@/features/cart/CartPage";
import CheckoutPage from "@/features/checkout/CheckoutPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:slug" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout/:orderId" element={<CheckoutPage />} />
    </Routes>
  );
};

export default AppRoutes;
