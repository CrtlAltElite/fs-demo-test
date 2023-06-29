import {apiClientNoAuth, apiClientTokenAuth, apiClientBasicAuth} from './apiClient'
import APIResponse from '../types/apiTypes';
import  { AxiosResponse } from 'axios';
import UserType from '../types/auth';

const userEndpoint: string = '/user';



async function register(newUser: UserType): Promise<APIResponse<string> > {
    let error;
    let data;
    try {
        const response: AxiosResponse<string> = await apiClientNoAuth().post(userEndpoint, newUser)
        data = response.data
    } catch(err){
        error = 'Something went wrong'
    }
    return {
        error,
        data
    }
}


async function login(username:string, password:string): Promise<APIResponse<UserType> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<UserType> = await apiClientBasicAuth(username, password).get(userEndpoint)
        data = response.data
    } catch(err){

        error = 'Something went wrong'
        
    }
    return {
        error,
        data
    }
}

async function editProfile(user:UserType, changedData:Partial<UserType>): Promise<APIResponse<string> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<string> = await apiClientTokenAuth(user.token!).put(userEndpoint, changedData)
        data = response.data
    } catch(err){
        error = 'Something went wrong'
    }
    return {
        error,
        data
    }
}

async function deleteUser(user:UserType): Promise<APIResponse<string> > {
    let error;
    let data;
    try{
        const response: AxiosResponse<string> = await apiClientTokenAuth(user.token!).delete(userEndpoint)
        data = response.data
    } catch(err){
        error = 'Something went wrong'
    }
    return {
        error,
        data
    }
}

export default {
    register,
    login,
    editProfile,
    deleteUser
}