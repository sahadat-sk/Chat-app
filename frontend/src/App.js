import "./App.css";
import Register from "./pages/register.js";
import Login from "./pages/login.js";
import { Routes, Route } from "react-router-dom";
import Chats from "./pages/chats.js";
import RequireAuth from "./pages/requireAuth.js";
import PersistLogin from "./pages/PersistLogin.js";

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
