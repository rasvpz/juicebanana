import React, { useState } from 'react';
import { categories } from '../../utils/menu/categories';
import SlidingMenu from './SlidingMenu';

const User = () => {
    const [cateName, setCateName] = useState('Avil Milk')
    const [noOfItems, setNoOfItems] = useState('')
    const [catId, setCatId] = useState(1)
    // const [itemRate, setItemRate] = useState(0)
    // const [itemCounts, setItemCounts] = useState({});
    const filteredItems = Object.keys(noOfItems).filter(
        key => noOfItems[key]?.count > 0
      );
    // Handle increment
    const handleIncrement = (itemName, rate) => {
        setNoOfItems((prevCounts) => ({
          ...prevCounts,
          [itemName]: {
            count: (prevCounts[itemName]?.count || 0) + 1,
            rate: rate, // Store rate as a property for the item
          },
        }));
      };
      
     const handleDecrement = (itemName) => {
        setNoOfItems((prevCounts) => ({
          ...prevCounts,
          [itemName]: {
            ...prevCounts[itemName],
            count: prevCounts[itemName]?.count > 0 ? prevCounts[itemName]?.count - 1 : 0,
          },
        }));
      };
      
      const cancelAllOrder = () =>{
        setNoOfItems('')
      }

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
          return total + (noOfItems[item.itemsName]?.count || 0);
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
        m-1.5 px-2 py-1
        relative
        ${catId === category.id ? 
        'text-white shadow-[0_0_15px_4px_rgba(96,165,250,1)] border border-[#61abfa]' 
        : 
        'hover:text-white hover:shadow-[0_0_15px_4px_rgba(96,165,250,1)] hover:border hover:border-[#61abfa]'
        }`}
      >
        {totalItemsForCategory > 0 && (
          <p className='absolute right-0 top-[-15px] text-white bg-[#14862d] border-2 textborder-[#22fc35] border-[#22fc35] rounded-full px-2 text-sm font-semibold'>{totalItemsForCategory}</p>
        )}

        <div>{category.name}</div>

      </button>
    );
  })}
</div>


      {/* Item Spans within the Map Function */}
      <div className="m-2">
      {filteredCategories.map((category) => (
        <div key={category.id} className="flex flex-wrap">
          {category.itemsDetails?.map((item, index) => (
            <div
                key={index}
                className={`bg-opacity-[.9] rounded-md p-2 m-2 lg:w-[200px]
                ${noOfItems[item.itemsName]?.count > 0 ? 'border border-[#61abfa] shadow-[0_0_20px_8px_rgba(96,165,250,1)]' : 'border-[#000102] shadow-[0_0_4px_2px_rgba(6,16,25,.5)]'
                } hover:shadow-[0_0_15px_4px_rgba(96,165,250,1)] hover:border hover:border-[#61abfa]  ${item.bgColor} text-gray-200`}
                >
              <span className='text-3xl text-white drop-shadow-[0px_2px_2px_rgba(0,0,0,0.7)] relative'>
                {/* Item name */}
                <span>
                  {item.itemsName}
                </span>

                {/* Badge */}
                {noOfItems[item.itemsName]?.count > 0 ?
                <span
                  className={`absolute top-0 right-0 text-white rounded-full bg-[#000e03] border-2 textborder-[#22fc35] border-[#22fc35]  px-2 py-0 text-lg ${noOfItems[item.itemsName]?.count ? 'font-semibold' : ''}`}
                  style={{ transform: 'translate(50%, -50%)' }}
                > 
                  {`${noOfItems[item.itemsName].count}`}
                </span>
                :
                ''
          }
              </span>

              <div className='flex justify-between items-center mt-2 mb-1'>
                <span
                  onClick={() => handleDecrement(item.itemsName, item.rate)}
                  className={`cursor-pointer ${item.textColor} border-2 ${item.brdr} rounded-full px-3 text-2xl`}
                >
                  -
                </span>
                <span
                  onClick={() => handleIncrement(item.itemsName, item.rate)}
                  className={`border-2 ${item.brdr} cursor-pointer text-[#c9c7c7] rounded-full px-2  ${item.fgColor} ${item.brdr} text-2xl`}
                >
                  +
                </span>
              </div>
            </div>
          ))}
        </div>
        
      ))}
    </div>
    <button
        className="fixed top-[42%] right-[-4px] z-50 bg-yellow-400 text-black px-4 py-2 border-2 border-red-50 rounded-md"
        onClick={cancelAllOrder}
      >
        cALL
      </button>
        <SlidingMenu filteredItems={filteredItems} noOfItems={noOfItems} />
    </div>
    
  );

};

export default User;