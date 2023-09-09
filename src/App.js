import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Loading from './components/Loading';
import { useEffect } from 'react';
import { addNewBoard, getUser } from './backend/api/user';
import { useSearchParams } from 'react-router-dom';
import { onSnapshot,doc } from '@firebase/firestore';
import { db } from './backend/api/tickets';

function App() {
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [boardData, setBoard] = useState(null);
  const [pulseLoading, setPulseLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const getUserData = async () => {
    try {
      const res = await getUser();
      if (searchParams.has("boardId") && searchParams.has("boardName") && res.boards[searchParams.get("boardId")] === undefined) {
        const newBoards= await addNewBoard(searchParams.get("boardName"),searchParams.get("boardId"),res);
        setUserData({...res,boards:newBoards});
      }else{
        setUserData(res);
      }
      if (Object.keys(res.boards).length > 0) {
        setPulseLoading(true)
        setSelected(Object.keys(res.boards)[0]);
      }
    }
    catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(()=>{
    let unsub=null;
    if(selected){
      unsub=onSnapshot(doc(db,"boards",selected),(doc)=>{
        setBoard(doc.data());
        setPulseLoading(false);
      })
    }
    return ()=>{
      if(unsub)unsub();
    }
  },[selected])
  useEffect(() => {
    getUserData()
    // eslint-disable-next-line
  }, [])
  if (loading) {
    return <Loading />;
  } else {
    return (
      userData ? <Home selected={selected} setSelected={setSelected} pulseLoading={pulseLoading} setPulseLoading={setPulseLoading} userData={userData} setUserData={setUserData} setBoard={setBoard} boardData={boardData} /> : <Login setPulseLoading={setPulseLoading} setBoard={setBoard} setUserData={setUserData} />
    )
  }
}

export default App;