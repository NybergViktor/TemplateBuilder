import "./App.css";
import { Login } from "../components/login/login";
import { Signup } from "../components/signup/signup";
import { Contact } from "../components/contact/contact";
import { Home } from "../components/home/home";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
