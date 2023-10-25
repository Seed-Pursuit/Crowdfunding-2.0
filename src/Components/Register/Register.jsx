import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register({ state, acc }) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [target, setTarget] = useState();
  const [deadline, setDeadline] = useState();
  const [image, setImage] = useState();

  const changeContract = async (event) => {
    try {
      if (
        title !== "" &&
        description !== "" &&
        target !== "" &&
        deadline !== "" &&
        image !== ""
      ) {
        event.preventDefault();
        console.log("Yoo");
        const { contract, web3 } = state;
        const weiAmount = web3.utils.toWei(target.toString(), 'ether');
        console.log(weiAmount);
        const Deadline = Number(deadline) * 60;
        console.log(Deadline);
        await contract.methods
          .createCampaign(title, description, weiAmount, Deadline, image)
          .send({ from: acc });
        const id = await contract.methods.numberOfCampaigns().call();
        console.log(id);
          toast.success(`Your id : ${Number(id) - 1}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        console.log("Hii");
      }
    } catch (error) {
      toast.error("Bye", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("Byee");
    }
  };

  const styles = {
    minHeight: "90vh",
  };
  const bgcolor = {
    backgroundColor: "#161e2d",
  };
  return (
    <>
    <ToastContainer />
      <section class="text-gray-400 bg-gray-900 body-font relative">
        <form
          class="container px-5 py-24 mx-auto"
          style={styles}
          autocomplete="off"
        >
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Create Campaign
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Welcome to our campaign creation platform! Here, you have the opportunity to bring your vision to life and make a difference. Creating a campaign is simple and allows you to rally support for a cause close to your heart.
            </p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-400">
                    Title
                  </label>
                  <input
                    id="message"
                    name="message"
                    onChange={(e) => setTitle(e.target.value)}
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  ></input>
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-400">
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    onChange={(e) => setDescription(e.target.value)}
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>

              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-400">
                    Target
                  </label>
                  <input
                    id="message"
                    name="message"
                    onChange={(e) => setTarget(e.target.value)}
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  ></input>
                </div>
              </div>

              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an deadline
              </label>
              <select
                id="countries"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                class="bg-gray-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                style={bgcolor}
              >
                <option>Select the time in days</option>
                <option> 10 </option>
                <option> 20 </option>
                <option> 50 </option>
                <option> 100 </option>
              </select>

              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-400">
                    Image
                  </label>
                  <input
                    id="message"
                    name="message"
                    onChange={(e) => setImage(e.target.value)}
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  ></input>
                </div>
              </div>

              <div class="p-2 w-full">
                <button
                  class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  onClick={changeContract}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
