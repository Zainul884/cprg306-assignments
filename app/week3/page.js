import React from 'react';
import ItemList from './item-list';

function Page() {
    return (
        <main className="bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Shopping List</h1>
            <ItemList />
        </main>
    );
}

export default Page;
