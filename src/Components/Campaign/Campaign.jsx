import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Campaign({ state, acc, product }) {
  const [epochTime, setEpochTime] = useState(true);

  useEffect(() => {
    const getCurrentEpochTime = () => {
      const currentTimeInMilliseconds = Date.now();
      const currentTimeInSeconds = Math.floor(currentTimeInMilliseconds / 1000);
      if(currentTimeInSeconds > product[5]) {
        setEpochTime(false);
      }
    };
    getCurrentEpochTime();
  }, []);



  const [amt, setAmt] = useState("");

  const donateEth = async () => {
    try {
      if (amt !== "") {
        console.log("Hii");
        const { contract, web3 } = state;
        const weiValue = web3.utils.toWei(amt, "ether");
        const accounts = await web3.eth.getAccounts();
        await contract.methods
          .donateToCampaign(Number(product[0]))
          .send({ from: accounts[0], value: weiValue, gas: 480000 });
        toast.success(`You have donated : ${amt} ETH`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        window.location.reload(false);
      }else if(amt === 0 || amt === "") {
        toast.error("Enter value greater then 0", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
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
      console.log("Bye");
    }
  };

  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const { contract, web3 } = state;
    const getDetail = async () => {
      const date = new Date(product[5] * 1000);
      const readableDate = date.toLocaleString();
      console.log(readableDate);
      setDate(readableDate);
      const weiAmount = product[4];
      const weiAmount1 = product[6];
      console.log(weiAmount);
      const etherAmount = web3.utils.fromWei(weiAmount.toString(), "ether");
      const etherAmount1 = web3.utils.fromWei(weiAmount1.toString(), "ether");
      setPrice(Number(etherAmount));
      setDetail(Number(etherAmount) - Number(etherAmount1));
    };
    contract && getDetail();
  }, [state]);

  const [modalOpen, setModalOpen] = useState(false);

  const trigger = useRef(null);
  const modal = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const [donation, setDonation] = useState("");
  const [d, setD] = useState("");
  useEffect(() => {
    const { contract } = state;
    const getDonor = async () => {
      const projects = await contract.methods
        .getDonators(Number(product[0]))
        .call();
      console.log(projects);
      const dataArray = projects[0].map((item, index) => ({
        id: index,
        value1: item,
        value2: projects[1][index],
      }));
      console.log(dataArray);
      setD(dataArray);
      setDonation(projects);
    };
    contract && getDonor();
  }, [state]);

  return (
    <>
      <ToastContainer />
      <section
        class="text-gray-400 bg-gray-900 body-font overflow-hidden"
        style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}
      >
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product[7]}
            />
            <div
              class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h1 class="text-white text-3xl title-font font-medium mb-1">
                {product[2]}
              </h1>
              <p class="leading-relaxed mb-1">{product[3]}</p>
              <p class="leading-relaxed mb-1">Deadline : {date}</p>
              <p class="leading-relaxed mb-1">Amount Require : {detail} ETH </p>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-white">
                  {price} ETH
                </span>
                <button
                  class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  ref={trigger}
                  onClick={() => setModalOpen(true)}
                  disabled={!epochTime}
                >
                  {epochTime ? "Pay Now" : "Deadline Reach"}
                </button>

                <div
                  className={`fixed top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${
                    modalOpen ? "block" : "hidden"
                  }`}
                >
                  <div
                    ref={modal}
                    onFocus={() => setModalOpen(true)}
                    onBlur={() => setModalOpen(false)}
                    className="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]"
                    style={{ backgroundColor: "#111827" }}
                  >
                    <h3
                      className="pb-2 text-xl font-bold text-dark sm:text-2xl"
                      style={{ color: "white" }}
                    >
                      { product[2] } Campaign
                    </h3>
                    <span
                      className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
                    ></span>
                    <p
                      className="mb-10 text-base leading-relaxed text-body-color"
                      style={{ color: "white" }}
                    >
                      Thank you for considering contributing to our campaign! Your support is crucial in helping us reach our target and achieve our mission. To make a contribution, please enter the amount you wish to donate and click the "Pay" button.
                    </p>
                    <input
                      type="number"
                      onChange={(e) => setAmt(e.target.value)}
                      class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-5"
                    ></input>
                    <div className="flex flex-wrap -mx-3">
                      <div className="w-1/2 px-3">
                        <button
                          onClick={() => setModalOpen(false)}
                          className="block w-full rounded-lg border border-[#E9EDF9] p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                          style={{ backgroundColor: "red", color: "white" }}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="w-1/2 px-3">
                        <button
                          className={`block w-full p-3 text-base font-medium text-center text-white transition border rounded-lg border-primary bg-primary hover:bg-opacity-90`}
                          style={{ backgroundColor: "green", color: "white" }}
                          onClick={donateEth}
                        >
                          {" "}
                          Pay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "40px",
              fontWeight: "bolder",
              color: "white",
              marginBottom: "40px",
            }}
          >
            Transactions
          </h1>
          <div
            class="-my-8 divide-y-2 divide-gray-800"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {d !== "" &&
              d.map((item) => {
                console.log(item);
                return (
                  <div class="py-8 flex flex-wrap md:flex-nowrap">
                    <div class="md:flex-grow">
                      <h2 class="text-2xl font-medium text-white title-font mb-2">
                        From : {item.value1}
                      </h2>
                      <p class="leading-relaxed">Amount : {item.value2} wei</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
export default Campaign;
