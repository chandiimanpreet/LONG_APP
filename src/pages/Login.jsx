import React from 'react'
import './login.css'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../backend/firebase';
import { loginUser } from '../backend/api/user';
import { getBoard } from '../backend/api/board';


function Login({ setUserData, setBoard, setPulseLoading }) {
    const signInUser = () => {
        signInWithPopup(auth, provider)
            .then(async () => {
                const res = await loginUser();
                setUserData(res);
                if (res.boards.length > 0) {
                    setPulseLoading(true)
                    const board = await getBoard(res.boards[0]);
                    setBoard(board);
                    setPulseLoading(false)
                }

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
