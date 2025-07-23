// import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
// import 'font-awesome/css/font-awesome.min.css';
// import { useEffect, useState } from "react";
// import Navbar from './Components/Layout/Header/Navbar';
// import Footer from './Components/Layout/Footer/Footer';
// import Home from './Components/Home/Home';
// import axios from "axios";
// import ProductDetails from "./Components/Product/ProductDetails"
// import Products from './Components/Product/Products';
// import './App.css'; // Add the styles to control layout
// import Search from './Components/Product/Search';
// import LoginSignup from './Components/User/LoginSignup';
// import store from "./store"
// import { loadUser } from './action/userAction';
// import { useSelector } from 'react-redux';
// import Profile from "./Components/User/Profile.jsx"
// import ProtectedRoute from './Components/Route/ProtectedRoute.jsx';
// import UpdateProfile from './Components/User/UpdateProfile.jsx';
// import UpdatePassword from './Components/User/UpdatePassword.jsx'
// import ForgotPassword from './Components/User/ForgotPassword.jsx';
// import ResetPassword from './Components/User/ResetPassword.jsx';
// import Cart from './Components/Cart/Cart.jsx';
// import Shipping from './Components/Cart/Shipping.jsx';
// import ConfirmOrder from './Components/Cart/ConfirmOrder.jsx';
// import OrderSuccess from './Components/Cart/OrderSuccess.jsx';

// import Dashboard from './Components/admin/Dashboard.jsx';

// import MyOrder from './Components/Order/MyOrders.jsx';
// import NewProduct from './Components/admin/NewProduct.jsx';
// import UpdateProduct from "./Components/Admin/UpdateProduct";
// import OrderList from './Components/admin/OrderList.jsx';
// import ProcessOrder from './Components/admin/ProcessOrder.jsx';
// import UsersList from './Components/admin/UsersList.jsx';
// import UpdateUser from './Components/admin/UpdateUser.jsx';
// import ProductReviews from './Components/admin/ProductReviews.jsx';
// // import Payment from './Components/Cart/Payment.jsx';

// function App() {
//   const { isAuthenticated, user } = useSelector((state) => state.user);
//   // {stripeApiKey && (
//   //   <Elements stripe={loadStripe(stripeApiKey)}>
//   //     <ProtectedRoute exact path="/process/payment" component={Payment} />
//   //   </Elements>
//   // )}
//   // const [stripeApiKey, setStripeApiKey] = useState("");

//   // async function getStripeApiKey() {
//   //   const { data } = await axios.get("/api/v1/stripeapikey");

//   //   setStripeApiKey(data.stripeApiKey);
//   // }
//   // useEffect(() => {
//   //   WebFont.load({
//   //     google: {
//   //       families: ["Roboto", "Droid Sans", "Chilanka"],
//   //     },
//   //   });

//   //   store.dispatch(loadUser());

//   //   getStripeApiKey();
//   // }, []);

//   store.dispatch(loadUser)
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <div className="app-container">
//           <Navbar />
//          <Home/>
//           <Footer />
//         </div>
//       ),
      
//     },
//     {
//       path: "/product/:id",
//       element: (
//         <ProductDetails/>
//       ),
      
//     },
//     {
//       path: "/products",
//       element: (
//         <Products/>
//       ),
      
//     },
//     {
//       path: "/products/:keyword",
//       element: (
//         <Products/>
//       ),
      
//     },
//     {
//       path: "/search",
//       element: 

          
//         <>
//         <Navbar></Navbar>
//           <Search/>
//           </>
       
      
        
        
        
      
      
//     },
//     {
//       path: "/login",
//       element: (

// <>
// <Navbar></Navbar>
//         <LoginSignup/>
//         </>
//       ),
      
//     },
//     {
//       path: "/password/reset/:token",
//       element: (


//         <ResetPassword/>
//       ),
      
//     },
//     {
//       path: "/account",
//       element: (

// <>

// <Navbar></Navbar>
//         <Profile/>
//         </>
//       ),
      
//     },
//     {
//       path: "/password/update",
//       element: (


