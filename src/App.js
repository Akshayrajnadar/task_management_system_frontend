import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Navbar } from "../src/NavBar";
import { Footer } from "../src/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>

           
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
