import {apiClientNoAuth, apiClientTokenAuth} from './apiClient'
import APIResponse from '../types/apiTypes';
import { AxiosResponse } from 'axios';
import RecipeType from '../types/recipe';
import UserType from '../types/auth';

const recipeEndpoint: string = '/recipe';

async function get(): Promise<APIResponse<RecipeType[]> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<RecipeType[]> = await apiClientNoAuth().get(recipeEndpoint)
        data = response.data
    } catch(err) {
            error = 'Something went wrong'
    }
    return {
        error,
        data
    }
}



async function create(user: UserType, newRecipe: RecipeType): Promise<APIResponse<RecipeType> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<RecipeType> = await apiClientTokenAuth(user.token!).post(recipeEndpoint, newRecipe)
        data = response.data
    } catch(err) {

            error = 'Something went wrong'
        
    }
    return {
        error,
        data
    }
}


async function edit(user:UserType, changedData:Partial<RecipeType>, id:number): Promise<APIResponse<RecipeType> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<RecipeType> = await apiClientTokenAuth(user.token!).put(recipeEndpoint+`/${id}`, changedData)
        data = response.data
    } catch(err){

        error = 'Something went wrong'

    }
    return {
        error,
        data
    }
}

async function del(user:UserType, recipeID: number): Promise<APIResponse<string> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<string> = await apiClientTokenAuth(user.token!).delete(recipeEndpoint + '/' + recipeID)
        data = response.data
    } catch(err) {

        error = 'Something went wrong'

    }
    return {
        error,
        data
    }
}

export default{
    get,
    create,
    edit,
    del
}