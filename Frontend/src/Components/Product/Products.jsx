import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../action/productAction";
import Loader from "../layout/Loader/Loader";
import { useParams } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import Product from "../Home/Product"; // Make sure this path is correct for your Product component
import MetaData from "../Layout/MetaData";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import Pagination from "react-js-pagination";

const categories = [ // This array is not directly used in the JSX, consider removing if redundant
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Shoes",
  "bat",
  "Attire",
  "Laptops",
  "Camera",
  "Mobiles",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // New state for filter visibility

  const {
    products = [],
    loading,
    error,
    productsCount = 0, // Total products without filters
    resultPerPage = 8,
    filteredProductsCount = 0, // Products after applying filters
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  // Toggle filter box visibility
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
    // Optionally close filter when a filter is applied or page changes
    // setIsFilterOpen(false);
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  // Use filteredProductsCount for pagination logic, as it represents the items relevant to current filters
  let count = filteredProductsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          {/* Apply 'filter-open' class to the main container when the filter is open for the overlay */}
          <div className={`productsPageContainer ${isFilterOpen ? 'filter-open' : ''}`}>
            <h2 className="productsHeading">Products</h2>

            {/* Filter Toggle Button - Visible on smaller screens */}
            <button className="filterToggleButton" onClick={toggleFilter}>
              {isFilterOpen ? "✖ Close Filters" : "Filter Options ▼"}
            </button>

            {/* Content Wrapper holds both the filter and product display */}
            <div className="contentWrapper">
              {/* Filter Box - Conditionally rendered with 'open' class */}
              <div className={`filterBox ${isFilterOpen ? "open" : ""}`}>
                <Typography className="filterTitle">Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={950000}
                />

                <Typography className="filterTitle">Categories</Typography>
                <ul className="categoryBox">
                  {[
                    "Electronics",
                    "Clothing",
                    "Books",
                    "Furniture",
                    "shoes",
                    "bat",
                    "laptop",
                  ].map((categoryItem) => (
                    <li
                      className={`category-link ${category === categoryItem ? "active" : ""}`}
                      key={categoryItem}
                      onClick={() => {
                        setCategory(categoryItem);
                        // Optionally close filter on category select
                        // setIsFilterOpen(false);
                      }}
                    >
                      {categoryItem}
                    </li>
                  ))}
                </ul>

                <fieldset>
                  <Typography component="legend" className="filterTitle">Ratings Above</Typography>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => setRatings(newRating)}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </fieldset>
              </div>

              {/* Products Container - holds the product grid and pagination */}
              <div className="productsContainer">
                <div className="products">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))
                  ) : (
                    <h3>No products found</h3>
                  )}
                </div>

                {/* Pagination - only show if there are more products than can fit on one page */}
                {resultPerPage < count && (
                  <div className="paginationBox">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={count}
                      onChange={setCurrentPageNo}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;