//         <UpdatePassword/>
//       ),
      
//     },
//     {
//       path: "/password/forgot",
//       element: (


//         <ForgotPassword/>
//       ),
      
//     },

//     {
//       path: "/me/update",
//       element: (


//         <UpdateProfile/>
//       ),
      
//     },
//     {
//       path: "/cart",
//       element: (

// <>
// <Navbar/>
//         <Cart/>
//         </>
//       ),
      
//     },
//     {
//       path: "/shipping",
//       element: (


//         <Shipping/>
//       ),
      
//     },
//     {
//       path: "/order/confirm",
//       element: (


//         <ConfirmOrder/>
//       ),
      
//     },
//     {
//       path: "/success",
//       element: (


//         <OrderSuccess/>
//       ),
      
//     },
//     {
//       path: "/orders",
//       element: (


//         <MyOrder/>
//       ),
      
//     },
//     {
//       path: "/admin/dashboard",
//       element: (


//         <Dashboard/>
//       ),
      
//     },
//     {
//       path: "/admin/product",
//       element: (


//         <NewProduct/>
//       ),
      
//     },
//     {
//       path: "/admin/product/:id",
//       element: (


//         <UpdateProduct/>
//       ),
      
//     },


//     {
//       path: "/admin/orders",
//       element: (


//         <OrderList/>
//       ),
      
//     },
//     {
//       path: "/admin/order/:id",
//       element: (


//         <ProcessOrder/>
//       ),
      
//     },
  
//     {
//       path: "/admin/users",
//       element: (


//         <UsersList/>
//       ),
      
//     },
//     {
//       path: "/admin/user/:id",
//       element: (


//         <UpdateUser/>
//       ),
      
//     },

//     {
//       path: "/admin/review",
//       element: (


//         <ProductReviews/>
//       ),
      
//     },

   
//   ]);

//   return (
//   <>
  
//     <RouterProvider router={router} />
//     </>
//   );
// }

// export default App;



// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "font-awesome/css/font-awesome.min.css";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import store from "./store";
// import { loadUser } from "./action/userAction";
// import WebFont from "webfontloader";

// import Navbar from "./Components/Layout/Header/Navbar";
// import Footer from "./Components/Layout/Footer/Footer";
// import ProtectedRoute from "./Components/Route/ProtectedRoute";

// import Home from "./Components/Home/Home";
// import ProductDetails from "./Components/Product/ProductDetails";
// import Products from "./Components/Product/Products";
// import Search from "./Components/Product/Search";
// import LoginSignup from "./Components/User/LoginSignup";
// import Profile from "./Components/User/Profile";
// import UpdateProfile from "./Components/User/UpdateProfile";
// import UpdatePassword from "./Components/User/UpdatePassword";
// import ForgotPassword from "./Components/User/ForgotPassword";
// import ResetPassword from "./Components/User/ResetPassword";
// import Cart from "./Components/Cart/Cart";
// import Shipping from "./Components/Cart/Shipping";
// import ConfirmOrder from "./Components/Cart/ConfirmOrder";
// import OrderSuccess from "./Components/Cart/OrderSuccess";
// import MyOrder from "./Components/Order/MyOrders";

// import Dashboard from "./Components/admin/Dashboard";
// import NewProduct from "./Components/admin/NewProduct";
// import UpdateProduct from "./Components/admin/UpdateProduct";
// import OrderList from "./Components/admin/OrderList";
// import ProcessOrder from "./Components/admin/ProcessOrder";
// import UsersList from "./Components/admin/UsersList";
// import UpdateUser from "./Components/admin/UpdateUser";
// import ProductReviews from "./Components/admin/ProductReviews";
// import Logout from "./Components/User/Logout";

// function App() {
//   const { isAuthenticated, user } = useSelector((state) => state.user);

//   useEffect(() => {
//     WebFont.load({
//       google: {
//         families: ["Roboto", "Droid Sans", "Chilanka"],
//       },
//     });

