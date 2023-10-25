import React from "react";

function Post({ setDetails }) {
  const staticData = [
    {
      id: 1,
      title: "Startup Idea 1",
      description:
        "This is the description of the first startup idea. It aims to revolutionize the tech industry.",
      image: "image_url_1",
      targetAmount: 1000, // Target amount in ether
      deadline: new Date().getTime() + 7 * 24 * 60 * 60 * 1000, // One week from now
    },
    {
      id: 2,
      title: "Startup Idea 2",
      description:
        "Here's the description of the second startup idea. Join us in making this idea a reality.",
      image: "image_url_2",
      targetAmount: 500, // Target amount in ether
      deadline: new Date().getTime() + 14 * 24 * 60 * 60 * 1000, // Two weeks from now
    },
  ];

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
      {staticData.map((data) => (
        <div
          className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
          style={{
            marginTop: "60px",
            marginBottom: "60px",
            maxWidth: "672px",
          }}
          key={data.id}
        >
          <img className="object-cover w-full h-64" src={data.image} alt="Campaign" />
          <div className="p-6">
            <div>
              <a
                href="#"
                className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                tabIndex="0"
                role="link"
              >
                {data.title}
              </a>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {data.description}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Target Amount: {data.targetAmount} ETH
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Deadline: {new Date(data.deadline).toString()}
              </p>
            </div>
            <div className="mt-4">
              <div className="flex items-center" style={{ direction: 'rtl' }}>
                <button
                  className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                  onClick={() => {
                    setDetails(data);
                  }}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
