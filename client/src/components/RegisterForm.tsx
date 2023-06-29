import { useState } from "react"
import UserType from "../types/auth"
import userAPI from "../lib/userAPI"

export default function RegisterForm() {
  
    const [formData, setFormData] = useState<UserType|null>(null)
    const [message, setMessage] = useState<string>('')

    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        const {error} = await userAPI.register(formData!)
        setMessage(error||'Successfully registered')

    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({...formData!, [e.target.name]: e.target.value})
    }

    return (
    <div>
        <h1>Register</h1>
        <form  onSubmit={handleSubmit}>
            <input type="text" name="first_name" onChange={handleInputChange} placeholder="first_name"/>
            <br/>
            <input type="text" name="last_name" onChange={handleInputChange} placeholder="last_name"/>
            <br/>
            <input type="text" name="email" onChange={handleInputChange} placeholder="email"/>
            <br/>
            <input type="text" name="password" onChange={handleInputChange} placeholder="password"/>
            <br/>
            <button type="submit">Register</button>
            {message}
        </form>
    </div>

  )
}
