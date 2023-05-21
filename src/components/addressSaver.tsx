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
            <div className="fixed top-10 left-0 z-50 w-screen h-screen flex items-center justify-center">
                <p className="text-white text-2xl">Adding <strong>{addresses.join(' | ')}</strong> as angels</p>

            </div>
        );
    }

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
            <div>
                <button className="bg-white text-black rounded px-4 py-2 m-2" onClick={handleSaveAddress}>Save Address</button>
                <button className="bg-white text-black rounded px-4 py-2 m-2" onClick={() => setIsLoading(true)}>Submit Addresses</button>
            </div>
            <ul>
                {addresses.map((address, index) => (
                    <li key={index}>angel {index + 1}: {address}</li>))}
            </ul>
        </div>
    );
};

export default AddressSaver;
