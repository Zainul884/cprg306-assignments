import React from 'react';
import PropTypes from 'prop-types';
import Item from './item';

function ItemList({ items, onItemSelect, onDeleteItem }) {
    const [sortBy, setSortBy] = React.useState('name');

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
                <button onClick={() => setSortBy('name')} className={`px-4 py-2 rounded ${sortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Sort by Name</button>
                <button onClick={() => setSortBy('category')} className={`px-4 py-2 rounded ${sortBy === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Sort by Category</button>
            </div>
            <ul className="space-y-2">
                {sortedItems.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Item {...item} onSelect={onItemSelect} />
                        <button onClick={() => onDeleteItem(item.id)} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>Delete</button>
                    </div>
                ))}
            </ul>
        </div>
    );
}

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
    })).isRequired,
    onItemSelect: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
};

export default ItemList;
