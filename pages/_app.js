import "../styles/globals.css";
import { createGlobalStyle } from "styled-components";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import App from "next/app";

export const GlobalContext = createContext({});

const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; */
    font-family:'Gothic',sans-serif;
    text-rendering: optimizeLegibility;
  }`;

function MyApp({ Component, pageProps }) {
  const { categories } = pageProps;
  return (
    <>
      <GlobalContext.Provider value={categories}>
        <GlobalStyles />
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  const categories = await fetchAPI("/categories");
  // Pass the data to our page via props
  return { ...appProps, pageProps: { categories } };
};

export default MyApp;
