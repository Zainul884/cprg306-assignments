import React, { useState } from 'react';
import Item from './item';

function ItemList() {
    const items = [
        { name: "milk, 4 L 🥛", quantity: 1, category: "dairy" },
        { name: "bread 🍞", quantity: 2, category: "bakery" },
        { name: "eggs, dozen 🥚", quantity: 2, category: "dairy" },
        { name: "bananas 🍌", quantity: 6, category: "produce" },
        { name: "broccoli 🥦", quantity: 3, category: "produce" },
        { name: "chicken breasts, 1 kg 🍗", quantity: 1, category: "meat" },
        { name: "pasta sauce 🍝", quantity: 3, category: "canned goods" },
        { name: "spaghetti, 454 g 🍝", quantity: 2, category: "dry goods" },
        { name: "toilet paper, 12 pack 🧻", quantity: 1, category: "household" },
        { name: "paper towels, 6 pack", quantity: 1, category: "household" },
        { name: "dish soap 🍽️", quantity: 1, category: "household" },
        { name: "hand soap 🧼", quantity: 4, category: "household" },
    ];

    // Initialize state for sorting
    const [sortBy, setSortBy] = useState('name');

    // Sort items based on sortBy state
    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'category') {
            return a.category.localeCompare(b.category);
        }
        return 0;
    });

    return (
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Shopping List</h2>
            <div className="mb-4 flex justify-center space-x-4">
                {/* Sorting buttons */}
                <button
                    onClick={() => setSortBy('name')}
                    className={`px-4 py-2 rounded ${sortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Sort by Name
                </button>
                <button
                    onClick={() => setSortBy('category')}
                    className={`px-4 py-2 rounded ${sortBy === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                >
                    Sort by Category
                </button>
            </div>
            <ul className="space-y-2">
                {sortedItems.map((item, index) => (
                    <Item key={index} {...item} />
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
