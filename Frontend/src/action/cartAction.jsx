// import {
//   ADD_TO_CART,
//   REMOVE_CART_ITEM,
//   SAVE_SHIPPING_INFO,
//   CLEAR_CART,
// } from "../constant/cartConstant";
// import axios from "axios";

// // Add to Cart
// export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
//   try {
//     // Fetch product details from the backend
//     const { data } = await axios.get(`/api/v1/product/${id}`);

//     // Validate quantity against available stock
//     if (quantity > data.product.Stock) {
//       return alert("Quantity exceeds available stock!");
//     }

//     // Dispatch action to add item to cart
//     dispatch({
//       type: ADD_TO_CART,
//       payload: {
//         product: data.product._id,
//         name: data.product.name,
//         price: data.product.price,
//         image: data.product.images[0].url,
//         stock: data.product.Stock,
//         quantity,
//       },
//     });

//     // Update localStorage with the current cart state
//     const { cartItems } = getState().cart;
//     // localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   } catch (error) {
//     console.error("Failed to add item to cart:", error);
//     alert("An error occurred while adding the item to the cart. Please try again.");
//   }
// };

// // REMOVE FROM CART
// export const removeItemsFromCart = (id) => async (dispatch, getState) => {
//   dispatch({
//     type: REMOVE_CART_ITEM,
//     payload: id,
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
// };

// // SAVE SHIPPING INFO
// export const saveShippingInfo = (data) => async (dispatch) => {
//   dispatch({
//     type: SAVE_SHIPPING_INFO,
//     payload: data,
//   });

//   // localStorage.setItem("shippingInfo", JSON.stringify(data));
// };
// export const clearCart = () => (dispatch) => {
//   dispatch({ type: CLEAR_CART });
//   localStorage.removeItem("cartItems");
// };

import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,
} from "../constant/cartConstant";
import axios from "axios";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    if (quantity > data.product.Stock) {
      return alert("Quantity exceeds available stock!");
    }

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });

    const { cartItems } = getState().cart;
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // ✅
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    alert("An error occurred while adding the item to the cart. Please try again.");
  }
};

// Remove from Cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)); // ✅
};

// Save Shipping Info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data)); // ✅
};

// Clear Cart
export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
  localStorage.removeItem("cartItems"); // ✅
};
