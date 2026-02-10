import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';

function App() {
  const [login,setLogin] = useState(true);
  return <>
    {/* <button onClick={() => setLogin(prev => !prev)}>login</button> */}
    {/* {
      login ? <Login></Login> : <Signup></Signup>
    } */}
    <Dashboard></Dashboard>
  </>
}

export default App
