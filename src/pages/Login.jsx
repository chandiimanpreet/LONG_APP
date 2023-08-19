import React from 'react'
import './login.css'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../backend/firebase';
import { addNewBoard, loginUser } from '../backend/api/user';
import { getBoard } from '../backend/api/board';
import { useSearchParams } from 'react-router-dom';

function Login({ setUserData, setBoard, setPulseLoading }) {
    const [searchParams] = useSearchParams();
    const signInUser = () => {
        signInWithPopup(auth, provider)
            .then(async () => {
                const res = await loginUser();
                if (searchParams.has("boardId") && searchParams.has("boardName") && res.boards[searchParams.get("boardId")] === undefined) {
                    const newBoards = await addNewBoard(searchParams.get("boardName"), searchParams.get("boardId"), res);
                    setUserData({ ...res, boards: newBoards });
                } else {
                    setUserData(res);
                }
                if (Object.keys(res.boards).length > 0) {
                    console.log("dfwff");
                    setPulseLoading(true)
                    const board = await getBoard(Object.keys(res.boards)[0]);
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
