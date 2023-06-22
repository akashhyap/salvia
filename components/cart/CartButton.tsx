import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import atob from "atob";
import jwtDecode from "jwt-decode";

const GET_CUSTOMER_DATA = gql`
  query GetCustomerData {
    customer {
      id
    }
  }
`;

const CheckoutButton: React.FC = () => {
  const [session, setSession] = useState<string | null>(null);

  const { loading, error, data } = useQuery(GET_CUSTOMER_DATA, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!loading && !error && data?.customer?.id && data.customer.id !== "" && data.customer.id !== "guest") {
      try {
        console.log('Attempting to decode customer ID...');
        const decodedCustomerId = atob(data?.customer?.id);
        const customerId = parseInt(decodedCustomerId.replace("customer:", ""), 10);
        console.log('Decoded customer ID:', customerId);
        setSession(customerId.toString());
      } catch (error) {
        console.error("Error decoding customer ID:", error);
      }
    } else if (data?.customer?.id === "guest") {
      console.log('Attempting to get session from local storage...');
      const jwtSession = window.localStorage.getItem("woo-session");
      console.log("jwtSession", jwtSession);
      if (jwtSession) {
        try {
          console.log('Attempting to decode JWT session...');
          const decoded = jwtDecode(jwtSession);
          console.log("decoded", decoded);
  
          // @ts-ignore
          if (typeof decoded.data.customer_id === "string") {
            console.log('Setting session with decoded session ID...');
            // @ts-ignore
            setSession(decoded.data.customer_id);
          } else {
            console.error("Invalid session ID format");
          }
        } catch (error) {
          console.error("Error decoding session:", error);
        }
      }
    }
  }, [loading, error, data]);
  
  useEffect(() => {
    console.log("Session ID updated: ", session);
  });

  const checkoutLink = () => {
    console.log("session id:", session);

    window.open(`https://woocommerce-186938-3327038.cloudwaysapps.com/checkout?session_id=${session}`);
  };

  return <button onClick={() => checkoutLink()} className="w-full rounded-full border border-transparent bg-gray-900 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-gray-50">Checkout</button>;
};

export default CheckoutButton;
