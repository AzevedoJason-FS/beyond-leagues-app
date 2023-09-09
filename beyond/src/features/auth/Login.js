import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        axios
        .post(`http://localhost:3500/auth`,{email: username, password: password})
        .then((response) => {
            const token  =  response.data.accessToken;
 
       //set JWT token to local
       localStorage.setItem("token", token);
       localStorage.setItem("id", response.data.id);
        navigate('/dash')
        });
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    return(
        <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
                type="text"
                value={username}
                onChange={handleUserInput}
                autoComplete="off"
                required
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={handlePwdInput}
                value={password}
                required
                autoComplete="off"
            />
            <button>Sign in</button>
        </form>
    )
}

export default Login