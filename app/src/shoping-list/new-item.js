"use client";
import { useState } from "react";

let idCounter = 0;

export default function NewItem( {onAddItem}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  function handleSubmit(event) {
    event.preventDefault();
    
    onAddItem({id: idCounter++ , name, quantity, category});
    setName("");
    setQuantity(1);
    setCategory("produce");
  }

  return (
    <form onSubmit={handleSubmit} className=" block w-auto">
        <label className=" block mb-3 ">
            <input
            type="text"
            placeholder="Enter item name here..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="border border-gray-400 p-2 rounded text-black w-full" 
            />
        </label>
    <div className="flex flex-row">
        <label className="mb-3">
            <input
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="border border-gray-400 p-2 rounded text-black w-1/3"
            />
        </label>
      <label className="mb-2 ">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="border border-gray-400 p-2 rounded text-black "
          >
            <option value="Produce">Produce</option>
            <option value="Dairy">Dairy</option>
            <option value="Bakery">Bakery</option>
            <option value="Meat">Meat</option>
            <option value="Canned Goods">Canned Goods</option>
            <option value="Dry Goods">Dry Goods</option>
            <option value="Beverages">Beverages</option>
            <option value="Snacks">Snacks</option>
            <option value="Household">Household</option>
            <option value="Other">Other</option>
          </select>   
      </label>
    </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
        +
      </button>
    </form>
  );
}