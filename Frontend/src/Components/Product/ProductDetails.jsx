// import React, { useEffect, useState } from "react";
// import Carousel from "react-material-ui-carousel";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom"; // Access route parameter
// import { getProductDetails } from "../../action/productAction";
// import ReactStars from "react-rating-stars-component";
// import MetaData from "../Layout/MetaData";
// import Loader from "../layout/Loader/Loader";
// import "./ProductDetails.css";
// import {useAlert} from "react-alert"
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

// const ProductDetails = () => {
//   const { id } = useParams(); // Access route parameter
//   const dispatch = useDispatch();
// const alert = useAlert();
//   // Local State
//   const [quantity, setQuantity] = useState(1);
//   const [open, setOpen] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   const { product, loading, error } = useSelector((state) => state.productDetails);

//   // Quantity handlers
//   const increaseQuantity = () => {
//     if (quantity < (product.Stock || 0)) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   // Review submission toggle
//   const submitReviewToggle = () => {
//     setOpen(!open);
//   };

//   // Review submission handler
//   const reviewSubmitHandler = () => {
//     // Handle review submission logic here
//     console.log("Rating:", rating, "Comment:", comment);
//     setOpen(false); // Close dialog after submission
//   };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     dispatch(getProductDetails(id)); // Use id from useParams
//   }, [dispatch, id, error,alert]);

//   const options = {
//     size: "large",
//     readOnly: true,
//     precision: 0.5,
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         product && (
//           <>
//             <MetaData title={`${product.name || "Product"} -- ECOMMERCE`} />
//             <div className="ProductDetails">
//               <div>
//                 <Carousel>
//                   {product.images &&
//                     product.images.map((item, i) => (
//                       <img
//                         className="CarouselImage"
//                         key={i}
//                         src={item.url}
//                         alt={`${i} Slide`}
//                       />
//                     ))}
//                 </Carousel>
//               </div>

//               <div>
//                 <div className="detailsBlock-1">
//                   <h2>{product.name}</h2>
//                   <p>Product # {product._id}</p>
//                 </div>
//                 <div className="detailsBlock-2">
//                   <ReactStars {...options} value={product.ratings || 0} />
//                   <span className="detailsBlock-2-span">
//                     {" "}
//                     ({product.numOfReviews || 0} Reviews)
//                   </span>
//                 </div>
//                 <div className="detailsBlock-3">
//                   <h1>{`₹${product.price || 0}`}</h1>
//                   <div className="detailsBlock-3-1">
//                     <div className="detailsBlock-3-1-1">
//                       <button onClick={decreaseQuantity}>-</button>
//                       <input readOnly type="number" value={quantity} />
//                       <button onClick={increaseQuantity}>+</button>
//                     </div>
//                     <button
//                       disabled={product.Stock < 1 ? true : false}
//                       onClick={() => console.log("Add to cart logic")}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>

//                   <p>
//                     Status:
//                     <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
//                       {product.Stock < 1 ? "OutOfStock" : "InStock"}
//                     </b>
//                   </p>
//                 </div>

//                 <div className="detailsBlock-4">
//                   Description : <p>{product.description}</p>
//                 </div>

//                 <button onClick={submitReviewToggle} className="submitReview">
//                   Submit Review
//                 </button>
//               </div>
//             </div>

//             <h3 className="reviewsHeading">REVIEWS</h3>

//             <Dialog
//               aria-labelledby="simple-dialog-title"
//               open={open}
//               onClose={submitReviewToggle}
//             >
//               <DialogTitle>Submit Review</DialogTitle>
//               <DialogContent className="submitDialog">
//                 <ReactStars
//                   onChange={(newRating) => setRating(newRating)}
//                   value={rating}
//                   size="large"
//                 />

//                 <textarea
//                   className="submitDialogTextArea"
//                   cols="30"
//                   rows="5"
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 ></textarea>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={submitReviewToggle} color="secondary">
//                   Cancel
//                 </Button>
//                 <Button onClick={reviewSubmitHandler} color="primary">
//                   Submit
//                 </Button>
//               </DialogActions>
//             </Dialog>

//             {product.reviews && product.reviews.length > 0 ? (
//               <div className="reviews">
//                 {product.reviews.map((review) => (
//                   <div key={review._id}>
//                     <strong>{review.name}</strong>
//                     <ReactStars value={review.rating} {...options} />
//                     <p>{review.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="noReviews">No Reviews Yet</p>
//             )}
//           </>
//         )
//       )}
//     </>
//   );
// };

// export default ProductDetails;


import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails, clearErrors } from "../../action/productAction";
import ReactStars from "react-rating-stars-component";
import MetaData from "../Layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../action/cartAction";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import "./ProductDetails.css";
import { NEW_REVIEW_RESET } from "../../constant/productConstant";

const ProductDetails = () => {
  const { id } = useParams(); // Extract product ID from URL
  const dispatch = useDispatch();
  const alert = useAlert();

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  // Increase quantity
const increaseQuantity = () => {
  if (quantity >= ( 0)) {
    return; // Prevent increasing beyond stock
  }
  setQuantity((prevQuantity) => prevQuantity + 1); // Increment quantity
};

// Decrease quantity
const decreaseQuantity = () => {
  if (quantity <= 1) {
    return; // Prevent decreasing below 1
  }
  setQuantity((prevQuantity) => prevQuantity - 1); // Decrement quantity
};

  // Add to Cart
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  // Submit Review Modal Toggle
  const submitReviewToggle = () => {
    setOpen(!open);
  };

  // Submit Review
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping"); // Replacing history.push with navigate
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError,success]);

  const options = {
    size: "large",
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        product && (
          <>
            <MetaData title={`${product.name || "Product"} -- ECOMMERCE`} />
            <div className="ProductDetails">
            <div className="ProductImageContainer">
  {product.images && product.images.length > 0 ? (
    <img
      className="ProductImage"
      src={product.images[0].url} // Display the first image
      alt="Product"
    />
  ) : (
    <p>No image available</p> // Fallback if no images are found
  )}
</div>


              <div>
                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                  <ReactStars {...options} value={product.ratings || 0} />
                  <span className="detailsBlock-2-span">
                    ({product.numOfReviews || 0} Reviews)
                  </span>
                </div>
                <div className="detailsBlock-3">
                  <h1>{`₹${product.price || 0}`}</h1>
                  <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
  <button
    aria-label="Decrease quantity"
    onClick={decreaseQuantity}
    disabled={quantity <= 1}
  >
    -
  </button>
  <input
    readOnly
    type="number"
    value={quantity}
    aria-label={`Selected quantity: ${quantity}`}
  />
  <button
    aria-label="Increase quantity"
    onClick={increaseQuantity}
    disabled={quantity >= (product?.Stock || 0)} // Fallback to 0 if Stock is undefined
  >
    +
  </button>
</div>

                    <button
                      disabled={product.Stock < 1}
                      onClick={addToCartHandler} // Correctly call the handler
                    >
                      Add to Cart
                    </button>
                  </div>
                  <p>
                    Status:
                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                      {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>

                <div className="detailsBlock-4">
                  Description: <p>{product.description}</p>
                </div>

                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>
               
              </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <ReactStars
                  onChange={(newRating) => setRating(newRating)}
                  value={rating}
                  size="large"
                />
                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {product.reviews && product.reviews.length > 0 ? (
              <div className="reviews">
                {product.reviews.map((review) => (
                  <div key={review._id}>
                    <strong>{review.name}</strong>
                    <ReactStars value={review.rating} {...options} />
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </>
        )
      )}
    </>
  );
};

export default ProductDetails;
