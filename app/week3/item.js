import React from 'react';

function Item({ name, quantity, category }) {
    return (
        <li className="flex items-center justify-between p-2 border-b">
            <span className="text-lg">{name}</span>
            <span>Quantity: {quantity}</span>
            <span className="text-sm text-gray-600">Category: {category}</span>
        </li>
    );
}

export default Item;
