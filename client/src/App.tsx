import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import {
  CustomerPage,
  CustomersPage,
  OrderPage,
  OrdersPage,
  OverviewPage,
  ProductsPage,
  SingleProductPage,
} from "./_admin";
import { ForgetPasswordPage, LoginPage, RegisterPage } from "./_auth";
import { CheckoutPage, HomePage, ProductPage, ShoppingCartPage } from "./_root";
import {
  ProfilePage,
  OverviewPage as CustomerOverviewPage,
  OrdersPage as CustomerOrdersPage,
} from "./_customer";

const App = () => {
  return (
    <Routes>
      {/* Root Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="cart" element={<ShoppingCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
      {/* Customer Routes */}
      <Route path="/account" element={<Layout />}>
        <Route index element={<ProfilePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="overview" element={<CustomerOverviewPage />} />

        <Route path="orders" element={<CustomerOrdersPage />} />
      </Route>
      {/* Auth Routes */}
      <Route path="/auth" element={<Layout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forget-password" element={<ForgetPasswordPage />} />
      </Route>
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<Layout />}>
        <Route path="overview" element={<OverviewPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="customers/:id" element={<CustomerPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:id" element={<OrderPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<SingleProductPage />} />
      </Route>
    </Routes>
  );
};

export default App;
