import { useEffect, useState } from "react"
import RecipeType from "../types/recipe"
import recipeAPI from "../lib/recipeAPI"

type Props = {}
export default function ShowRecipes({}: Props) {
    const [recipes, setRecipes] = useState<RecipeType[]|null>(null)
    useEffect(() =>{
        const fetchData = async () => {
            const response = await recipeAPI.get();
            if (response.data){
                setRecipes(response.data)
            }
        }
        fetchData();
    },[])
  return (
    <div>
        <h1>Recipes</h1>
        {recipes?.map((r)=>(
            <div key={r.id}>
                Title: &emsp; &nbsp; {r.title}<br/>
                Body: &emsp;&nbsp; {r.body}<br/>
                Author:&emsp;{r.author}<br/>
            </div>
        )
        )}
    </div>
  )
}