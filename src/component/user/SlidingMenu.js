import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, push } from 'firebase/database';
import { useSelector } from 'react-redux';


const SlidingMenu = ({ filteredItems, noOfItems, setNoOfItems, setSuccessAlert }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(store => store.user)
  const place = user.displayName.split(',')[1]?.trim()

  const [totalValue, setTotalValue] = useState(false);


  // Function to save data to Firebase
  const saveData = async (filteredItems, noOfItems) => {
    setSuccessAlert(true)
    const db = getDatabase();  
    // Prepare an array of order objects
    const indianDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    
    const orders = filteredItems?.map((key) => {
      return {
        juiceName: key,  // Juice name
        qty: noOfItems[key]?.count || 0,  // Quantity
        rate : noOfItems[key]?.rate || 0,
        amount: (noOfItems[key]?.count || 0) * (noOfItems[key]?.rate || 0),        // Total cost
        updatedAt: indianDate, // Creation timestamp
        isDeleted: false,  // Flag to indicate if the order is deleted
        isActive: true  // Flag to indicate if the order is active
      };
    });
  
    try {
      const newDocRef = totalValue ? push(ref(db, "juice/orders")) : ''  // Create a new entry with a unique ID
      await set(newDocRef, {
        id: newDocRef.key,  // Use Firebase's generated ID
        total:totalValue,
        place:place,  
        createdAt:  indianDate, // The timestamp for the entire order batch
        isDeleted: false,  // Indicates the entire order batch is not deleted
        isActive: true,  // Indicates the order batch is active
        orders, // Store the array of order objects         
      }).then((sucess) => {
        // console.log("Succes", sucess)
        setNoOfItems({})
        
      })
      

    } catch (error) {
      console.error("Error saving orders:", error.message);
    }
  };
  
  const printTable = () => {
    const printWindow = window.open('', '', 'height=600,width=400');
    const tableHTML = `
      <html>
        <head>
          <title>Print</title>
          <style>
            table {
              width: 50%;
              border-collapse: collapse;
            }
            th, td {
              padding: 4px;
              text-align: left;
              border: 1px solid #ddd;
            }
            th {
              background-color: #f4f4f4;
            }
            tbody tr:nth-child(even) {
              background-color: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Amnt</th>
              </tr>
            </thead>
            <tbody>
              ${filteredItems?.map((key, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${key}</td>
                  <td>${noOfItems[key]?.count || 0}</td>
                  <td>${(noOfItems[key]?.count || 0) * (noOfItems[key]?.rate || 0)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

        </body>
      </html>
    `;
   
    printWindow.document.open();
    printWindow.document.write(tableHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };


  // Toggle the sliding menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
  };

  // Calculate total value when filteredItems or noOfItems changes
  useEffect(() => {
    const total = filteredItems?.reduce((acc, key) => {
      const count = noOfItems[key]?.count || 0;
      const rate = noOfItems[key]?.rate || 0;
      return acc + (count * rate);
    }, 0);
    setTotalValue(total);
  }, [filteredItems, noOfItems]);

  // Print table function

  return (
    <div>

      {/* Toggle Button */}
      <button
        className="fixed top-72 right-[-3px] z-50 bg-yellow-400 text-black px-4 py-2 border-2 border-red-50 rounded-md"
        onClick={toggleMenu}
      >
        {isOpen ? 'CLOSE' : 'OPEN'}
      </button>

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-auto bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out z-20
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Order</h2>
        <table className="table-auto w-full border-collapse border-2 border-gray-700 text-white">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-2 px-4 text-left">No</th>
              <th className="py-2 px-4 text-left">Item</th>
              <th className="py-2 px-4 text-left">Qty</th>
              <th className="py-2 px-4 text-left">Amnt</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems?.map((key, idx) => (
              <tr key={key} className="odd:bg-gray-700 border border-gray-500 even:bg-gray-800 hover:bg-gray-600">
                <td className="py-1 px-4">{idx + 1}</td>
                <td className="py-1 px-4">{key}</td>
                <td align='right' className="py-1 px-4">{noOfItems[key]?.count || 0}</td>
                <td align='right' className="py-1 px-4">{(noOfItems[key]?.count || 0) * (noOfItems[key]?.rate || 0)}</td>
              </tr>
            ))}
            <tr className="odd:bg-gray-700 even:bg-gray-800 hover:bg-gray-600">
              <td className="py-2 px-4">
                <button 
                  onClick={() => saveData(filteredItems, noOfItems, setIsOpen(false))}
                  className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75'
                >
                  SAVE
                </button>
              </td>
              <td className="py-2 px-4">
                <button 
                  onClick={printTable} 
                  className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75'
                >
                  PRINT/SAVE
                </button>
              </td>
              <td className="py-2 px-4 font-bold">Total</td>
              <td align='right' className="py-2 px-4 font-bold">{totalValue}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default SlidingMenu;
