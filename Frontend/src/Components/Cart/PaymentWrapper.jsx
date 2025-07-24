import React, { useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment"; // Make sure this path is correct

const PaymentWrapper = ({ stripeApiKey }) => {
  const stripePromise = useMemo(() => loadStripe(stripeApiKey), [stripeApiKey]);

  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default PaymentWrapper;
