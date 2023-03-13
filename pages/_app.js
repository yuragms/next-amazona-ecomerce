import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SnackbarProvider } from 'notistack';
// import { useEffect } from "react";
// import "../styles/globals.css";
import { StoreProvider } from '../utils/store';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // function MyApp({ Component, pageProps }) {
  //   useEffect(() => {
  //     const jssStyles = document.querySelector('#jss-server-side');
  //     if (jssStyles) {
  //       jssStyles.parentElement.removeChild(jssStyles);
  //     }
  //   }, []);
  return (
    // <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    //   <StoreProvider>
    //     <PayPalScriptProvider deferLoading={true}>
    //       <Component {...pageProps} />
    //     </PayPalScriptProvider>
    //   </StoreProvider>
    // </SnackbarProvider>
    <CacheProvider value={emotionCache}>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <StoreProvider>
          <PayPalScriptProvider deferLoading={true}>
            <Component {...pageProps} />
          </PayPalScriptProvider>
        </StoreProvider>
      </SnackbarProvider>
    </CacheProvider>
  );
}

export default MyApp;
