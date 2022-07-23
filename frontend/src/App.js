import "./App.css";
import Register from "./components/register.js";
import Login from "./components/login.js";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} exact />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
