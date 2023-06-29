import { useState } from "react"
import UserType from "../types/auth"
import recipeAPI from "../lib/recipeAPI"
import RecipeType from "../types/recipe"

type Props = {user:UserType|null}

export default function CreateRecipeForm({user}: Props) {
    if (!user){return "Login Required"}

    const [formData, setFormData] = useState<RecipeType|null>(null)

    const [message, setMessage] = useState<string>('')

    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        const {data, error}=await recipeAPI.create(user, {...formData!, author_id:user.id!})
        setMessage(error || '')
        if (data){
            setMessage('Successfully created')
        }
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({...formData!, [e.target.name]: e.target.value})
    }

    return (
    <div>
        <h1>Create Recipe</h1>
        <form  onSubmit={handleSubmit}>
            <input type="text" name="title" onChange={handleInputChange} placeholder="title"/>
            <br/>
            <input type="text" name="body" onChange={handleInputChange} placeholder="body"/>
            <br/>
            <button type="submit">Create Recipe</button>
            {message}
        </form>
    </div>
  )
}