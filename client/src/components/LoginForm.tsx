import { useState } from "react";
import UserType from "../types/auth";
import userAPI from "../lib/userAPI";


type Props = {
    setUser: (user: UserType) => void
}

export default function LoginForm({setUser}: Props) {
    const [formData, setFormData] = useState<UserType|null>(null)

    const [message, setMessage] = useState<string>('')

    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        const {data, error}=await userAPI.login(formData!.email, formData!.password!)
        setMessage(error || '')
        if (data){
            setUser(data)
            setMessage("Logged in successfully")
        }
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({...formData!, [e.target.name]: e.target.value})
    }

    return (
    <div>
        <h1>Login</h1>
        <form  onSubmit={handleSubmit}>
            <input type="text" name="email" onChange={handleInputChange} placeholder="email"/>
            <br/>
            <input type="password" name="password" onChange={handleInputChange} placeholder="password"/>
            <br/>
            <button type="submit">Login</button>
            {message}
        </form>
    </div>

  )
}