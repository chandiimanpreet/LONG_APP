import React from 'react'
import './login.css'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../backend/firebase';


function Login() {
    const signInUser = () => {
        signInWithPopup(auth, provider).catch((error) => alert(error.message));
    }
    return (
        <button onClick={signInUser} className='button-main'>Google Login</button>
    )
}
export default Login
