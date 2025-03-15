import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Navbar } from "../src/NavBar";
import { Footer } from "../src/Footer";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
           
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
