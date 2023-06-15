import { gql } from '@apollo/client';

export const GET_SITE_LOGO = gql`
  query GetSiteLogo {
    getHeader {
      siteLogoUrl
    }
  }
`;

export const GET_OPTIONS = gql`
  query GetOptions {
    options {
      topInformationBar {
        informationBar
      }
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query {
    products(first: 21) {
      edges {
        node {
          id
          slug
          name
          type
          databaseId
          productCategories {
            edges {
              node {
                id
                slug
                name
              }
            }
          }
          shortDescription
          image {
            id
            sourceUrl
            altText
          }
          ... on SimpleProduct {
            onSale
            stockStatus
            price
            regularPrice
            salePrice
          }
          ... on VariableProduct {
            onSale
            stockStatus
            price
            regularPrice
            salePrice
          }
        }
      }
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id, idType: SLUG) {
      seo {
        title
        metaDesc
      }
      id
      databaseId
      averageRating
      slug
      uri
      description
      shortDescription
      productBrand {
        brand
      }
      productDescription {
        descriptionContent
        faqContent {
          question
          answer
        }
        shippingContent
        effectsContent
        usageAndDosageContent
      }
      onSale
      image {
        id
        uri
        title
        srcSet
        sourceUrl
      }
      name
      ... on SimpleProduct {
        salePrice
        regularPrice
        stockStatus
        price
        id
        sku
        stockQuantity
      }
      ... on VariableProduct {
        salePrice
        regularPrice
        stockStatus
        price
        id
        sku
        allPaSizes {
          nodes {
            name
          }
        }
        variations {
          nodes {
            id
            databaseId
            name
            sku
            stockStatus
            stockQuantity
            purchasable
            onSale
            salePrice
            regularPrice
            description
          }
        }
      }
      ... on ExternalProduct {
        price
        id
        externalUrl
      }
      ... on GroupProduct {
        products {
          nodes {
            ... on SimpleProduct {
              id
              price
            }
          }
        }
        id
      }
    }
  }
`;
export const GET_PRODUCT_BY_DATABASE_ID = gql`
  query Product($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      seo {
        title
        metaDesc
      }
      id
      databaseId
      averageRating
      slug
      uri
      description
      shortDescription
      productBrand {
        brand
      }
      productDescription {
        descriptionContent
        faqContent {
          question
          answer
        }
        shippingContent
      }
      onSale
      image {
        id
        uri
        title
        srcSet
        sourceUrl
      }
      name
      ... on SimpleProduct {
        salePrice
        regularPrice
        stockStatus
        price
        id
        sku
        stockQuantity
      }
      ... on VariableProduct {
        salePrice
        regularPrice
        stockStatus
        price
        id
        sku
        allPaSizes {
          nodes {
            name
          }
        }
        variations {
          nodes {
            id
            databaseId
            name
            sku
            stockStatus
            stockQuantity
            purchasable
            onSale
            salePrice
            regularPrice
            description
          }
        }
      }
      ... on ExternalProduct {
        price
        id
        externalUrl
      }
      ... on GroupProduct {
        products {
          nodes {
            ... on SimpleProduct {
              id
              price
            }
          }
        }
        id
      }
    }
  }
`;

export const GET_ALL_PAGES = gql`
  query GetAllPages {
      pages {
          nodes {
              title
              content
              uri
              slug
              productCategory {
                productCategory
              }
          }
      }
  }
`;

export const GET_HOME_PAGE = gql`
   query GetHomePage {
    page(id: "122", idType: DATABASE_ID) {
      heroGallery {
        heroGallery {
          sourceUrl
        }
      }
    }
   }
`
export const GET_MENU = gql`
  query GetMenu($id: ID!) {
    menu(id: $id, idType: DATABASE_ID) {
      menuItems {
        edges {
          node {
            id
            label
            uri
            childItems {
              edges {
                node {
                  id
                  label
                  uri
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logOut {
    logout(input: {}) {
      status
    }
  }
`;

export const GET_CUSTOMER_ORDERS = gql`
  query GetCustomerOrders($customerId: Int) {
    customer(customerId: $customerId) {
      firstName
      email
      id
      orders {
        nodes {
          id
          databaseId
          orderKey
          date
          total
          status
          lineItems {
            nodes {
              variation {
                node {
                  databaseId
                  name
                  regularPrice
                  attributes {
                    nodes {
                        name
                        label
                    }
                  }
                }
              }
              product {
                node {
                  name
                  slug
                  ... on SimpleProduct {
                    id
                    databaseId
                    name
                    price
                    featuredImage {
                      node {
                        sourceUrl
                      }
                    }
                  }
                  ... on VariableProduct {
                    id
                    databaseId
                    name
                    price
                    variations {
                      nodes {
                        databaseId
                        name
                        price
                        attributes {
                          nodes {
                            name
                            label
                          }
                        }
                      }
                    }
                    featuredImage {
                      node {
                        sourceUrl
                      }
                    }
                  }
                }
              }
            }
          }
          billing {
            firstName
            lastName
            company
            address1
            address2
            city
            state
            postcode
            country
            email
            phone
          }
          customer {
            id
          }
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
    query AllPostsQuery {
      posts {
        nodes {
          title
          content
          date
          uri
        }
      }
    }
  `;