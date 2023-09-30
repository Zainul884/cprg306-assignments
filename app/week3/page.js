import React from 'react';
import ItemList from './item-list';

function Page() {
    return (
        <main className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Shopping List</h1>
            <ItemList />
        </main>
    );
}

export default Page;
