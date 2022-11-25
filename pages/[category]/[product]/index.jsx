import Image from "next/image";
import { gql } from "graphql-request";
import { singleProductQuery } from "../../../util/productQuery";
import { storefront } from "../../../util/shopify";
import AddToCartBtn from "../../../components/parts/AddToCartBtn";
import ProductCard from "../../../components/parts/ProductCard";
import styles from "../../../styles/product/Product.module.css";

export async function getStaticPaths() {
  const { data } = await storefront(gql`
    {
      products(first: 10) {
        edges {
          node {
            handle
            collections(first: 1) {
              edges {
                node {
                  handle
                }
              }
            }
          }
        }
      }
    }
  `);

  const paths = data.products.edges.map((product) => ({
    params: {
      category: product.node.collections.edges[0].node.handle,
      product: product.node.handle,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await storefront(singleProductQuery, {
    handle: params.product,
  });

  const currCat = params.category;
  const product = data.productByHandle;
  const products = data.products;
  return {
    props: {
      product: product,
      products: products,
    },
  };
}

const Page = ({ product, products }) => {
  const imgSrcs = product.images.edges.map(({ node }) => node.url);
  const mainImgSrc = imgSrcs.shift();
  const varinantId = product.variants.edges[0].node.id;

  const recommendedProducts = products.edges.filter(
    (item) => item.node.handle !== product.handle
  );
  const items = [...Array(7)].map(
    () =>
      recommendedProducts.splice(
        Math.floor(Math.random() * recommendedProducts.length),
        1
      )[0]
  );
  const recommended = items.slice(0, 5);
  return (
    <div className={styles.container}>
      <div className={styles.baner}>Free shipping : order $100+ !!</div>

      <div className={styles.product}>
        <div className={styles.imgs}>
          <div className={styles.imgWrapper}>
            <Image
              src={mainImgSrc}
              alt=""
              width={1440}
              height={750}
              layout={"responsive"}
            />
          </div>

          <div className={styles.subImgs}>
            {imgSrcs.map((src, key) => {
              return (
                <div key={key} className={styles.subImgWrapper}>
                  <Image src={src} alt="" layout="fill" objectFit="cover" />
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.detailsContainer}>
          <div className={styles.details}>
            <p className={styles.name}>{product.title}</p>
            <p className={styles.desc}>{product.description}</p>
            <p className={styles.price}>
              ${product.priceRange.minVariantPrice.amount}
            </p>
          </div>

          <AddToCartBtn variantId={varinantId} />
        </div>
      </div>

      <div className={styles.recommendContainer}>
        <h1 className={styles.h1}>recommended products</h1>
        <div className={styles.itemContainer}>
          {recommended.map(({ node }, key) => {
            const category = node.collections.edges.map(
              ({ node }) => node.handle
            );

            return <ProductCard key={key} category={category} product={node} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
