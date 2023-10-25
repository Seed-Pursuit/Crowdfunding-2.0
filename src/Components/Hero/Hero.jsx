import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 

function Home() {
  const styles = {
    minHeight: "90vh",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="text-gray-400 bg-gray-900 body-font"
    >
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center" style={styles}>
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font lg:text-5xl sm:text-4xl text-3xl mb-4 font-medium text-white">
            PursuitCoin Crowdfunding
          </h1>
          <p className="mb-8 lg:text-2xl leading-relaxed">
            Welcome to PursuitCoin, the platform dedicated to supporting innovative startup ideas from Seed Pursuit. Join us in shaping a better tomorrow by funding visionary projects.
          </p>
          <div className="flex md:flex-row flex-col justify-center items-center">
            <button className="inline-flex lg:mb-0 mb-8 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              <Link to="/register" className="hover:text-white">Create Campaign</Link>
            </button>
            <button className="lg:ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
              <Link to="/post" className="hover:text-white">Explore</Link>
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src="https://cdn-icons-png.flaticon.com/512/2246/2246969.png" />
        </div>
      </div>
    </motion.section>
  );
}

export default Home;
