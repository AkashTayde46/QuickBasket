import React, { useEffect, useState } from "react";
import axios from "axios";
import PaymentWrapper from "./PaymentWrapper"; // ✅ Ensure the path is correct

const LoadPayment = () => {
  const [stripeKey, setStripeKey] = useState("");

  useEffect(() => {
    axios.get("/api/v1/stripeapikey")
      .then(res => setStripeKey(res.data.stripeApiKey))
      .catch(err => console.error("Failed to fetch Stripe key", err));
  }, []);

  if (!stripeKey) return <p>Loading payment...</p>;

  return <PaymentWrapper stripeApiKey={stripeKey} />;
};

export default LoadPayment;
