import Product from "./products/product";

interface ProductNode {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  price: string;
  type: string;
  // Other properties of the product go here.
}

interface ProductEdge {
  node: ProductNode;
}

interface ProductsProps {
  products: {
    edges: ProductEdge[];
  };
}

const TrendingProducts = ({ products }: ProductsProps) => {
  // console.log("products page", products);

  return (
    <div className="py-10 lg:py-14 mx-auto">
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        {products?.edges.map((product) => {
          return <Product key={product.node?.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default TrendingProducts;
