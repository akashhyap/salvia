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
      <div className="flex border border-gray-900 rounded-full w-24 mr-5 h-[45px] justify-between overflow-hidden">
        <button onClick={handleDecrement} className="px-3 text-xl">-</button>
        <input type="text" value={quantity} readOnly className="w-5 text-center"/>
        <button onClick={handleIncrement} className="px-3 text-xl">+</button>
      </div>
    );
  };
  
  export default QuantitySelector;
  