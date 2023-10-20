"use client";
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

    const [sortBy, setSortBy] = useState('name');
    const categoryOrder = ["bakery", "canned goods", "dairy", "dry goods", "household", "meat", "produce"];
    const customOrder = ["bread 🍞", "pasta sauce 🍝", "milk, 4 L 🥛", "eggs, dozen 🥚", "spaghetti, 454 g 🍝", "toilet paper, 12 pack 🧻", "paper towels, 6 pack", "dish soap 🍽️", "hand soap 🧼", "chicken breasts, 1 kg 🍗", "bananas 🍌", "broccoli 🥦"];

    const groupedItems = items.reduce((groups, item) => {
        if (!groups[item.category]) {
            groups[item.category] = [];
        }
        groups[item.category].push(item);
        return groups;
    }, {});

    let displayedItems = [];
    if (sortBy === 'name') {
        displayedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'category') {
        displayedItems = [...items].sort((a, b) => {
            return customOrder.indexOf(a.name) - customOrder.indexOf(b.name);
        });
    } else if (sortBy === 'grouped') {
        categoryOrder.forEach(cat => {
            if (groupedItems[cat]) {
                groupedItems[cat].sort((a, b) => a.name.localeCompare(b.name));
            }
        });
    }

    return (
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Shopping List</h2>
            <div className="mb-4 flex justify-center space-x-4">
                <button onClick={() => setSortBy('name')} className={`px-4 py-2 rounded ${sortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Sort by Name</button>
                <button onClick={() => setSortBy('category')} className={`px-4 py-2 rounded ${sortBy === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Sort by Category</button>
                <button onClick={() => setSortBy('grouped')} className={`px-4 py-2 rounded ${sortBy === 'grouped' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Group by Category</button>
            </div>
            
            {sortBy !== 'grouped' ? (
                <ul className="space-y-2">
                    {displayedItems.map((item, index) => (
                        <Item key={index} {...item} />
                    ))}
                </ul>
            ) : (
                categoryOrder.map(cat => (
                    groupedItems[cat] && (
                        <div key={cat} className="mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 capitalize">{cat}</h3>
                            <ul className="space-y-2">
                                {groupedItems[cat].map((item, index) => (
                                    <Item key={index} {...item} />
                                ))}
                            </ul>
                        </div>
                    )
                ))
            )}
        </div>
    );
}

export default ItemList;
