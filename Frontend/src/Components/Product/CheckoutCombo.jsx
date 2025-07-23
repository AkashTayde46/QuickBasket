import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../action/productAction";
import "./checkoutCombo.css"; // if you have custom styles

const CheckoutCombo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedProducts = location.state?.products || [];

  const { products: allProducts = [] } = useSelector((state) => state.products);

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      dispatch(getProduct());
    }
  }, [dispatch, allProducts]);

  const itemsWithDetails = selectedProducts
    .map((selected) => {
      const fullProduct = allProducts.find((p) => p._id === selected.productId);

      if (!fullProduct) return null;

      return {
        ...fullProduct,
        quantity: selected.quantity,
        totalPrice: selected.quantity * fullProduct.price,
      };
    })
    .filter((item) => item !== null);

  const subtotal = itemsWithDetails.reduce((acc, item) => acc + item.totalPrice, 0);
  const discount = Math.floor(subtotal * 0.1); // 10% discount
  const totalAfterDiscount = subtotal - discount;

  const handlePlaceOrder = () => {
    // Here you can call your place order API or redirect
    
    navigate("/process/payment");
  };

  return (
    <div className="checkout-container">
      <h2>🛒 Combo Checkout</h2>

      {itemsWithDetails.length === 0 ? (
        <p>No product data found. Please go back and build a combo again.</p>
      ) : (
        <div>
          <div className="checkout-grid">
            {itemsWithDetails.map((item) => (
              <div key={item._id} className="checkout-card">
                <img
                  src={item.images[0]?.url}
                  alt={item.name}
                  className="checkout-image"
                />
                <div className="checkout-info">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ₹{item.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <p>Subtotal: ₹{subtotal}</p>
            <p>Discount: ₹{discount}</p>
            <h3>Total: ₹{totalAfterDiscount}</h3>

            <button onClick={handlePlaceOrder} className="checkout-button">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutCombo;
