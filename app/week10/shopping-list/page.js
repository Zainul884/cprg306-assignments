"use client";
import React, { useState, useEffect } from 'react';
import { useUserAuth } from "../_utils/auth-context";
import NewItem from './new-item.js';
import ItemList from './item-list.js';
import MealIdeas from './meal-ideas.js';
import { getItems, addItem, deleteItem } from '../_services/shopping-list-service.js';

function Page() {
    const [items, setItems] = useState([]);
    const [selectedItemName, setSelectedItemName] = useState('');
    const { user } = useUserAuth();

    const loadItems = async () => {
        if (user) {
            try {
                const fetchedItems = await getItems(user.uid);
                setItems(fetchedItems);
            } catch (error) {
                console.error("Error loading items:", error);
            }
        }
    };

    useEffect(() => {
        loadItems();
    }, [user]);

    const handleAddItem = async (newItem) => {
        try {
            const newItemId = await addItem(user.uid, newItem);
            setItems(prevItems => [...prevItems, { ...newItem, id: newItemId }]);
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const handleItemSelect = (itemName) => {
        const cleanedName = itemName.split(',')[0].trim().replace(/[^a-zA-Z ]/g, "");
        setSelectedItemName(cleanedName);
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await deleteItem(user.uid, itemId);
            setItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    if (!user) {
        return (
            <main className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto text-center">
                    <p className="text-gray-800 text-lg">
                        Please log in to view the shopping list.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Shopping List</h1>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', gap: '20px' }}>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Item</h2>
                    <NewItem onAddItem={handleAddItem} />
                    <ItemList items={items} onItemSelect={handleItemSelect} onDeleteItem={handleDeleteItem} />
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
