import { useState } from "react";
import UserType from "../types/auth";
import userAPI from "../lib/userAPI";

type Props = {user:UserType|null}
export default function EditProfileForm({user}: Props) {
    if (!user){return "Login first"}
  
    const [formData, setFormData] = useState<UserType|null>(null)
    const [message, setMessage] = useState<string>('')

    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        const {data, error} = await userAPI.editProfile(user, formData!)
        setMessage(error || '')
        if (data){
            setMessage(data)
        }

    }

    const handleDelete=async ()=>{
        userAPI.deleteUser(user)
        setMessage("Deleted User")

    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({...formData!, [e.target.name]: e.target.value})
    }

    return (
    <div>
        <h1>Edit Profile</h1>
        <form  onSubmit={handleSubmit}>
            <input type="text" name="first_name" onChange={handleInputChange} placeholder={user.first_name}/>
            <br/>
            <input type="text" name="last_name" onChange={handleInputChange} placeholder={user.last_name}/>
            <br/>
            <input type="text" name="email" onChange={handleInputChange} placeholder={user.email}/>
            <br/>
            <input type="password" name="password" onChange={handleInputChange} placeholder="password"/>
            <br/>
            <button type="submit">Edit Profile</button>
            <button type="button" onClick={handleDelete}>Delete Account</button>
            {message}
        </form>
    </div>
  )
}