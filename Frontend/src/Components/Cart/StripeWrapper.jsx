// StripeWrapper.js
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Payment from "./Payment"; // adjust path if needed

const StripeWrapper = () => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const getKey = async () => {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripePromise(loadStripe(data.stripeApiKey));
    };
    getKey();
  }, []);

  if (!stripePromise) return <p>Loading Payment Gateway...</p>;

  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default StripeWrapper;
