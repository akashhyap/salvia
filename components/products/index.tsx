import Product from "./product";

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

const Products = ({ products }: ProductsProps) => {
  // console.log("products page", products);

  return (
    <div className="py-10 lg:py-14">
      <div className="gmt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {products?.edges.map((product) => {
          return <Product key={product.node?.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
