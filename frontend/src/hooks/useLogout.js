
import useAuth from '../hooks/useAuth.js'
import axios from 'axios'

const UseLogout = () => {
    const {setAuth} = useAuth();
    const logout = async () => {
        
        try {
            await axios.get("http://localhost:5000/logout",{withCredentials:true});
            console.log("logged out");
        }catch (err){
            console.log(err);
        }
        setAuth({});
    }
  return logout;
}

export default UseLogout