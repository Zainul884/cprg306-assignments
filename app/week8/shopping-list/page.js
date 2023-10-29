"use client";
import React, { useState } from 'react';
import { useUserAuth } from "../_utils/auth-context"; // Importing the useUserAuth hook
import NewItem from './new-item.js';
import ItemList from './item-list.js';
import MealIdeas from './meal-ideas.js';
import itemsData from './items.json';

function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');
  
  const { user } = useUserAuth(); // Using the useUserAuth hook to get the user object

  if (!user) { // Check if the user is not logged in
    // Either display a message or redirect to the landing page
    return <p>Please log in to view the shopping list.</p>;
    // To redirect to the landing page, you can use React Router's useHistory hook
    // or another routing solution that you might be using in your application.
  }

  const handleAddItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleItemSelect = (itemName) => {
    const cleanedName = itemName.split(',')[0].trim().replace(/[^a-zA-Z ]/g, "");
    setSelectedItemName(cleanedName);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Shopping List</h1>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', gap: '20px' }}>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Item</h2>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Meal Ideas</h2>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </div>
  );
}

export default Page;
