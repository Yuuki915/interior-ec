import ItemContainer from "../../components/parts/ItemContainer";
import { categoryQurey } from "../../util/ProductQuery";
import { storefront } from "../../util/shopify";
import { gql } from "graphql-request";
import styles from "../../styles/categories/Products.module.css";

export async function getStaticPaths() {
  const { data } = await storefront(gql`
    {
      collections(first: 10) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `);
  const paths = data.collections.edges.map((collection) => ({
    params: {
      category: collection.node.handle,
    },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await storefront(categoryQurey, {
    category: params.category,
  });

  const currCat = params.category;
  const products = data.collections.edges.map(({ node }) => node);

  return {
    props: {
      products: products.filter((item) => item.handle === currCat),
    },
  };
}

const Categories = ({ products }) => {
  const category = products[0].title;

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>{category}</h1>
      <ItemContainer products={products} />
    </div>
  );
};

export default Categories;
