// import {
//   ADD_TO_CART,
//   REMOVE_CART_ITEM,
//   SAVE_SHIPPING_INFO,
//   CLEAR_CART, 
// } from "../constant/cartConstant";

// // Local storage helpers
// const saveToLocalStorage = (key, data) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(data));
//   } catch (error) {
//     console.error(`Error saving ${key} to localStorage:`, error);
//   }
// };

// const loadFromLocalStorage = (key) => {
//   try {
//     const savedData = localStorage.getItem(key);
//     return savedData ? JSON.parse(savedData) : undefined;
//   } catch (error) {
//     console.error(`Error loading ${key} from localStorage:`, error);
//     return undefined;
//   }
// };

// // Initial state, loading from localStorage
// const initialState = {
//   cartItems: loadFromLocalStorage("cartItems") || [],
//   shippingInfo: loadFromLocalStorage("shippingInfo") || {},
// };

// export const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       const item = action.payload;

//       const isItemExist = state.cartItems.find((i) => i.product === item.product);

//       const updatedCartItems = isItemExist
//         ? state.cartItems.map((i) => (i.product === isItemExist.product ? item : i))
//         : [...state.cartItems, item];

//       saveToLocalStorage("cartItems", updatedCartItems); // Persist updated cart
//       return {
//         ...state,
//         cartItems: updatedCartItems,
//       };

//     case REMOVE_CART_ITEM:
//       const filteredCartItems = state.cartItems.filter(
//         (i) => i.product !== action.payload
//       );

//       saveToLocalStorage("cartItems", filteredCartItems); // Persist updated cart
//       return {
//         ...state,
//         cartItems: filteredCartItems,
//       };

//     case SAVE_SHIPPING_INFO:
//       saveToLocalStorage("shippingInfo", action.payload); // Persist shipping info
//       return {
//         ...state,
//         shippingInfo: action.payload,
//       };
//       case CLEAR_CART:
//   saveToLocalStorage("cartItems", []);
//   return {
//     ...state,
//     cartItems: [],
//   };


//     default:
//       return state;
//   }
// };
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  CLEAR_CART, 
} from "../constant/cartConstant";

// Local storage helpers
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const loadFromLocalStorage = (key) => {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : undefined;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return undefined;
  }
};

// Initial state, loading from localStorage
const initialState = {
  // cartItems: loadFromLocalStorage("cartItems") || [],
  cartItems:  [],
  shippingInfo:  {},
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const item = action.payload;

      const isItemExist = state.cartItems.find((i) => i.product === item.product);

      const updatedCartItems = isItemExist
        ? state.cartItems.map((i) => (i.product === isItemExist.product ? item : i))
        : [...state.cartItems, item];

      saveToLocalStorage("cartItems", updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case REMOVE_CART_ITEM: {
      const filteredCartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );

      saveToLocalStorage("cartItems", filteredCartItems);
      return {
        ...state,
        cartItems: filteredCartItems,
      };
    }

    case SAVE_SHIPPING_INFO: {
      saveToLocalStorage("shippingInfo", action.payload);
      return {
        ...state,
        shippingInfo: action.payload,
      };
    }

    case CLEAR_CART: {
      saveToLocalStorage("cartItems", []);
      return {
        ...state,
        cartItems: [],
      };
    }

    default:
      return state;
  }
};
