import "../styles/globals.css";
import Layout from "../components/Layout";
import { storefront } from "../util/shopify";
import { allData } from "../util/productQuery";
import Header from "../components/header/Header";

import NextApp from "next/app";
import Footer from "../components/footer/Footer";

const MyApp = ({ Component, pageProps, productsArr, categories }) => {
  return (
    <Layout>
      <Header categories={categories} productsArr={productsArr} />
      <Component {...pageProps} />
      <Footer categories={categories} />
    </Layout>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext);

  const { data } = await storefront(allData);

  const categories = data.collections.edges.map(({ node }) => node.title);

  let productsArr = [];
  const pushProducts = data.collections.edges.map(({ node }) =>
    node.products.edges.map((item) => productsArr.push(item.node))
  );

  return { ...appProps, productsArr, categories };
};

export default MyApp;
