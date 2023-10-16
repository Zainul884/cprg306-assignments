"use client";
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewItem({ onAddItem }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('produce');

  function handleSubmit(event) {
    event.preventDefault();
    
    const item = { 
      name: name, 
      quantity: quantity, 
      category: category 
    };
    
    // Call the onAddItem prop with the item object
    onAddItem(item);
    
    // Resetting form fields
    setName('');
    setQuantity(1);
    setCategory('produce');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-10">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Item Name:</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity:</label>
        <input 
          type="number" 
          id="quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))} 
          min="1" 
          max="99" 
          required 
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category:</label>
        <select 
          id="category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm p-2"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen">Frozen Foods</option>
          <option value="canned">Canned Goods</option>
          <option value="dry">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Item</button>
    </form>
  );
}

NewItem.propTypes = {
  onAddItem: PropTypes.func.isRequired
};

export default NewItem;
