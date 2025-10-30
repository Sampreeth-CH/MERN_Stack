import React from "react";
import {List,Package} from 'lucide-react';

const Home = ({onSetPage})=>{
    return(
        <div className='p-10 bg-white rounded-xl shadow-2xl text-center'>
            <Package className='w-16 h-16 mx-auto mb-10 text-indigo-400'/>
            <h2 className='text-4xl font-bold text-gray-400'>
                Welcome to the React Inventory Management App    
            </h2>
            <p className='text-lg text-gray-600mb-8 mx-auto'>
                Let's add some products into the inventory.
            </p>
            <button 
            onClick={()=> onSetPage('list')}
            className='inline-flex items-center px-8 pyy-6 border border-transparent font-medium text-lg'>
                <List className='w-6 h-6 mr-3'/>
                Go to inventory page
            </button>
        </div>
    )
}

export default Home