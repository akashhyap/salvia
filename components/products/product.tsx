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
      {product.node?.image && <div className="relative">
        <Link href={`/products/${product.node.slug}`} legacyBehavior>
          <a>
            <figure className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <Image
                src={product.node?.image?.sourceUrl ?? ""}
                alt="Image product"
                layout="fill"
                className="object-contain object-center"
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
      
    </div>
  );
};

export default Product;
