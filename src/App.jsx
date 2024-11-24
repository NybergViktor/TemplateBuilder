import "./App.css";
import { Login } from "./components/login";
import { Signup } from "./components/signup";
import { Contact } from "./components/contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          /forgotPassword
          <Route path="/forgotPassword" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
