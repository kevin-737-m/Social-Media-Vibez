import { Link } from 'react-router-dom'

const Welcome = () => {
    return (
        <div>
            <h2>
                Welcome to Vibez
            </h2>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <br />
            <Link to="/register">
                <button>Register</button>
            </Link>
        </div>
    )
}

export default Welcome