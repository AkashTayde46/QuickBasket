import React from "react";
import "./Home.css"; // Add this to your Home.js file
import { CgMouse } from "react-icons/cg"; // Corrected import
import Loader from "../Layout/Loader/Loader";
import Product from "./Product"
import MetaData from "../Layout/MetaData"
import { useEffect } from "react";
import { getProduct } from "../../action/productAction";
import {useSelector,useDispatch} from "react-redux"
import { useAlert } from 'react-alert';
import { clearErrors } from "../../action/productAction";




const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  // Fetching products from Redux state
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);
  
  return (
    <>
   {loading ? (<Loader/>):(
     <>
     <MetaData title="Ecommerce"/>
       <div className="banner">
        <img src="" alt="" />
        
         <h3>Find amazing products below</h3>
         <a href="#container">
           <button>
             scroll <CgMouse />
           </button>
         </a>
       </div>
       <h2 className="homeHeading">Featured Product</h2>
       <div className="container" id="container">
        
       {products &&
               products.map((product) => (
                 <Product key={product._id} product={product} />
               ))}
           </div>
     </>
   )}
    </>
  );
};

export default Home;
