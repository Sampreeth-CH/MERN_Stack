
import React, {useState} from "react";
import {Package, Save, X} from 'lucide-react';

const InventoryForm = ({itemtoEdit, onSave, onCancel}) => {
    const [item, setItem] = useState(
        itemtoEdit || {name: '', units : '', stock: 0, price: 0}
    );

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setItem(prev => ({
            ...prev,
            [name] : name === 'stock' || name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e)=> {
        e.preventDefault();
        setError('');

        if(!item.name || !item.units || item.stock < 0 || item.price < 0)
        {
            setError('Please fill in all the fields correctly');
            return;
        }

        onSave(item);
    };

    const isEditing = !!itemtoEdit;

    return (
        <div className="p-6 bg-white rounded-xl shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-extrabold text-blue-400 mb-6 border-b pb-2">
                {isEditing ? 'Edit Product' : 'Add new Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="p-3 font-medium text-sm text-red bg-red-100 rounded-lg">{error}</div>}

                <label className="block">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                        <Package className="1-4 h-4 mr-2"/> 
                        Product Name
                    </span>
                    <input 
                    type  = "text"
                    name = "name"
                    value = {item.name}
                    onChange = {handleChange}
                    placeholder = "eg. Books"
                    className= "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                    />
                    </label>
                    <label className="block">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                    <Package className="w-4 h-4 mr-2" /> Units
                    </span>
                    <input
                    type="text"
                    name="units"
                    value={item.units}
                    onChange={handleChange}
                    placeholder="e.g. pcs, kg, packs"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    />
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <label className="block">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                        <Package className="1-4 h-4 mr-2"/> 
                        Current Stock
                    </span>
                    <input 
                    type  = "number"
                    name = "stock"
                    value = {item.stock}
                    onChange = {handleChange}
                    min = "0"
                    className= "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                    />
                </label>

                <label className="flex jutify-center space-x-4">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                <Package className="1-4 h-4 mr-2"/> 
                        Price ($)
                    </span>
                    <input 
                    type  = "number"
                    name = "price"
                    value = {item.price}
                    onChange = {handleChange}
                    min = "0"
                    step = "0.01"
                    className= "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                    />
                </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button 
                    type="button"
                    onClick = {onCancel}
                    className="inline-flex items-center px-4 py-2 border border-4"

                    >
                        <X className="w-5 h-5 mr-2"/>Cancel
                    </button>
                    <button 
                    type = "Submit"
                    className=""
                    >
                        <Save className="w-5 h-5 mr-2"/> {isEditing ? 'Update Item' : 'Add Item'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default InventoryForm;