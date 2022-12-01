import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  AppBar,
  Badge,
  Container,
  createTheme,
  CssBaseline,
  Link,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import { Store } from "../utils/store";
import Cookies from "js-cookie";

export default function Layout({ title, description, children }) {
  const [cartItemsCount, setCartItemsCount] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart } = state;

  //fixin React Hydration Error
  useEffect(() => {
    cart.cartItems.length > 0
      ? setCartItemsCount(cart.cartItems.length)
      : setCartItemsCount(false);
  }, [cart]);

  useEffect(() => {
    darkMode ? setIsDarkMode(true) : setIsDarkMode(false);
  }, [darkMode]);

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6reem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4reem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      body1: {
        fontWeight: "normal",
      },
    },
    palette: {
      type: isDarkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });
  const classes = useStyles();

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : `Next Amazona`}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Typography className={classes.brand}>amazona</Typography>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={isDarkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart" passHref>
                {/* {cart.cartItems.length > 0 ? (
                  <Badge color="secondary" badgeContent={cart.cartItems.length}>
                    Cart
                  </Badge>
                ) : (
                  "Cart"
                )} */}
                {cartItemsCount ? (
                  <Badge
                    color="secondary"
                    badgeContent={cartItemsCount}
                    overlap="rectangular"
                  >
                    Cart
                  </Badge>
                ) : (
                  "Cart"
                )}
              </NextLink>
              <NextLink href="/login" passHref>
                Login
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. Next Amazona</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
