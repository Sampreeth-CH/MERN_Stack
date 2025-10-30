
import React from 'react';
import { List, Edit2, Trash2, Plus } from 'lucide-react';


const InventoryList = ({ inventory, onDelete, onEdit, onSetPage }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-extrabold text-indigo-700 flex items-center">
            <List className="w-7 h-7 mr-3"/> Current Stock
        </h2>
       
        <button
          onClick={() => onSetPage('add')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Product
        </button>
      </div>

      {inventory.length === 0 ? (
        <p className="text-center py-10 text-gray-500 text-lg">No inventory items found. Add your first product!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.sku}</td>
                 
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-bold ${item.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                    {item.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-800">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 rounded-full text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 transition duration-150"
                        title="Edit Item"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                     
                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-2 rounded-full text-red-600 hover:text-red-900 hover:bg-red-100 transition duration-150"
                        title="Delete Item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryList;