interface QuantitySelectorProps {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
  }
  
  const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity }) => {
    const handleIncrement = () => {
      setQuantity((prev) => prev + 1);
    };
  
    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    };
  
    return (
      <div className="flex border border-gray-900 rounded-full w-24 ml-4 h-[44px] justify-between overflow-hidden">
        <button onClick={handleDecrement} className="px-3 text-xl leading-none">-</button>
        <input type="text" value={quantity} readOnly aria-label="Quantity" className="w-5 text-center"/>
        <button onClick={handleIncrement} className="px-3 text-xl leading-none">+</button>
      </div>
    );
  };
  
  export default QuantitySelector;
  