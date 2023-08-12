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
  const getUserData = async () => {
    try {
      const res = await getUser();
      const board = await getBoard(res.boards[0]);
      setUserData(res);
      setBoard(board);
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
      userData ? <Home userData={userData} setUserData={setUserData} setBoard={setBoard} boardData={boardData} /> : <Login setUserData={setUserData} />
    )
  }
}

export default App;
