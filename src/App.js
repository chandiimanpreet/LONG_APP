import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Loading from './components/Loading';
import { useEffect } from 'react';
import { getUser } from './backend/api/user';
import { getBoard } from './backend/api/board';

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [boardData, setBoard] = useState(null);
  const [pulseLoading, setPulseLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const getUserData = async () => {
    try {
      const res = await getUser();
      setUserData(res);
      if (Object.keys(res.boards).length > 0) {
        setPulseLoading(true)
        const board = await getBoard(Object.keys(res.boards)[0]);
        setSelected(Object.keys(res.boards)[0]);
        setBoard(board);
        setPulseLoading(false)
      }
    }
    catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getUserData()
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