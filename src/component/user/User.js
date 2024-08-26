import React, { useState } from 'react';
import { categories } from '../../utils/menu/categories';

const User = () => {
    const [cateName, setCateName] = useState('Avil Milk')
    const [noOfItems, setNoOfItems] = useState(false)
    const [catId, setCatId] = useState(1)
    // const [itemCounts, setItemCounts] = useState({});
    console.log('noOfItems', noOfItems)
    // Handle increment
    const handleIncrement = (itemName) => {
      setNoOfItems((prevCounts) => ({
        ...prevCounts,
        [itemName]: (prevCounts[itemName] || 0) + 1,
      }));
    };
  
    // Handle decrement
    const handleDecrement = (itemName) => {
      setNoOfItems((prevCounts) => ({
        ...prevCounts,
        [itemName]: prevCounts[itemName] > 0 ? prevCounts[itemName] - 1 : 0,
      }));
    };

    const filteredCategories = cateName
    ? categories.filter((category) => category.name === cateName)
    : categories;

  return (
    <div className="ml-3">
      {/* Category Buttons */}
      <div>
  {categories.map((category) => {
    // Calculate the total items for the current category
    const totalItemsForCategory = category.itemsDetails
      ? category.itemsDetails.reduce((total, item) => {
          return total + (noOfItems[item.itemsName] || 0);
        }, 0)
      : 0;

    return (
      <button
        onClick={() => {
          setCateName(category?.name);
          setCatId(category?.id);
        }}
        key={category.id}
        className={`${category.bg} ${category.fg} 
        rounded-md 
        lg:text-lg 
        text-sm 
        xs:font-semibold 
        sm:font-semibold 
        lg:font-semibold 
        m-1 px-2 py-1
        ${catId === category.id ? 
        'text-white shadow-[0_0_15px_4px_rgba(96,165,250,1)] border border-[#61abfa]' 
        : 
        'hover:text-white hover:shadow-[0_0_15px_4px_rgba(96,165,250,1)] hover:border hover:border-[#61abfa]'
        }`}
      >
        {totalItemsForCategory > 0 && (
          <p>{totalItemsForCategory}</p>
        )}

        <div>{category.name}</div>
      </button>
    );
  })}
</div>


      {/* Item Spans within the Map Function */}
      <div className="mt-4">
      {filteredCategories.map((category) => (
        <div key={category.id} className="flex flex-wrap">
          {category.itemsDetails?.map((item, index) => (
            <div
                key={index}
                className={`bg-opacity-100 rounded-md p-2 mb-1 
                ${noOfItems[item.itemsName] > 0 ? 'border border-[#61abfa] shadow-[0_0_20px_8px_rgba(96,165,250,1)]' : ''
                } hover:shadow-[0_0_15px_4px_rgba(96,165,250,1)] hover:border hover:border-[#61abfa] m-2 h-100 w-100 ${item.bgColor} text-gray-200`}
                >
            <p className={`min-w-28 text-white-300 text-right ${noOfItems[item.itemsName] ? 'text-black font-semibold' : ''}`}>
            {noOfItems[item.itemsName] ? `${noOfItems[item.itemsName]} items` : "0 Items"}
            </p>
              <span className='text-3xl text-white text-shadow-[0px_2px_4px_rgba(0,0,0,0.5)]'>
                {item.itemsName}
              </span>
              <div className='flex justify-between items-center mt-4 mb-2'>
                <span
                  onClick={() => handleDecrement(item.itemsName)}
                  className={`cursor-pointer ${item.textColor} border-2 ${item.brdr} rounded-full px-3 py-1 text-2xl`}
                >
                  -
                </span>
                <span
                  onClick={() => handleIncrement(item.itemsName)}
                  className={`border-2 ${item.brdr} cursor-pointer text-white rounded-full px-2.5 py-1 ${item.fgColor} ${item.brdr} text-2xl`}
                >
                  +
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
  );
};

export default User;