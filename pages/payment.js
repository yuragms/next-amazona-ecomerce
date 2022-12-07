import Router from "next/router";
import React, { useEffect } from "react";

export default function payment() {
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    }
  }, []);
  return <div></div>;
}
