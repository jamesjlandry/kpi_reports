import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const EditProfile = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")
         if (emailRef.current.value !== currentUser.email) {
             promises.push(updateEmail(emailRef.current.value))
         }
         if(passwordRef.current.value) {
             promises.push(updatePassword(passwordRef.current.value))
         }

         Promise.all(promises)
         .then(() => {
             history.push("/")
         })
         .catch(() => {
             alert("Failed to update account")
         })
         .finally(() => {
             setLoading(false)
         })
    }

    return (
        <>
        <div>
        <div>
            <div>
                
                <h1>Welcome Michael</h1>
                <h2>Update Profile</h2>
                {error}
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
                        placeholder="enter new password"
                        type="password"
                        />
                        <input 
                        ref={passwordConfirmRef}
                        id= "password"
                        name="password"
                        placeholder="confirm password"
                        type="password"
                        />
                        <div>
                            <button disabled={loading} type="submit">Make It So</button>
                        </div>
                </form>
            </div>
            <div>
                <Link to="/">Cancel</Link>
            </div>
        </div>
        </div>
        </>
    )

}

export default EditProfile