import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';

const Register = ({ setUsername }) => {
    const [username, setLocalUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://social-media-vibez.onrender.com/api/auth/register", { username, email, password }, { withCredentials: true });
            console.log(res.data);
            if (res.data.user?.username) {
                localStorage.setItem("username", res.data.user.username);
                if (setUsername) setUsername(res.data.user.username);
            }
            navigate("/login");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Registration failed");
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <p>Join Our Community</p>
            <form onSubmit={handleRegister}>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setLocalUsername(e.target.value)}
                    required
                />
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit'>Register</button>
            </form>
            <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
    )
}

export default Register