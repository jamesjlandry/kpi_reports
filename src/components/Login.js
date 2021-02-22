import React from 'react'
import {useState} from 'react'

const [password, setPassword] = useState('')

const handleSubmit = (e) => {
    e.preventDefault();
    let pWord = {
        password: password
    }
    login(pWord)
}

// const login = async (pWord) => {
//     let response = await fetch(''), {
       
//     }
// }

let LogIn = () => {
    return (
        <div>
            <h1>Welcome Michael</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input 
                    onChange={e => setPassword(e.target.value)}
                    id= "password"
                    name="password"
                    placeholder="enter password"
                    type="text"
                    value={password}
                    />
                    <div>
                        <button type="submit">Log In</button>
                    </div>
            </form>
        </div>
    )
}

export default LogIn