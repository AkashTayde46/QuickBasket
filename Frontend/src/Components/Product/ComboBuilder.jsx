// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createCombo } from "../../action/comboAction";
// import { getProduct } from "../../action/productAction";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import './comboBuilder.css';

// const ComboBuilder = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [selected, setSelected] = useState([]);

//   const { products } = useSelector((state) => state.products);
//   const { loading, success, error } = useSelector((state) => state.comboCreate);

//   useEffect(() => {
//     dispatch(getProduct());
//   }, [dispatch]);

//   useEffect(() => {
//     if (success) {
//       toast.success("Combo created successfully!");
//       navigate("/combos");
//     }
//     if (error) toast.error(error);
//   }, [success, error, navigate]);

//   const toggleProduct = (productId) => {
//     setSelected((prev) => {
//       const exists = prev.find((item) => item.productId === productId);
//       if (exists) {
//         return prev.filter((item) => item.productId !== productId);
//       } else {
//         return [...prev, { productId, quantity: 1 }];
//       }
//     });
//   };

//   const updateQuantity = (productId, qty) => {
//     setSelected((prev) =>
//       prev.map((item) =>
//         item.productId === productId ? { ...item, quantity: Number(qty) } : item
//       )
//     );
//   };

//   const submitHandler = () => {
//   if (selected.length < 2) return toast.error("Select at least 2 products.");

//   navigate("/checkout-combo", {
//     state: { products: selected },
//   });
// };



//   return (
//     <div className="combo-container">
//       <h2 className="combo-title">🧩 Build Your Own Combo</h2>

//       <div className="combo-grid">
//         {products &&
//           products.map((product) => {
//             const isSelected = selected.find((item) => item.productId === product._id);

//             return (
//               <div
//                 key={product._id}
//                 onClick={() => toggleProduct(product._id)}
//                 className={`combo-card ${isSelected ? "selected" : ""}`}
//               >
//                 <img
//                   src={product.images[0]?.url}
//                   alt={product.name}
//                   className="product-image"
//                 />
//                 <div className="combo-details">
//                   <h3 className="product-name">{product.name}</h3>
//                   <p className="product-price">₹{product.price}</p>

//                   {isSelected && (
//                     <div className="quantity-box">
//                       <label>Quantity:</label>
//                       <input
//                         type="number"
//                         min="1"
//                         value={
//                           selected.find((item) => item.productId === product._id)
//                             ?.quantity || 1
//                         }
//                         onClick={(e) => e.stopPropagation()}
//                         onChange={(e) => updateQuantity(product._id, e.target.value)}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//       </div>

//       <div className="submit-section">
//         <button
//           onClick={submitHandler}
//           disabled={loading}
//           className="submit-button"
//         >
//           {loading ? "Creating Combo..." : "Create Combo"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ComboBuilder;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCombo } from "../../action/comboAction";
import { getProduct } from "../../action/productAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './comboBuilder.css';

const ComboBuilder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);

  const { products } = useSelector((state) => state.products);
  const { loading, success, error } = useSelector((state) => state.comboCreate);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Combo created successfully!");
      navigate("/combos");
    }
    if (error) toast.error(error);
  }, [success, error, navigate]);

  const toggleProduct = (productId) => {
    setSelected((prev) => {
      const exists = prev.find((item) => item.productId === productId);
      if (exists) {
        return prev.filter((item) => item.productId !== productId);
      } else {
        return [...prev, { productId, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, change) => {
    setSelected((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const submitHandler = () => {
    if (selected.length < 2) return toast.error("Select at least 2 products.");

    navigate("/checkout-combo", {
      state: { products: selected },
    });
  };

  // Calculate pricing
  const totalPrice = selected.reduce((sum, item) => {
    const product = products?.find(p => p._id === item.productId);
    return sum + (product?.price * item.quantity || 0);
  }, 0);

  const totalDiscount = totalPrice * 0.15; // 15% combo discount
  const finalPrice = totalPrice - totalDiscount;

  return (
    <div className="combo-container">
      {/* Floating orb for additional animation */}
      <div className="floating-orb"></div>

      {/* Header */}
      <div className="combo-header">
        <div className="combo-badge">
          <span className="combo-badge-icon">✨</span>
          <span>Combo Builder</span>
        </div>
        <h1 className="combo-title">
          Build Your Perfect
          <br />
          <span className="combo-title-accent">Tech Combo</span>
        </h1>
        <p className="combo-subtitle">
          Mix and match your favorite tech products and save up to 15% on combo deals
        </p>
      </div>

      {/* Selected items summary */}
      {selected.length > 0 && (
        <div className="combo-summary">
          <div className="combo-summary-header">
            <span className="combo-summary-icon">📦</span>
            <h3 className="combo-summary-title">Your Combo ({selected.length} items)</h3>
          </div>
          <div className="combo-summary-grid">
            <div className="combo-summary-item">
              <div className="combo-summary-price">₹{totalPrice.toLocaleString()}</div>
              <div className="combo-summary-label">Original Price</div>
            </div>
            <div className="combo-summary-item discount">
              <div className="combo-summary-price discount">-₹{totalDiscount.toLocaleString()}</div>
              <div className="combo-summary-label discount">Combo Discount (15%)</div>
            </div>
            <div className="combo-summary-item final">
              <div className="combo-summary-price">₹{finalPrice.toLocaleString()}</div>
              <div className="combo-summary-label">Final Price</div>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="combo-grid">
        {products &&
          products.map((product) => {
            const isSelected = selected.find((item) => item.productId === product._id);
            const selectedItem = selected.find((item) => item.productId === product._id);

            return (
              <div
                key={product._id}
                onClick={() => toggleProduct(product._id)}
                className={`combo-card ${isSelected ? "selected" : ""}`}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="combo-card-indicator">
                    ✓
                  </div>
                )}

                {/* Product Image */}
                <div className="product-image-container">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-image-overlay"></div>
                </div>

                {/* Product Details */}
                <div className="combo-details">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">₹{product.price.toLocaleString()}</div>

                  {/* Quantity Controls */}
                  {isSelected && (
                    <div 
                      className="quantity-box"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => updateQuantity(product._id, -1)}
                        className="quantity-btn decrease"
                      >
                        −
                      </button>
                      <span className="quantity-value">
                        {selectedItem?.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(product._id, 1)}
                        className="quantity-btn increase"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                {/* Hover overlay */}
                <div className="combo-card-overlay"></div>
              </div>
            );
          })}
      </div>

      {/* Submit Button */}
      <div className="submit-section">
        <button
          onClick={submitHandler}
          disabled={loading || selected.length < 2}
          className="submit-button"
        >
          {loading ? (
            <div className="submit-loading">
              <div className="submit-spinner"></div>
              Creating Your Combo...
            </div>
          ) : (
            <>
              🛒
              {selected.length < 2 
                ? `Select ${2 - selected.length} More Product${2 - selected.length === 1 ? '' : 's'}`
                : 'Create Amazing Combo'
              }
            </>
          )}
          
          {/* Animated background effect */}
          {selected.length >= 2 && !loading && (
            <div className="submit-button-shimmer"></div>
          )}
        </button>

        {selected.length >= 2 && (
          <p className="submit-message">
            🎉 Great choice! You're saving ₹{totalDiscount.toLocaleString()} with this combo
          </p>
        )}
      </div>
    </div>
  );
};

export default ComboBuilder;