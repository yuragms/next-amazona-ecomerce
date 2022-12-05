import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Store } from "../utils/store";

export default function Shipping() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  //fix router error
  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
  }, []);

  return <div>Shipping</div>;
}
