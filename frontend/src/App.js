import "./App.css";
import Register from "./components/register.js";
import Login from "./components/login.js";
import { Routes, Route } from "react-router-dom";
import Chats from "./components/chats.js";
import RequireAuth from "./components/requireAuth.js";
import PersistLogin from "./components/PersistLogin.js";

function App() {
    return (
        <Routes>
            {/* PublicRoutes */}
            <Route path="/" element={<Login />} exact />
            <Route path="/register" element={<Register />} />

            {/* PrivateRoutes */}
            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                    <Route path="/chats" element={<Chats />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
