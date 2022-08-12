import axios from "axios";
import useAuth from "./useAuth.js";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        const response = await axios.get("http://localhost:5000/refresh", {
            withCredentials: true,
        });
        setAuth({
            name: response?.data.name,
            email: response?.data.email,
            accessToken: response?.data.accessToken,
            id: response?.data._id,
        });
        return response.data.accessToken;
    };
    return refresh;
};
export default useRefreshToken;
