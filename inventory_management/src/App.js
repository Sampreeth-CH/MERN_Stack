import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';

// Import the specific page components (our "routes")
import Home from './pages/Home.jsx';
import InventoryList from './components/InventoryList.jsx';
import InventoryForm from './components/InventoryForm.jsx';

// --- UTILITY AND INITIAL DATA ---
const STORAGE_KEY = 'inventory_system_data_for_teaching';
const initialInventory = [
  { id: 1, name: 'Laptop Pro', sku: 'LAP-1001', stock: 15, price: 1299.99 },
  { id: 2, name: 'Wireless Mouse', sku: 'ACC-2005', stock: 50, price: 25.50 },
  { id: 3, name: 'Monitor 27"', sku: 'MON-3012', stock: 8, price: 350.00 },
];

export default function App() {
  // useState: Manages the core data array (The application's global state)
  const [inventory, setInventory] = useState([]);
  
  // useState: Manages the application's current view/page (Simulated routing: 'home', 'list', 'add', 'edit')
  const [page, setPage] = useState('home');

  // useState: Manages which item is currently being edited
  const [editingItem, setEditingItem] = useState(null);

  /* ========================================================================
  useEffect for Data Persistence (Demonstrates Side Effects)
  ========================================================================
  */

  // 1. Load data on component mount (Dependency array: [])
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      setInventory(JSON.parse(storedData));
    } else {
      setInventory(initialInventory);
    }
  }, []);

  // 2. Save data on inventory change (Dependency array: [inventory])
  useEffect(() => {
    // Only save if inventory has been loaded (to prevent overwriting on first render)
    if (inventory.length > 0 || localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
    }
  }, [inventory]);

  /* ========================================================================
  CRUD Logic
  ========================================================================
  */

  const handleAddItem = (newItem) => {
    // Teaching Point: Generating unique IDs (a backend job later)
    const newId = Math.max(0, ...inventory.map(item => item.id)) + 1;
    setInventory(prevInventory => [...prevInventory, { ...newItem, id: newId }]);
    setPage('list');
  };

  const handleUpdateItem = (updatedItem) => {
    // Teaching Point: Updating state immutably using map
    setInventory(prevInventory => 
      prevInventory.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
    setPage('list');
  };
  
  const handleDeleteItem = (idToDelete) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      // Teaching Point: Updating state immutably using filter
      setInventory(prevInventory => 
        prevInventory.filter(item => item.id !== idToDelete)
      );
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setPage('edit');
  };
  
  const handleCancelForm = () => {
    setEditingItem(null);
    setPage('list'); // Return to the list page
  };


  /* ========================================================================
  Conditional Rendering (The "Router")
  ========================================================================
  */

  let content;
  
  switch (page) {
    case 'home':
      // Home page component only needs the setPage function for navigation
      content = <Home onSetPage={setPage} />;
      break;
    case 'add':
      // Form component needs the saving function
      content = <InventoryForm onSave={handleAddItem} onCancel={handleCancelForm} itemToEdit={null} />;
      break;
    case 'edit':
      // Form component needs the updating function and the item data
      content = <InventoryForm onSave={handleUpdateItem} onCancel={handleCancelForm} itemToEdit={editingItem} />;
      break;
    case 'list':
    default:
      // List component needs the data and action handlers
      content = (
        <InventoryList 
          inventory={inventory} 
          onDelete={handleDeleteItem} 
          onEdit={handleEdit}
          onSetPage={setPage}
        />
      );
      break;
  }


  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-8">
      
      <header className="mb-8 p-4 bg-white shadow-lg rounded-xl flex justify-between items-center">
        <h1 className="text-4xl font-black text-gray-800 flex items-center">
            <Package className="w-8 h-8 mr-3 text-indigo-600"/> 
            Vite Inventory Manager Demo
        </h1>

        <div className="flex space-x-3">
            <button 
              onClick={() => setPage('home')}
              className="inline-flex items-center px-4 py-2 border border-indigo-500 text-sm font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 transition duration-150 shadow-md"
            >
              Home
            </button>
            <button 
              onClick={() => setPage('list')}
              className="inline-flex items-center px-4 py-2 border border-indigo-500 text-sm font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 transition duration-150 shadow-md"
            >
              Inventory List
            </button>
        </div>
      </header>


      <main className="max-w-4xl mx-auto">
        {content}
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500 border-t pt-4">
          <p>Built with multiple React components and *props* for data flow.</p>
      </footer>
    </div>
  );
}