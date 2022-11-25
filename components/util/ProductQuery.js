import { gql } from "graphql-request";

const categoryQurey = gql`
  query category {
    collections(first: 10, sortKey: TITLE) {
      edges {
        node {
          handle
          title
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                description
                priceRange {
                  minVariantPrice {
                    amount
                  }
                }
                images(first: 5) {
                  edges {
                    node {
                      url
                    }
                  }
                }
                collections(first: 1) {
                  edges {
                    node {
                      handle
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const singleProductQuery = gql`
  query singleProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
      collections(first: 1) {
        edges {
          node {
            handle
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
        }
      }
      images(first: 5) {
        edges {
          node {
            url
          }
        }
      }
    }
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
          collections(first: 1) {
            edges {
              node {
                handle
              }
            }
          }
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

const allData = gql`
  query collections {
    collections(first: 10, sortKey: TITLE) {
      edges {
        node {
          title
          handle
          image {
            url
          }
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                priceRange {
                  minVariantPrice {
                    amount
                  }
                }
                collections(first: 1) {
                  edges {
                    node {
                      handle
                    }
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      url
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export { categoryQurey, singleProductQuery, allData };
