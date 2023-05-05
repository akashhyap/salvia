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
    products(first: 10) {
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
      id
      databaseId
      averageRating
      slug
      description
      shortDescription
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
        stockQuantity
      }
      ... on VariableProduct {
        salePrice
        regularPrice
        stockStatus
        price
        id
        allPaSizes {
          nodes {
            name
          }
        }
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
            stockStatus
            stockQuantity
            purchasable
            onSale
            salePrice
            regularPrice
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
      email
      id
      orders {
        nodes {
          id
          orderKey
          date
          total
          status
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
