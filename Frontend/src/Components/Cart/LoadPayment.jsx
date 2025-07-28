import React, { useEffect, useState } from "react";
import axios from "axios";
import PaymentWrapper from "./PaymentWrapper"; // ✅ Make sure this path is correct

const backendUrl = import.meta.env.VITE_API_BASE_URL;

const LoadPayment = () => {
  const [stripeKey, setStripeKey] = useState("");

  useEffect(() => {
    const fetchStripeKey = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/v1/stripeapikey`, {
          withCredentials: true, // ✅ Important if route is protected with auth
        });
        setStripeKey(data.stripeApiKey);
      } catch (error) {
        console.error("Failed to fetch Stripe key:", error.response || error);
      }
    };

    fetchStripeKey();
  }, []);

  if (!stripeKey) return <p>Loading payment...</p>;

  return <PaymentWrapper stripeApiKey={stripeKey} />;
};

export default LoadPayment;
