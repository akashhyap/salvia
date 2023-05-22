import Link from "next/link";
import Product from "./products/product";

//@ts-ignore
const TrendingProducts = ({ blok }) => {
  // console.log("trending products", blok);
  //@ts-ignore
  const trendingProducts = blok.products.edges.filter((product) =>
    product.node.productCategories.edges.some(
      //@ts-ignore
      (categoryEdge) => categoryEdge.node.slug === blok.category
    )
  );
  return (
    <div aria-labelledby="category-heading" className="py-10 lg:py-14 max-w-6xl mx-auto">
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0 pb-4 mb-8 ">
        <h2 id="category-heading" className="text-3xl font-bold tracking-tight text-gray-900">{blok.title}</h2>
        <Link href="/shop" legacyBehavior>
          <a className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
            Shop all
            <span aria-hidden="true"> →</span>
          </a>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        {/* @ts-ignore */}
        {trendingProducts.map((productBlok) => {
          return <Product key={productBlok.node?.id} product={productBlok} />;
        })}
      </div>
    </div>
  );
};

export default TrendingProducts;
