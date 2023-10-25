import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Post({ state, setDetails }) {
  const [detail, setDetail] = useState([]);
  const { web3 } = state;

  // For demonstration, we'll add static data for two campaigns
  const staticData = [
    {
      id: 1,
      title: "Static Campaign 1",
      description: "This is a static campaign description.",
      image: "image_url_1",
      targetAmount: web3.utils.toWei("10", "ether"),
      deadline: new Date().getTime() + 7 * 24 * 60 * 60 * 1000, // One week from now
    },
    {
      id: 2,
      title: "Static Campaign 2",
      description: "Another static campaign description.",
      image: "image_url_2",
      targetAmount: web3.utils.toWei("5", "ether"),
      deadline: new Date().getTime() + 14 * 24 * 60 * 60 * 1000, // Two weeks from now
    },
  ];

  useEffect(() => {
    const { contract, web3 } = state;
    const getDetail = async () => {
      // Instead of fetching data from the contract, we set the static data here
      setDetail(staticData);
    };
    contract && getDetail();
  }, [state]);

  return (
    <div
      style={{
        minHeight: "90vh",
        backgroundColor: "#111827",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {detail.map((detail) => (
        <div
          className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
          style={{
            marginTop: "60px",
            marginBottom: "60px",
            maxWidth: "672px",
          }}
          key={detail.id}
        >
          <img className="object-cover w-full h-64" src={detail.image} alt="Campaign" />
          <div className="p-6">
            <div>
              <a
                href="#"
                className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                tabIndex="0"
                role="link"
              >
                {detail.title}
              </a>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {detail.description}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Target Amount: {web3.utils.fromWei(detail.targetAmount.toString(), "ether")} ETH
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Deadline: {new Date(detail.deadline).toString()}
              </p>
            </div>
            <div className="mt-4">
              <div className="flex items-center" style={{ direction: 'rtl' }}>
                <button
                  className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                  onClick={() => {
                    setDet