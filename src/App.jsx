import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import CustomerPage from "./pages/CustomerPage";
import StaticPage from "./pages/StaticPage";
import ProductPage from "./pages/ProductPage";
import ExitPage from "./pages/ExitPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const cart = useSelector((state) => state.cart)

    useEffect(() => {
      localStorage.setItem("cart",JSON.stringify(cart))
    },[cart])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouteControl>
              <HomePage />
            </RouteControl>
          }
        />
        <Route
          path="/cart"
          element={
            <RouteControl>
              <CartPage />
            </RouteControl>
          }
        />

        <Route
          path="/bills"
          element={
            <RouteControl>
              <BillPage />
            </RouteControl>
          }
        />

        <Route path="/customers" element={
          <RouteControl>
          <CustomerPage />
        </RouteControl>
        } />
        <Route path="/statics" element={
          <RouteControl>
          <StaticPage />
        </RouteControl>
        } />
        <Route path="/product" element={
          <RouteControl>
          <ProductPage />
        </RouteControl>
        } />
        <Route path="/exit" element={
          <RouteControl>
          <ExitPage />
        </RouteControl>
        } />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("postUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
