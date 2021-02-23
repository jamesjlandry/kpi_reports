import React , { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError ] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your email to continue resetting password")
        } catch {
            setError("Password Reset failed")
        }
        setLoading(false)
    }

    return (
        <div>
        <div>
            {error && alert(error)}
            {message && alert(message)}
            <h1>Welcome Michael</h1>
            <form onSubmit={e => handleSubmit(e)}>
            <input 
                    ref={emailRef}
                    id= "email"
                    name="email"
                    placeholder="enter email"
                    type="text"
                    />
                
                    <div>
                        <button disabled={loading} type="submit">Reset Password</button>
                    </div>
            </form>
        </div>
        <div>
            <Link to="/LogIn">Log In</Link>
        </div>
    </div>
    )

}


export default ForgotPassword