//     store.dispatch(loadUser());
//   }, []);

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <div className="app-container">
//           <Navbar />
//           <Home />
//           <Footer />
//         </div>
//       ),
//     },
//     {
//       path: "/product/:id",
//       element: (
//         <>
//           <Navbar />
//           <ProductDetails />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/products",
//       element: (
//         <>
//           <Navbar />
//           <Products />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/products/:keyword",
//       element: (
//         <>
//           <Navbar />
//           <Products />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/search",
//       element: (
//         <>
//           <Navbar />
//           <Search />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/login",
//       element: <LoginSignup />,
//     },
//     {
//       path: "/logout",
//       element: <Logout />,
//     },
//     {
//       path: "/password/reset/:token",
//       element: <ResetPassword />,
//     },
//     {
//       path: "/account",
//       element: 
//       <>
//       <Navbar></Navbar>
//       <Profile />
//       <Footer/>
//       </>,
//     },
//     {
//       path: "/password/update",
//       element:  
//       <UpdatePassword />
    
//     },
//     {
//       path: "/password/forgot",
//       element: <ForgotPassword />,
//     },
//     {
//       path: "/me/update",
//       element: <UpdateProfile />,
//     },
//     {
//       path: "/cart",
//       element: (
//         <>
//           <Navbar />
//           <Cart />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/shipping",
//       element: <Shipping />,
//     },
//     {
//       path: "/order/confirm",
//       element: <ConfirmOrder />,
//     },
//     {
//       path: "/success",
//       element: <ProtectedRoute isAuthenticated={isAuthenticated} element={<OrderSuccess />} />,
//     },
//     {
//       path: "/orders",
//       element: <MyOrder />,
//     },
//     {
//       path: "/admin/dashboard",
//       element: 
//       <ProtectedRoute>
//       <Dashboard />
//       </ProtectedRoute>,
//     },
//     {
//       path: "/admin/product",
//       element: <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"} element={<NewProduct />} />,
//     },
//     {
//       path: "/admin/product/:id",
//       element: <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"} element={<UpdateProduct />} />,
//     },
//     {
//       path: "/admin/orders",
//       element: <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"} element={<OrderList />} />,
//     },
//     {
//       path: "/admin/order/:id",
//       element: <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"} element={<ProcessOrder />} />,
//     },
//     {
//       path: "/admin/users",
//       element: <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"} element={<UsersList />} />,
//     },
//     {
//       path: "/admin/user/:id",
//       element: <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"} element={<UpdateUser />} />,
//     },
//     {
//       path: "/admin/review",
//       element: <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"} element={<ProductReviews />} />,
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "font-awesome/css/font-awesome.min.css";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import store from "./store";
// import { loadUser } from "./action/userAction";
// import WebFont from "webfontloader";

// import Navbar from "./Components/Layout/Header/Navbar";
// import Footer from "./Components/Layout/Footer/Footer";
// import ProtectedRoute from "./Components/Route/ProtectedRoute";

// import Home from "./Components/Home/Home";
// import ProductDetails from "./Components/Product/ProductDetails";
// import Products from "./Components/Product/Products";
// import Search from "./Components/Product/Search";
// import LoginSignup from "./Components/User/LoginSignup";
// import Profile from "./Components/User/Profile";
// import UpdateProfile from "./Components/User/UpdateProfile";
// import UpdatePassword from "./Components/User/UpdatePassword";
// import ForgotPassword from "./Components/User/ForgotPassword";
// import ResetPassword from "./Components/User/ResetPassword";
// import Cart from "./Components/Cart/Cart";
// import Shipping from "./Components/Cart/Shipping";
// import ConfirmOrder from "./Components/Cart/ConfirmOrder";
// import OrderSuccess from "./Components/Cart/OrderSuccess";
// import MyOrder from "./Components/Order/MyOrders";

