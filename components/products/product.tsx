import Image from "next/image";
import Link from "next/link";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useCart } from "../cart/CartContext";
import { useState } from "react";

type ProductNode = {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  price: string;
  type: string;
  image?: {
    id: string;
    altText: string;
    sourceUrl: string;
  };
};

type ProductProps = {
  product: {
    node: ProductNode;
  };
};

const Product: React.FC<ProductProps> = ({ product }) => {
  // console.log("product::", product);

  const addToCart = useAddToCart();
  const { addItem, cartCount, setCartCount, cartItems, setCartItems } = useCart();

  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      const productId = product.node.databaseId;
      if (!productId) {
        console.error('Product ID is null or undefined');
        return;
      }
      // console.log('Product ID:', productId);
      setAdding(true);
      const cartItem = await addToCart(productId, null);
      // Use the addItem function from CartContext
      addItem(cartItem);
      setAdding(false);

      setTimeout(() => {
        setAdded(false);
      }, 2000);  // Reset the added state after 2 seconds


      // setCartCount((prevCount: number) => prevCount + cartItem.quantity);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      setAdding(false);
    }
  };

  const buttonText = added ? 'Added to cart' : adding ? 'Adding...' : 'Add to cart';

  return (
    <div className="relative">
      {product.node?.image && <div className="relative h-72 w-full overflow-hidden rounded-lg">
        <Link href={`/products/${product.node.slug}`} legacyBehavior>
          <a>
            <figure className="relative h-72 w-full overflow-hidden rounded-lg">
              <Image
                src={product.node?.image?.sourceUrl ?? ""}
                alt="Image product"
                layout="fill"
                className="h-full w-full object-cover object-center"
              />
            </figure>
          </a>
        </Link></div>}
      <div className="relative mt-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/products/${product.node.slug}`} legacyBehavior>
            {product.node.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{product.node.price}</p>

        {product.node?.type !== "VARIABLE" ? (
          <div className="mt-6">
            <button
              className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-2 text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-200"
              onClick={handleAddToCart}
            >
              {buttonText}
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <Link href={`/products/${product.node?.slug}`} legacyBehavior>
              <a className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-2 text-sm font-medium text-white  hover:text-gray-900 hover:bg-gray-200">
                Select Option
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-gray-900 opacity-20"
        />
        {/* <p className="relative text-lg font-semibold text-white">{product.price}</p> */}
      </div>
    </div>
  );
};

export default Product;
