import React, { useState } from "react";

type Address = string;

const AddressSaver: React.FC = () => {
  const [inputValue, setInputValue] = useState<Address>("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSaveAddress = () => {
    setAddresses([...addresses, inputValue]);
    setInputValue("");
  };

  if (isLoading) {
    return (
      <div className="fixed top-10 left-0 w-full h-screen flex items-center justify-center pointer-events-none">
        <p className="text-white text-lg mt-20">Adding the angels...</p>
      </div>
    );
  }

  return (
    <div>
      <p> Input the addresses of your angels. </p>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <div>
        <button
          className="bg-white text-black rounded px-4 py-2 m-2"
          onClick={handleSaveAddress}
        >
          Save Address
        </button>
        <button
          className="bg-white text-black rounded px-4 py-2 m-2"
          onClick={() => setIsLoading(true)}
        >
          Submit Addresses
        </button>
      </div>
      <ul className="gap-1">
        {addresses.map((address, index) => (
          <li
            key={index}
            className={
              index % 2 ? "bg-white/10 px-2 py-1 rounded" : "px-2 py-1"
            }
          >
            Angel n°{index + 1}: <span className="font-medium">{address}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressSaver;
