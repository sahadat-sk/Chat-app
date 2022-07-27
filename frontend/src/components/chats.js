import React from 'react'
import useAuth from '../hooks/useAuth.js'
import UseLogout from '../hooks/useLogout.js';

const Chats = () => {
    const {auth} = useAuth();
    const logout = UseLogout();
    const handleLogout = async () => {
      await logout();
    }
    //console.log(auth);
  return (
    <>
    <h1>Hello {auth.name} <br/>
    Your email is {auth.email}
    </h1>
    <button onClick={handleLogout}>logout</button>
    </>
  )
}

export default Chats