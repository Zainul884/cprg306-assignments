"use client";
import React, { useState } from 'react';
import NewItem from './new-item.js';
import ItemList from './item-list.js';
import itemsData from './items.json';

function Page() {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  return (
    <main className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Shopping List</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Add New Item</h2> {/* Reduced margin-bottom */}
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </main>
  );
}

export default Page;
