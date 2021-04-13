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
        } catch(error) {
            alert(error.message)
        }
        setLoading(false)
    }

    return (
        <div className="login_wrapper">
         
            <div className="login_form">
                <div className="login_logo">
                    <img src="/images/impart_logo.png" alt="Impart Quality"/>
                </div>
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
                            <button className="submit_button" disabled={loading} type="submit">Log In</button>
                        </div>
                </form>
                <div>
                <Link className="forgot_password" to="/forgot-password"  >Forgot Password?</Link>
            </div>
            </div>
           
        </div>
    )
}

export default LogIn