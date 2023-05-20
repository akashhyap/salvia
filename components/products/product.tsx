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
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      {product.node?.image && <div className="relative"><Link href={`/products/${product.node.slug}`} legacyBehavior>
        <a>
          <figure className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-60">
            <Image
              src={product.node?.image?.sourceUrl ?? ""}
              alt="Image product"
              layout="fill"
              // className="h-full w-full object-cover object-center sm:h-full sm:w-full"
            />
          </figure>
        </a>
      </Link></div>}
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/products/${product.node.slug}`} legacyBehavior>
            {product.node.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{product.node.price}</p>

        {product.node?.type !== "VARIABLE" ? (
          <button
            className="px-3 py-1 rounded-sm mr-3 text-sm border-solid border border-current hover:bg-slate-900 hover:text-white hover:border-slate-900"
            onClick={handleAddToCart}
          >
            {buttonText}
          </button>
        ) : (
          <Link href={`/products/${product.node?.slug}`} legacyBehavior>
            <a className="px-3 py-1 rounded-sm mr-3 text-sm border-solid border border-current hover:bg-slate-900 hover:text-white hover:border-slate-900">
              Select Option
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Product;
