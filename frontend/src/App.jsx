import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Create from './pages/Create'
import axios from 'axios'

const App = () => {
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('https://social-media-vibez.onrender.com/api/auth/logout');
      localStorage.removeItem("username");
      setUsername("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <header>
        <h1>Vibez — Share your moment</h1>
        {username && <p>Welcome, {username} 👋</p>}
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={<Login setUsername={setUsername} />} />
          <Route path='/register' element={<Register setUsername={setUsername} />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </main>
      <footer>
        <Link to='/'><button>Home</button></Link>
        <Link to='/feed'><button>Feed</button></Link>
        <Link to='/create'><button>Create</button></Link>
        {username && <button onClick={handleLogout}>Logout</button>}
      </footer>
    </div>
  )
}

export default App