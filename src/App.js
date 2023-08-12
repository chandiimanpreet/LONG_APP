import './App.css';
import { auth } from './backend/firebase';
import Home from './pages/Home';
import Login from './pages/Login';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);
  return (
      <div>
        <div>{
          user ? <Home /> : <Login />
        }</div>
      </div>
  );
}

export default App;
 