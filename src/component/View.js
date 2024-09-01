import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  get,
  orderByChild,
  equalTo,
  query as firebaseQuery,
} from "firebase/database";
import Header from "./Header";
import app from "../utils/firebase";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
const View = () => {
  const [viewOrders, setViewOrders] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, "juice/orders");

    // IIFE (Immediately Invoked Function Expression) to handle the async/await inside useEffect
    (async () => {
      try {
        const query = firebaseQuery(
          dbRef,
          orderByChild("place"),
          equalTo("Alathur")
        );

        const allOrders = await get(query);

        if (allOrders.exists()) {
          setViewOrders(Object.values(allOrders.val()));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  // Function to get the details of the selected order
  const getOrderDetails = (orderId) => {
    return viewOrders.find((order) => order.id === orderId);
  };

  // Function to handle print
//   const printTable = (orderId) => {
//     const order = getOrderDetails(orderId);
//     const printWindow = window.open("", "", "height=600,width=400");

//     if (printWindow && order) {
//       printWindow.document.open();
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Print Order</title>
//             <style>
//               table { width: 100%; border-collapse: collapse; }
//               th, td { padding: 8px; border: 1px solid #ddd; }
//               th { background-color: #f4f4f4; }
//               body { font-family: Arial, sans-serif; }
//             </style>
//           </head>
//           <body>
//             <h3 align="center">LeBanana ${order.place}</h3>
//             <table>
//               <tr>
//                 <td class="p-2 font-bold">Date : ${order.toDayDate}</td>
//                 <td class="p-2 font-bold" align='right'>Time : ${
//                   order.orderedTime
//                 }</td>
//               </tr>
//               <tr>
//                 <td colspan="3">
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Juice</th>
//                         <th>Quantity</th>
//                         <th>Rate</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       ${order.orders
//                         .map(
//                           (item) => `
//                         <tr>
//                           <td>${item.juiceId}</td>
//                           <td align="right">${item.qty}</td>
//                           <td>₹${item.rate}</td>
//                         </tr>
//                       `
//                         )
//                         .join("")}
//                       <tr>
//                         <td align='right' colspan="2">Total</td>
//                         <td>₹${order.total}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>
//             </table>
//             <p align="center">Thank You  Visit Agan</p>

//             <script>window.print(); window.close();</script>
//           </body>
//         </html>
//       `);
//       printWindow.document.close();
//     }
//   };

const printTable = (orderId) => {
    const order = getOrderDetails(orderId);
  
    if (order) {
      // Create a new instance of jsPDF
      const doc = new jsPDF();
  
      // Add title
      doc.setFontSize(16);
      doc.text(`LeBanana ${order.place}`, doc.internal.pageSize.getWidth() / 2, 10, { align: "center" });
  
      // Add Date and Time
      doc.setFontSize(12);
      doc.text(`Date: ${order.toDayDate}`, 15, 20); // Adjusted Y position for Date
      doc.text(`Time: ${order.orderedTime}`, doc.internal.pageSize.getWidth() - 15, 20, { align: "right" }); // Adjusted Y position for Time
  
      // Add table with no background color in alternate rows and apply border to all columns
      doc.autoTable({
        head: [["Juice", "Quantity", "Rate"]],
        body: order.orders.map(item => [item.juiceId, item.qty, `₹${item.rate}`]),
        headStyles: {
          fillColor: [255, 255, 255], // White background for the header
          textColor: [0, 0, 0], // Black text for the header
          lineWidth: 0.1, // Border width
        },
        bodyStyles: {
          fillColor: [255, 255, 255], // No background color for all rows
          textColor: [0, 0, 0], // Black text for body cells
          lineWidth: 0.1, // Border width for body cells
        },
        alternateRowStyles: {
          fillColor: null, // Remove the alternate row background color
        },
        tableLineWidth: 0.1, // Border width for the table
        tableLineColor: [0, 0, 0], // Black border color
        margin: { top: 25 }, // Adding top margin to ensure the table does not overlap with the title
      });
  
      // Add total (Adjust Y position to be after the table)
      const finalY = doc.lastAutoTable.finalY; // Get the final Y position after the table
      doc.setFontSize(12);
      doc.text(`Total: Rs ${order.total}`, doc.internal.pageSize.getWidth() - 40, finalY + 10, { align: "right" });
  
      // Add a thank you note
      doc.text("Thank You Visit Again", doc.internal.pageSize.getWidth() / 2, finalY + 20, { align: "center" });
  
      // Save the PDF
      doc.save(`Order_${orderId}.pdf`);
    }
  };
  
  
  

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://cdn.pixabay.com/photo/2017/03/23/17/00/oranges-2168865_1280.jpg"
          alt="background"
        />
      </div>
      <div className="relative z-10">
        <Header />
        <h1 className="text-xl font-bold">View Orders</h1>
        <div className="flex flex-wrap justify-center w-full max-w-screen-lg mx-auto gap-1">
          {/* Display orders */}
          {viewOrders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-2 w-1/3 max-w-xs"
            >
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="p-2 font-bold">{order.waiter}</td>
                    <td className="p-2 font-bold" align="right">
                      {order.orderedTime}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Accordion for each order */}
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>View Orders</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-black`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600">
                      {/* Nested table for each order */}
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left">Juice</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orders.map((item, idx) => (
                            <tr key={idx}>
                              <td className="px-4 py-2">{item.juiceId}</td>
                              <td className="px-4 py-2">{item.qty}</td>
                              <td className="px-4 py-2">₹{item.rate}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="0" align="left">
                              <button
                                onClick={() => printTable(order.id)}
                                className="bg-red-500 p-2 text-white font-bold rounded"
                              >
                                PRINT
                              </button>
                            </td>
                            <td align="right" className="font-bold">
                              Total
                            </td>
                            <td>
                              <h3 className="ml-2 font-bold">₹{order.total}</h3>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default View;