// import Dashboard from "./Components/admin/Dashboard";
// import NewProduct from "./Components/admin/NewProduct";
// import UpdateProduct from "./Components/admin/UpdateProduct";
// import OrderList from "./Components/admin/OrderList";
// import ProcessOrder from "./Components/admin/ProcessOrder";
// import UsersList from "./Components/admin/UsersList";
// import UpdateUser from "./Components/admin/UpdateUser";
// import ProductReviews from "./Components/admin/ProductReviews";
// import Logout from "./Components/User/Logout";

// function App() {
//   const { isAuthenticated, user } = useSelector((state) => state.user);

//   useEffect(() => {
//     WebFont.load({
//       google: {
//         families: ["Roboto", "Droid Sans", "Chilanka"],
//       },
//     });

//     store.dispatch(loadUser());
//   }, []);

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <>
//           <Navbar />
//           <Home />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/product/:id",
//       element: (
//         <>
//           <Navbar />
//           <ProductDetails />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/products",
//       element: (
//         <>
//           <Navbar />
//           <Products />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/products/:keyword",
//       element: (
//         <>
//           <Navbar />
//           <Products />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/search",
//       element: (
//         <>
//           <Navbar />
//           <Search />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/login",
//       element: <LoginSignup />,
//     },
//     {
//       path: "/logout",
//       element: <Logout />,
//     },
//     {
//       path: "/password/reset/:token",
//       element: <ResetPassword />,
//     },
//     {
//       path: "/account",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated}>
//           <>
//             <Navbar />
//             <Profile />
//             <Footer />
//           </>
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/password/update",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated}>
//           <UpdatePassword />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/password/forgot",
//       element: <ForgotPassword />,
//     },
//     {
//       path: "/me/update",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated}>
//           <UpdateProfile />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/cart",
//       element: (
//         <>
//           <Navbar />
//           <Cart />
//           <Footer />
//         </>
//       ),
//     },
//     {
//       path: "/shipping",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated}>
//           <Shipping />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/order/confirm",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated}>
//           <ConfirmOrder />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/success",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated}>
//           <OrderSuccess />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/orders",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated}>
//           <MyOrder />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/admin/dashboard",
//       element: (
//         <ProtectedRoute isAdmin={true}>
//           <Dashboard />
//         </ProtectedRoute>
//       ),
//     },
    
//     {
//       path: "/admin/product",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"}>
//           <NewProduct />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/admin/product/:id",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"}>
//           <UpdateProduct />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/admin/orders",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"}>
//           <OrderList />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/admin/order/:id",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"}>
//           <ProcessOrder />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/admin/users",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"}>
//           <UsersList />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/admin/user/:id",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"}>
//           <UpdateUser />
//         </ProtectedRoute>
//       ),
//     },
//     {
//       path: "/admin/review",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={user?.role === "admin"}>
//           <ProductReviews />
//         </ProtectedRoute>
//       ),
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./action/userAction";
import WebFont from "webfontloader";
import axios from "axios";
import Navbar from "./Components/Layout/Header/Navbar";
import Footer from "./Components/Layout/Footer/Footer";
import ProtectedRoute from "./Components/Route/ProtectedRoute";

import Home from "./Components/Home/Home";
import ProductDetails from "./Components/Product/ProductDetails";
import Products from "./Components/Product/Products";
import Search from "./Components/Product/Search";
import LoginSignup from "./Components/User/LoginSignup";
import Profile from "./Components/User/Profile";
import UpdateProfile from "./Components/User/UpdateProfile";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Cart/Shipping";
import ConfirmOrder from "./Components/Cart/ConfirmOrder";
import OrderSuccess from "./Components/Cart/OrderSuccess";
import MyOrder from "./Components/Order/MyOrders";

