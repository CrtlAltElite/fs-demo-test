import { useEffect, useState } from "react";
import RecipeType from "../types/recipe";
import recipeAPI from "../lib/recipeAPI";
import UserType from "../types/auth";

type Props = {user:UserType|null}

export default function EditRecipeForm({user}: Props) {
    if (!user) return "You need to login"
    const [formData, setFormData] = useState<RecipeType|null>(null)
    const [message, setMessage] = useState<string>('')
    const [recipes, setRecipes] = useState<RecipeType[]|null>(null)
    const [recipeToEdit, setRecipeToEdit] = useState<RecipeType|null>(null)

    useEffect(() =>{
        const fetchData = async () => {
            const response = await recipeAPI.get();
            if (response.data){
                setRecipes(response.data.filter((r)=>r.author_id===user.id))
            }
        }
        fetchData();
    },[])

    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        const {data, error}=await recipeAPI.edit(user, formData!, recipeToEdit!.id!)
        setMessage(error || '')
        if (data){
            setMessage("Edited in successfully")
        }
    }

    const handleDelete=()=>{
        if (recipeToEdit){
            recipeAPI.del(user, recipeToEdit.id!)
            setMessage("Recipe Deleted")
        }
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({...formData!, [e.target.name]: e.target.value})
    }

    const handleChooseRecipeToEdit = (e: React.FormEvent<HTMLSelectElement>)=>{
        console.log(recipes?.filter((r)=>r.id === parseInt(e.currentTarget.value))[0])
        if (parseInt(e.currentTarget.value) !== 0){
            setRecipeToEdit(recipes?.filter((r)=>r.id === parseInt(e.currentTarget.value))[0]!)
        }else{
            setRecipeToEdit(null)
        }
    }

    return (
    <div>
        <h1>Edit Recipe</h1>
        <form  onSubmit={handleSubmit}>

            <select name="id" onChange={handleChooseRecipeToEdit}>
                <option value={0}>--Select Recipe--</option>
                {recipes?.map((r)=>(<option key={r.id} value={r.id}>{r.title}</option>))}
            </select>

            <br/>
            <input type="text" name="title" onChange={handleInputChange} placeholder={recipeToEdit?.title}/>
            <br/>
            <input type="text" name="body" onChange={handleInputChange} placeholder={recipeToEdit?.body}/>
            <br/>
            <button type="submit">Edit Recipe</button>

            <button type="button" onClick={handleDelete}>Delete Recipe</button>
            {message}
        </form>
    </div>

  )
}
