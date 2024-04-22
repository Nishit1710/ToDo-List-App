"use client";

import { useState } from 'react';
import Item from './item.js';

export default function ItemList( {items , onItemSelect }) {
  const [sortBy, setSortBy] = useState('name');

  const handleSortByName = () => {
    setSortBy('name');
  };

  const handleSortByCategory = () => {
    setSortBy('category');
  };


  
  let sortedItems = [];
  if (items && Array.isArray(items)) {
      sortedItems = [...items].sort((a, b) => {
          if (sortBy === 'name') {
              return (a.name || "").localeCompare(b.name || "");
          } else if (sortBy === 'category') {
              return (a.category || "").localeCompare(b.category || "");
          }
      });
  }

  return (
    <main className="p-4">
      <div className="mb-4">
        <button
          className={"bg-blue-500 text-white px-4 py-2 rounded active:bg-blue-950 "}
          onClick={handleSortByName}
        >
          Sort by Name
        </button>
        <button
          className={"bg-blue-500 text-white px-4 py-2 rounded ml-2 active:bg-blue-950 "}
          onClick={handleSortByCategory}
        >
          Sort by Category
        </button>
      </div>
      
        
      <div>
        {sortedItems.map((item, id) => (
          <Item key={id} {...item} onSelect={onItemSelect} />
        ))}
        
      </div>
    </main>
  );
}