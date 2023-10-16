import React from 'react';

function Item({ name, quantity, category }) {
    return (
        <li className="flex items-center justify-between p-4 border-b-2 border-gray-200 bg-white hover:bg-gray-100 transition ease-in-out duration-150">
            <span className="text-lg font-semibold text-gray-700 w-4/12">{name}</span>
            <span className="text-md text-gray-600 w-4/12 text-center">Quantity: {quantity}</span>
            <span className="text-sm text-gray-500 w-4/12 text-right">Category: {category}</span>
        </li>
    );
}

export default Item;
