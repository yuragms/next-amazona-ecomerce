import React from "react";
import { Head } from "next/head";
import { AppBar } from "@material-ui/core";

export default function Layout() {
  return (
    <div>
      <Head>
        <title>Next Amazona</title>
      </Head>
      <AppBar position="static"></AppBar>
    </div>
  );
}
