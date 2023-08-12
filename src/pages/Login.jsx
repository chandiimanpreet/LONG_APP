import React from 'react'
import './login.css'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../backend/firebase';
import { loginUser } from '../backend/api/user';


function Login({ setUserData }) {
    const signInUser = () => {
        signInWithPopup(auth, provider)
            .then(async () => {
                const res = await loginUser();
                setUserData(res);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }
    return (
        <button onClick={signInUser} className='button-main'>Google Login</button>
    )
}
export default Login
