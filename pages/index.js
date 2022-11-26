import Head from "next/head";
import Hero from "../components/main/Hero";
import News from "../components/main/News";
import Categories from "../components/main/Categories";
import PickUp from "../components/main/PickUp";
import DesignedRoom from "../components/main/DesignedRoom";
import { storefront } from "../util/shopify";
import { allData } from "../util/ProductQuery";
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  const { allData } = data;
  const firstItems = allData.collections.edges.map(({ node }) => node)
    ? allData.collections.edges.map(({ node }) => node)
    : [];

  const pickpuItems = firstItems.map((item) =>
    item.products.edges.map((item) => item.node)
  );
  const products = pickpuItems.map((item) => item[0]);

  const catData = firstItems.map((cat) => {
    const category = cat.title;
    const catHandle = cat.handle;
    const catImg = cat.image;
    return { category, catHandle, catImg };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Interior EC</title>
        <meta name="description" content="Find your best interior" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Hero />
      <News />

      <Categories categories={catData} />
      <PickUp products={products} />
      <DesignedRoom />
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await storefront(allData);

  return {
    props: {
      data: {
        allData: data,
      },
    },
  };
}
