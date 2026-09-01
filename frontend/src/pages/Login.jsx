import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Login = ({ setUsername }) => {
    const [username, setLocalUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", { username, password });
            console.log(res.data);
            if (res.data.user?.username) {
                localStorage.setItem("username", res.data.user.username);
                if (setUsername) setUsername(res.data.user.username);
            }
            navigate("/create");
        } catch (error) {
            alert("Invalid Credentials");
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <p>Welcome Back</p>
            <form onSubmit={handleLogin}>
                <input type="text"
                    placeholder='Username or Email'
                    value={username}
                    onChange={(e) => setLocalUsername(e.target.value)}
                    required
                />
                <input type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
    )
}

export default Login