import classes from "./App.module.css";
import { PATHS } from "./constants/routes";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { fetchProducts } from "./store/ProductSlice";
import { getFromLocalStorage } from "./store/UserSlice";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Analytics } from "@vercel/analytics/react";

// Showcase pages
import ShowcasePage from "./components/pages/showcasePages/ShowcasePage/ShowcasePage";
import DiscountProductsPage from "./components/pages/showcasePages/DiscountProductsPage/DiscountProductsPage";
import CategoryPage from "./components/pages/showcasePages/CategoryPage/CategoryPage";
import ProductPage from "./components/pages/showcasePages/ProductPage/ProductPage";
import WishlistPage from "./components/pages/showcasePages/WishlistPage/WishlistPage";
import CartPage from "./components/pages/showcasePages/CartPage/CartPage";
import CheckoutSuccessPage from "./components/pages/showcasePages/CheckoutSuccessPage/CheckoutSuccessPage";
import NotFound from "./components/pages/showcasePages/NotFound/NotFound";
import PrivatePage from "./components/pages/showcasePages/PrivatePage/PrivatePage";
import ProfilePage from "./components/pages/showcasePages/ProfilePage/ProfilePage";

// Admin pages
import AdminPage from "./components/pages/adminPages/AdminPage/AdminPage";
import OrdersPage from "./components/pages/adminPages/OrdersPage/OrdersPage";
import ProductsPage from "./components/pages/adminPages/ProductsPage/ProductsPage";
import SettingsPage from "./components/pages/adminPages/SettingsPage/SettingsPage";
import AdminPasswordPage from "./components/pages/adminPages/AdminPage/AdminPasswordPage";

import Loader from "./components/UI/Loader/Loader";
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, products } = useSelector(
    (state: RootState) => state.product
  );
  const isDataLoaded = !isLoading && products.length > 0;
  const routes = useRoutes([
    {
      path: PATHS.showcase,
      element: <ShowcasePage />,
      children: [
        {
          index: true,
          element: isDataLoaded ? <DiscountProductsPage /> : <Loader />,
        },
        {
          path: ":url",
          children: [
            {
              index: true,
              element: isDataLoaded ? <CategoryPage /> : <Loader />,
            },
            {
              path: ":id",
              element: isDataLoaded ? <ProductPage /> : <Loader />,
            },
          ],
        },
      ],
    },
    {
      path: PATHS.wishlist,
      element: isDataLoaded ? <WishlistPage /> : <Loader />,
    },
    {
      path: PATHS.cart,
      element: isDataLoaded ? <CartPage /> : <Loader />,
    },
    {
      path: PATHS.private,
      element: <PrivatePage />,
    },
    {
      path: PATHS.profile, // Убедитесь, что PATHS.profile существует в ваших константах
      element: <ProfilePage />,
    },
    {
      path: PATHS.success,
      element: <CheckoutSuccessPage />,
    },
    {
      path: `${PATHS.admin}/auth`,
      element: <AdminPasswordPage />, ///admin/orders - imgur.com
    },
    {
      path: PATHS.admin,
      element: <AdminPage />,
      children: [
        {
          path: PATHS.adminOrders.replace(`${PATHS.admin}/`, ""),
          element: <OrdersPage />,
        },
        {
          path: PATHS.adminProducts.replace(`${PATHS.admin}/`, ""),
          element: <ProductsPage />,
        },
        {
          path: PATHS.adminSettings.replace(`${PATHS.admin}/`, ""),
          element: <SettingsPage />,
        },
      ],
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  const firebaseConfig = {
    apiKey: "AIzaSyCSnUlsCQIXk0XiLmua1dNiVj-Vag3hxc0",
    authDomain: "baza-ee8e7.firebaseapp.com",
    databaseURL:
      "https://baza-ee8e7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "baza-ee8e7",
    storageBucket: "baza-ee8e7.firebasestorage.app",
    messagingSenderId: "656749534532",
    appId: "1:656749534532:web:c24eb1712b7b2944614b11",
    measurementId: "G-HMTKWG50QW",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  useEffect(() => {
    dispatch(getFromLocalStorage("wishlist"));
    dispatch(getFromLocalStorage("cart"));
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={classes.app}>
      {routes}
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
