import React from 'react'
import {useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { auth } from '../firebase'
import { Link, useHistory } from 'react-router-dom'


const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
}




const LogIn = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    // const { login } = useAuth
    const [loading, setLoading] = useState(false)
    const history = useHistory()
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            alert("Login Failed")
        }
        setLoading(false)
    }

    return (
        <div>
            <div>
                <h1>Welcome Michael</h1>
                <form onSubmit={e => handleSubmit(e)}>
                <input 
                        ref={emailRef}
                        id= "email"
                        name="email"
                        placeholder="enter email"
                        type="text"
                        />
                    <input 
                        ref={passwordRef}
                        id= "password"
                        name="password"
                        placeholder="enter password"
                        type="password"
                        />
                        <div>
                            <button disabled={loading} type="submit">Log In</button>
                        </div>
                </form>
            </div>
            <div>
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>
        </div>
    )
}

export default LogIn