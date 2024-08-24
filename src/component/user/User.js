import React from 'react';
import { categories } from '../../utils/menu/categories';

const User = () => {
  return (
    <div className="ml-3">
      {/* Category Buttons */}
      <div>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${category.bg} ${category.fg} rounded-md lg:text-lg text-sm xs:font-semibold sm:font-semibold lg:font-semibold m-1 px-2 py-1 hover:text-white hover:shadow-[0_0_15px_4px_rgba(96,165,250,1)] hover:border hover:border-[#61abfa]`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Item Spans within the Map Function */}
      <div className="mt-4">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-wrap">
            {category.itemsDetails?.map((item, index) => (
              <div
                key={index}
                className={`bg-opacity-100 rounded-md p-2 mb-1 hover:shadow-[0_0_15px_4px_rgba(96,165,250,1)] hover:border hover:border-[#61abfa] m-2 h-100 w-100 ${item.bgColor} ${item.fgColor}`}
              >
              <p className='text-white-300 text-right'>AvlMlk</p>
              <span className='text-3xl text-white text-shadow-[0px_2px_4px_rgba(0,0,0,0.5)]'>
                {item.itemsName}
                </span>
                <div>
                <button className="text-2xl m-2 bg-black text-white rounded-lg px-2 font-bold">1</button>
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