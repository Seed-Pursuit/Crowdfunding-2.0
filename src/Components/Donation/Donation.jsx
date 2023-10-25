// import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// function Donation({ state, acc }) {
//   const [id, setID] = useState("");
  
//   const getDonation = async (event) => {
//     try {
//       if (
//         id !== "" 
//       ) {
//         event.preventDefault();
//         const { contract } = state;
//         const accounts = await window.ethereum.request({
//             method: "eth_requestAccounts",
//         });
//         console.log(typeof id);
//         const nameText = await contract.methods.campaigns(id).call();
//         console.log(nameText[1]);

//         if(nameText[1].toLowerCase() === accounts[0]) {
//           await contract.methods
//           .getDonation(
//             id
//           )
//           .send({ from: accounts[0] });
//         }else {
//           toast.error("You are not the Owner of the campaign", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//           });
//         }
//       }
//     } catch (error) {
//       console.log("Byee");
//     }
//   };

//   const styles = {
//     minHeight: "90vh",
//   };
//   return (
//     <>
//     <ToastContainer />
//       <section class="text-gray-400 bg-gray-900 body-font relative">
//         <form
//           class="container px-5 py-24 mx-auto"
//           style={styles}
//           autocomplete="off"
//         >
//           <div class="flex flex-col text-center w-full mb-12">
//             <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
//               Compaign Donation 
//             </h1>
//           </div>
//           <div class="lg:w-1/2 md:w-2/3 mx-auto">
//             <div class="flex flex-wrap -m-2">
//               <div class="p-2 w-full">
//                 <div class="relative">
//                   <label for="name" class="leading-7 text-sm text-gray-400">
//                     Enter the Complain ID
//                   </label>
//                   <input
//                     type="text"
//                     autocomplete="off"
//                     id="name"
//                     onChange={(e) => setID(Number(e.target.value))}
//                     class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//                   />
//                 </div>
//               </div>
//               <div class="p-2 w-full">
//                 <button
//                   class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
//                   onClick={getDonation}
//                 >
//                   Get Campaign Donation
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// }

// export default Donation;
import React from 'react';

const Donation = () => {
  // Static donation data for demonstration
  const donations = [
    {
      campaignTitle: "Startup Idea 1",
      donatedAmount: 5, // ETH
      transactionHash: "0x123456789...",
    },
    {
      campaignTitle: "Startup Idea 2",
      donatedAmount: 10, // ETH
      transactionHash: "0x987654321...",
    },
    {
      campaignTitle: "Sustainable Packaging Project",
      donatedAmount: 3, // ETH
      transactionHash: "0xabcdef123...",
    },
    {
      campaignTitle: "Random Idea 1",
      donatedAmount: 8, // ETH
      transactionHash: "0x567812349...",
    },
    {
      campaignTitle: "Random Idea 2",
      donatedAmount: 15, // ETH
      transactionHash: "0xfedcba987...",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-medium mb-4 text-gray-900">Donation History</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <ul>
          {donations.map((donation, index) => (
            <li key={index} className="mb-2">
              <div>
                <span className="text-gray-600 mr-2">Campaign: </span>
                {donation.campaignTitle}
              </div>
              <div>
                <span className="text-gray-600 mr-2">Donated Amount: </span>
                {donation.donatedAmount} ETH
              </div>
              <div>
                <span className="text-gray-600 mr-2">Transaction Hash: </span>
                {donation.transactionHash}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Donation;
