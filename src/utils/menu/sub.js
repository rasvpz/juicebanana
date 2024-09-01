// import { createMemoryHistory } from "@remix-run/router"
// import { renderToStaticNodeStream } from "react-dom/server"

// Sharjah:60
// Saudi:60
// Chiku:60
// mango:70
// Grape:70
// Apple:70
// Kiwi:70
// Shamam:70
// Anar:80
// avacado:80
// Strawberry:70
// vanila:70
// Pista:70
// PeanutButter:70
// HocusPocus:80
// DryFruit:80
// FigAndHoney:80
// CashewAlmond:80
// Oreo:70
// Snickers:70
// FiveStar:70
// Cadberry:70
// KitkatChocolate:70
// BelgiumChocolate:70
// DarkFantasy:90
// NutellaShakes:100

// TenterSpecial
// TenderCocunut:70
// TenderVannila:70
// TenderBoost:70
// TenderChikku:70
// TenderPista:80
// TenderOreo:80
// TenderCashew:80
// TenderDates:90
// TenderDryFriut:90
// TenderSpeciel:100

// mud shakes
// ChoclateMud:95
// HocusPocusMud:95
// OreoCrumble:90
// RockyChikku:90
// PeanutMud:90
// FriutMud:90
// 5StarMud:95
// SnickersMud:95
// KitkatMud:95
// Cadberry:95
// PistaMud:95
// MississippiMud:110
// FigAndHoneyMud:110
// CashewMud:110
// DryFriutmud:110
// NuttellaMud:120
// HighBigBubbles:160

// Fresh Juice
// orange:60
// Apple:60
// Grapes:60
// Shamam:60
// Mussambi:60
// Pineapple:60
// Mango:60
// waterMelon:60
// Anar:70
// Pappaya:60

// Lime 
// FreshLime:20
// MintLime:30
// GingerLime:30
// pineappleLime:30
// GrapeLime:30
// OrangeLime:30

// Sodas 
// SaltSoda:20
// GrapeSoda:30
// ChillySoda:30
// GreenAppleSoda:30
// PineappleSoda:30

// Mojitos
// BleedBlue:70
// PassionFriut:70
// GreenApple:70
// Strawberry:70
// Orange:70
// Guava:70
// Kiwi:70

// Malva
// BananaMalva:90
// ChikkuMalva:90
// MangoMalva:100
// Avacadomalva:100

// Cold Coffee
// HardRockCoffee:70
// StrawberryCoffee:70
// ChocolateCoffee:70
// MudCoffee:90

// Speciel with ice cream
// FriutOurLoadSp:110
// GudBud:130

// Falooda
// FriutSaladWithIceCream:70
// NormalFalooda:90
// MangoDreamFalooda:110
// StrawberryDreamFalooda:110
// ZaharFalooda:110
// LeBananSpecialFalooda:140
// TenderCocunutFalooda:130
// RoyalFalooda:130
// DryFriutFalooda:140

// Chocolate Killers
// ChocolateFudge:70
// brownieWithIceCream:110
// DryFriutSundae:100
// CandyCrash:100
// CookiesAndCream:80
// viewOrders={
//     "-O5hpaRPnsZD83rrwb5R": {
//         "createdAt": "1/9/2024, 7:16:35 pm",
//         "id": "-O5hpaRPnsZD83rrwb5R",
//         "isActive": true,
//         "isDeleted": false,
//         "orderedTime": "7:16:35 pm",
//         "orders": [
//             {
//                 "amount": 180,
//                 "btnBg": "bg-[#a52d2e]",
//                 "btnBrdr": "border-[#a52d2e]",
//                 "cardBg": "bg-red-500",
//                 "category": "Avil Milk",
//                 "isActive": true,
//                 "isDeleted": false,
//                 "juiceName": "WaterMelon",
//                 "qty": 3,
//                 "rate": 60,
//                 "updatedAt": "1/9/2024, 7:16:35 pm"
//             },
//             {
//                 "amount": 70,
//                 "btnBg": "bg-[#765834]",
//                 "btnBrdr": "border-[#765834]",
//                 "cardBg": "bg-[#A97D48]",
//                 "category": "Avil Milk",
//                 "isActive": true,
//                 "isDeleted": false,
//                 "juiceName": "Caramel",
//                 "qty": 1,
//                 "rate": 70,
//                 "updatedAt": "1/9/2024, 7:16:35 pm"
//             },
//             {
//                 "amount": 120,
//                 "btnBg": "bg-red-700",
//                 "btnBrdr": "",
//                 "cardBg": "bg-red-300",
//                 "category": "Mocktail Shake",
//                 "isActive": true,
//                 "isDeleted": false,
//                 "juiceName": "Chiku",
//                 "qty": 2,
//                 "rate": 60,
//                 "updatedAt": "1/9/2024, 7:16:35 pm"
//             },
//             {
//                 "amount": 70,
//                 "btnBg": "bg-yellow-700",
//                 "btnBrdr": "",
//                 "cardBg": "bg-yellow-500",
//                 "category": "Mocktail Shake",
//                 "isActive": true,
//                 "isDeleted": false,
//                 "juiceName": "Kiwi",
//                 "qty": 1,
//                 "rate": 70,
//                 "updatedAt": "1/9/2024, 7:16:35 pm"
//             }
//         ],
//         "place": "Alathur",
//         "toDayDate": "1/9/2024",
//         "total": 440,
//         "waiter": "Rashid"
//     }
// }



// const printTable = (orderId) => {
//     const order = getOrderDetails(orderId);
//     const printWindow = window.open('', '', 'height=600,width=800');

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
//                 <td class="p-2 font-bold" align='right'>Time : ${order.orderedTime}</td>
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
//                       ${order.orders.map(item => `
//                         <tr>
//                           <td>${item.juiceName}</td>
//                           <td>${item.qty}</td>
//                           <td>₹${item.rate}</td>
//                         </tr>
//                       `).join('')}
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

{/* <button onClick={() => printTable(order.id)} className='bg-red-500 p-2 text-white font-bold rounded'>
PRINT
</button> */}
