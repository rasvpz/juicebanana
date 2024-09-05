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
import { toDayDate } from '../utils/constsnts/constant'

const View = () => {
  const [viewOrders, setViewOrders] = useState([]);
  const [totalSale, setTotalSale] = useState([]);


  
  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, "juice/orders");

    // IIFE (Immediately Invoked Function Expression) to handle the async/await inside useEffect
    (async () => {
      try {
        const query = firebaseQuery(
          dbRef,
          orderByChild("toDayDate"),
          equalTo(toDayDate)
        );

        const allOrders = await get(query);

        if (allOrders.exists()) {
          const ordersArray = Object.values(allOrders.val());

          // Calculate total sales before updating the state
          const total = ordersArray.reduce((sum, order) => sum + order.total, 0);

          setViewOrders(ordersArray); // Update the orders
          setTotalSale(total); // Update the total sales
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  // Function to get the details of the selected order
  const getOrderDetails = (orderId) => {
    return viewOrders?.find((order) => order.id === orderId);
  };


  const printTable = (orderId) => {
    const order = getOrderDetails(orderId);
  
    if (order) {
      // Create a new instance of jsPDF
      const doc = new jsPDF();
  
      // Define margin values
      const titleMarginBottom = 20;
      const dateTimeMarginBottom = 10;
  
      // Add title (Centered)
      doc.setFontSize(40);
      const titleY = 15;
      doc.text(`LeBanana ${order.place}`, doc.internal.pageSize.getWidth() / 2, titleY, { align: "center" });
  
      // Calculate Y position for Date and Time
      const dateTimeY = titleY + titleMarginBottom;
  
      // Add Date and Time
      doc.setFontSize(32);
      const pageWidth = doc.internal.pageSize.getWidth();
  
      // Left-aligned date
      doc.text(`Date: ${order.toDayDate}`, 15, dateTimeY);
  
      // Right-aligned time (manually calculate position)
      const timeText = `Time: ${order.orderedTime}`;
      const timeTextWidth = doc.getTextWidth(timeText);
      doc.text(timeText, pageWidth - timeTextWidth - 15, dateTimeY);
  
      // Add table with increased font size for the header and body
      doc.autoTable({
        head: [["Juices", "Qty", "Amnt"]],
        body: order?.orders?.map(item => [
          item.juiceId,
          { content: item.qty, styles: { halign: 'right' } }, // Right-align Qty
          { content: `${item.amount}`, styles: { halign: 'right' } }, // Right-align Amount
        ]),
        headStyles: {
          fillColor: [255, 255, 255], // White background for the header
          textColor: [0, 0, 0], // Black text for the header
          lineWidth: 1, // Border width
          fontSize: 28, // Font size for the table head
        },
        bodyStyles: {
          fillColor: [255, 255, 255], // No background color for all rows
          textColor: [0, 0, 0], // Black text for body cells
          lineWidth: 1, // Border width for body cells
          fontSize: 28, // Font size for the table body
        },
        alternateRowStyles: {
          fillColor: null, // Remove the alternate row background color
        },
        tableLineWidth: 0.1, // Border width for the table
        tableLineColor: [0, 0, 0], // Black border color
        margin: { top: dateTimeY + dateTimeMarginBottom }, // Adding top margin to ensure the table does not overlap with the date and time
      });
  
      // Add total (Right-aligned manually)
      const finalY = doc.lastAutoTable.finalY; // Get the final Y position after the table
      doc.setFontSize(32);
      const totalText = `Total    ${order.total}`;
      const totalTextWidth = doc.getTextWidth(totalText);
      doc.text(totalText, pageWidth - totalTextWidth - 18, finalY + 15);
  
      // Add a thank you note (Centered)
      doc.text("*** Thank You Visit Again ***", pageWidth / 2, finalY + 35, { align: "center" });
  
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
        <Header totalSale={totalSale}/>
        <div className="flex flex-wrap justify-center w-full max-w-screen-lg mx-auto gap-1">
  {/* Display orders */}
  {viewOrders?.map((order, index) => (
    <div
      key={index}
      className="bg-white rounded-lg shadow p-2 w-full max-w-xs" // Change w-1/2 to w-full
    >
      <table className="w-full">
        <tbody>
          <tr>
            <td className="p-2 font-bold">{order.waiter}</td>
            <td className="p-2 font-bold text-right">
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
                      <td className="px-4 py-2 text-right">₹{item.rate}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="0" className="text-left">
                      <button
                        onClick={() => printTable(order.id)}
                        className="bg-red-500 p-2 text-white font-bold rounded"
                      >
                        PRINT
                      </button>
                    </td>
                    <td className="text-right font-bold">
                      Total
                    </td>
                    <td className="text-right">
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
