import "./App.css";
import Navbar from "./component/Navbar";
import Search from "./component/Search";
import "semantic-ui-css/semantic.min.css";
import Home from "./component/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
