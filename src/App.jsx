import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Register from './Components/Register/Register';
import Campaign from "./Components/Campaign/Campaign";
import Donation from "./Components/Donation/Donation";
import Post from './Components/Post/Post';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  const [product, setProduct] = useState('');
  const setDetails = (detail) => {
    console.log(detail);
    setProduct(detail);
  }

  const [acc, setacc] = useState("");
  const saveState = (state, account) => {
    console.log(state);
    setState(state);
    setacc(account);
    console.log(account);
  };
  return (
    <>
    <Router>
        <Navbar saveState={saveState}></Navbar>
           <Routes>
                <Route exact path='/' element={< Hero />}></Route>
                <Route exact path='/register' element={< Register state={state} acc={acc} />}></Route>
                <Route exact path='/campaign' element={< Campaign state={state} acc={acc} product={product} />}></Route>
                <Route exact path='/donation' element={< Donation state={state} acc={acc} />}></Route>
                <Route exact path='/post' element={< Post state={state} setDetails={setDetails} />}></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
