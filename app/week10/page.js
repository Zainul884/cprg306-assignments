"use client";
import { useEffect, useState } from "react";
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";
import { getItems, addItem, deleteItem } from "./_services/shopping-list-service";

function LandingPage() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    const [items, setItems] = useState([]);

    const handleLogin = async () => {
        await gitHubSignIn();
    };

    const handleLogout = async () => {
        await firebaseSignOut();
    };

    const loadItems = async () => {
        if (user) {
            const fetchedItems = await getItems(user.uid);
            setItems(fetchedItems);
        }
    };

    useEffect(() => {
        loadItems();
    }, [user?.uid]);

    const handleAddItem = async (newItemName) => {
        const itemId = await addItem(user.uid, { name: newItemName });
        setItems([...items, { id: itemId, name: newItemName }]);
    };

    const handleDeleteItem = async (itemId) => {
        await deleteItem(user.uid, itemId);
        setItems(items.filter(item => item.id !== itemId));
    };

    if (!user) {
        return (
            <main className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto text-center">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                        Shopping List App
                    </h1>
                    <button 
                        onClick={handleLogin} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Login with GitHub
                    </button>
                </div>
            </main>
        );
    } else {
        return (
            <main className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto text-center">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                        Welcome back!
                    </h1>
                    <p className="text-gray-800 text-lg mb-4">
                        Welcome, {user.displayName} ({user.email})
                    </p>
                    <ul>
                        {items.map(item => (
                            <li key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                {item.name}
                                <button 
                                    onClick={() => handleDeleteItem(item.id)}
                                    style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px' }}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
                    >
                        Logout
                    </button>
                    <div className="mt-4">
                        <Link href="week10/shopping-list" className="text-blue-500 hover:underline">
                            Go to Shopping List
                        </Link>
                    </div>
                </div>
            </main>
        );
    }
}

export default LandingPage;
