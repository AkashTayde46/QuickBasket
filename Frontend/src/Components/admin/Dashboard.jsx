// import React, { useEffect } from "react";
// import Sidebar from "./Sidebar.jsx";
// import "./dashboard.css";
// import { Typography } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import { Doughnut, Line } from "react-chartjs-2";
// import { Chart as ChartJS, registerables } from "chart.js";
// import { useSelector, useDispatch } from "react-redux";
// import { getAdminProduct } from "../../action/productAction";
// import { getAllUsers } from "../../action/userAction.jsx";
// import MetaData from "../Layout/MetaData";

// ChartJS.register(...registerables);

// const Dashboard = () => {
//   const dispatch = useDispatch();

//   const { products } = useSelector((state) => state.products);
//   const { users } = useSelector((state) => state.allUsers);

//   let outOfStock = 0;

//   products &&
//     products.forEach((item) => {
//       if (item.Stock === 0) {
//         outOfStock += 1;
//       }
//     });

//   useEffect(() => {
//     dispatch(getAdminProduct());
//     dispatch(getAllUsers());

//     return () => {
//       // Optional: Perform any cleanup actions if needed
//     };
//   }, [dispatch]);

//   const lineState = {
//     labels: ["Initial Amount", "Amount Earned"],
//     datasets: [
//       {
//         label: "TOTAL AMOUNT",
//         backgroundColor: ["tomato"],
//         hoverBackgroundColor: ["rgb(197, 72, 49)"],
//         data: [0, 0], // Orders removed, totalAmount is now static at 0
//       },
//     ],
//   };

//   const doughnutState = {
//     labels: ["Out of Stock", "InStock"],
//     datasets: [
//       {
//         backgroundColor: ["#00A6B4", "#6800B4"],
//         hoverBackgroundColor: ["#4B5000", "#35014F"],
//         data: [outOfStock, products.length - outOfStock],
//       },
//     ],
//   };

//   return (
//     <div className="dashboard">
//       <MetaData title="Dashboard - Admin Panel" />
//       <Sidebar />

//       <div className="dashboardContainer">
//         <Typography component="h1">Dashboard</Typography>

//         <div className="dashboardSummary">
//           <div>
//             <p>
//               Total Amount <br /> ₹0
//             </p>
//           </div>
//           <div className="dashboardSummaryBox2">
//             <Link to="/admin/products">
//               <p>Product</p>
//               <p>{products && products.length}</p>
//             </Link>
//             <Link to="/admin/users">
//               <p>Users</p>
//               <p>{users && users.length}</p>
//             </Link>
//           </div>
//         </div>

//         <div className="lineChart">
//           <Line data={lineState} />
//         </div>

//         <div className="doughnutChart">
//           <Doughnut data={doughnutState} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useEffect } from "react";
// import Sidebar from "./Sidebar.jsx";
// import "./dashboard.css";
// import { Typography } from "@material-ui/core";
// import { Link, useNavigate } from "react-router-dom";
// import { Doughnut, Line } from "react-chartjs-2";
// import { useSelector, useDispatch } from "react-redux";
// import { getAdminProduct } from "../../action/productAction";
// import { getAllUsers } from "../../action/userAction.jsx";
// import MetaData from "../Layout/MetaData";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { products } = useSelector((state) => state.products);
//   const { users } = useSelector((state) => state.allUsers);
//   const { user, isAuthenticated } = useSelector((state) => state.user);

//   let outOfStock = 0;

//   products &&
//     products.forEach((item) => {
//       if (item.Stock === 0) {
//         outOfStock += 1;
//       }
//     });

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     }

//     if (user?.role !== "admin") {
//       navigate("/unauthorized");
//     } else {
//       dispatch(getAdminProduct());
//       dispatch(getAllUsers());
//     }
//   }, [dispatch, isAuthenticated, navigate, user]);

//   const lineState = {
//     labels: ["Initial Amount", "Amount Earned"],
//     datasets: [
//       {
//         label: "TOTAL AMOUNT",
//         backgroundColor: ["tomato"],
//         hoverBackgroundColor: ["rgb(197, 72, 49)"],
//         data: [0, 0], // Orders removed, totalAmount is now static at 0
//       },
//     ],
//   };

//   const doughnutState = {
//     labels: ["Out of Stock", "InStock"],
//     datasets: [
//       {
//         backgroundColor: ["#00A6B4", "#6800B4"],
//         hoverBackgroundColor: ["#4B5000", "#35014F"],
//         data: [outOfStock, products.length - outOfStock],
//       },
//     ],
//   };

//   return (
//     <div className="dashboard">
//       <MetaData title="Dashboard - Admin Panel" />
//       <Sidebar />

//       <div className="dashboardContainer">
//         <Typography component="h1">Dashboard</Typography>

//         <div className="dashboardSummary">
//           <div>
//             <p>
//               Total Amount <br /> ₹0
//             </p>
//           </div>
//           <div className="dashboardSummaryBox2">
//             <Link to="/admin/products">
//               <p>Product</p>
//               <p>{products && products.length}</p>
//             </Link>
//             <Link to="/admin/users">
//               <p>Users</p>
//               <p>{users && users.length}</p>
//             </Link>
//           </div>
//         </div>

//         <div className="lineChart">
//           <Line data={lineState} />
//         </div>

//         <div className="doughnutChart">
//           <Doughnut data={doughnutState} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useMemo } from "react";
import Sidebar from "./Sidebar.jsx";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../action/productAction";
import { getAllUsers } from "../../action/userAction.jsx";
import MetaData from "../Layout/MetaData";

// Chart.js Registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (user?.role !== "admin") {
      navigate("/unauthorized");
    } else {
      dispatch(getAdminProduct());
      dispatch(getAllUsers());
    }
  }, [dispatch, isAuthenticated, navigate, user]);

  // Fallbacks to prevent crash
  const totalProducts = products?.length || 0;
  const totalUsers = users?.length || 0;

  let outOfStock = 0;
  products?.forEach((item) => {
    if (item.Stock === 0) {
      outOfStock += 1;
    }
  });

  const lineState = useMemo(
    () => ({
      labels: ["Initial Amount", "Amount Earned"],
      datasets: [
        {
          label: "TOTAL AMOUNT",
          backgroundColor: ["tomato"],
          hoverBackgroundColor: ["rgb(197, 72, 49)"],
          data: [0, 0], // Hardcoded, update if needed
        },
      ],
    }),
    []
  );

  const doughnutState = useMemo(
    () => ({
      labels: ["Out of Stock", "InStock"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [outOfStock, totalProducts - outOfStock],
        },
      ],
    }),
    [outOfStock, totalProducts]
  );

  // Handle loading or missing data
  const loading = !products || !users;

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹0
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/product">
              <p>Product</p>
              <p>{totalProducts}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{totalUsers}</p>
            </Link>
          </div>
        </div>

        {!loading ? (
          <>
            <div className="lineChart">
              <Line data={lineState} />
            </div>

            <div className="doughnutChart">
              <Doughnut data={doughnutState} />
            </div>
          </>
        ) : (
          <p>Loading dashboard data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
