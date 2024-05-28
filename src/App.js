import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StateContext from "./Context/StateContext";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
function App() {

  return (
    <StateContext>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
          </Routes>
        </Router>
    </StateContext>
  );
}

export default App;