import Dashboard from "./Components/admin/Dashboard";
import NewProduct from "./Components/admin/NewProduct";
import UpdateProduct from "./Components/admin/UpdateProduct";
import OrderList from "./Components/admin/OrderList";
import ProcessOrder from "./Components/admin/ProcessOrder";
import UsersList from "./Components/admin/UsersList";
import UpdateUser from "./Components/admin/UpdateUser";
import ProductReviews from "./Components/admin/ProductReviews";
import Logout from "./Components/User/Logout";
import Sidebar from "./Components/admin/Sidebar";
import ProductList from "./Components/admin/ProductList";
import UserOptions from "./Components/Layout/Header/userOption";
import PaymentWrapper from "./Components/Cart/PaymentWrapper";
import { useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeWrapper from "./Components/Cart/StripeWrapper"
import Payment from "./Components/Cart/Payment";
import LoadPayment from "./Components/Cart/LoadPayment";
import ComboBuilder from "./Components/Product/ComboBuilder";
import CheckoutCombo from "./Components/Product/CheckoutCombo"
function App() {
  // const[stripeApiKey,setStripeApiKey] = useState("");
  // async function getStripeApiKey(){
  //   const [data] = await axios.get("/api/v1/stripeapikey");
  //   setStripeApiKey(data.stripeApiKey);
  // }
  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: ["Roboto", "Droid Sans", "Chilanka"],
  //     },
  //   });

  //   store.dispatch(loadUser());

  //   getStripeApiKey();
  // }, []);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();

  // ✅ Corrected: properly extract `data` from axios response object
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey", {
        withCredentials: true, // in case your route is protected or needs cookies
      });
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    dispatch(loadUser()); // Load user on app start
    getStripeApiKey();    // Get Stripe API key
  }, [dispatch]);


  const router = createBrowserRouter([
    // Public Routes
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/product/:id",
      element: (
        <>
          <Navbar />
          <ProductDetails />
          <Footer />
        </>
      ),
    },
    {
      path: "/products",
      element: (
        <>
          <Navbar />
          <Products />
          <Footer />
        </>
      ),
    },
    {
      path: "/products/:keyword",
      element: (
        <>
          <Navbar />
          <Products />
          <Footer />
        </>
      ),
    },
    {
      path: "/search",
      element: (
        <>
          <Navbar />
          <Search />
          <Footer />
        </>
      ),
    },
    {
      path: "/sidebar",
      element: (
        <>
          <Navbar />
          <Sidebar />
          
        </>
      ),
    },
    {
      path: "/login",
      element: <LoginSignup />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/useroption",
      element: <UserOptions />,
    },

    {
      path: "/password/reset/:token",
      element: <ResetPassword />,
    },
    {
      path: "/password/forgot",
      element: <ForgotPassword />,
    },
    {
      path: "/cart",
      element: (
        <>
          <Navbar />
          <Cart />
          <Footer />
        </>
      ),
    },
    {
      path: "/combo/create",
      element: (
        <>
          <Navbar />
          <ComboBuilder />
          <Footer />
        </>
      ),
    },
    {
      path: "/checkout-combo",
      element: (
        <>
          <Navbar />
          <CheckoutCombo />
          <Footer />
        </>
      ),
    },

    // Protected Routes
    {
      element: <ProtectedRoute />, // General protected route
      children: [
        { path: "/account", element: <Profile /> },
        
        { path: "/password/update", element: <UpdatePassword /> },
        { path: "/me/update", element: <UpdateProfile /> },
        { path: "/shipping", element: <Shipping /> },
        { path: "/order/confirm", element: <ConfirmOrder /> },
        { path: "/success", element: <OrderSuccess /> },
        { path: "/orders", element: <MyOrder /> },
        { path: "/process/payment", element: stripeApiKey && <LoadPayment stripeApiKey={stripeApiKey} /> },

      ],
    },

    // Admin Routes
    {
      element: <ProtectedRoute isAdmin={true} />, // Admin protected route
      children: [
        { path: "/admin/dashboard", element: <Dashboard /> },
        { path: "/admin/product", element: <ProductList /> },
        { path: "/admin/products/new", element: <NewProduct /> },
        { path: "/admin/product/:id", element: <UpdateProduct /> },
        { path: "/admin/orders", element: <OrderList /> },
        { path: "/admin/order/:id", element: <ProcessOrder /> },
        { path: "/admin/users", element: <UsersList /> },
        { path: "/admin/user/:id", element: <UpdateUser /> },
        { path: "/admin/review", element: <ProductReviews /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
