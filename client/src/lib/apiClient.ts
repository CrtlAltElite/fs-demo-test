import axios from 'axios';



const base: string = window.location.hostname === '127.0.0.1' 
                    || window.location.hostname === 'localhost' 
                     ? "http://127.0.0.1:5000" : ''


const apiClientNoAuth = () => axios.create({
    baseURL: base
})

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
    }
})

const apiClientTokenAuth = (token: string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Bearer ' + token
    }
})

export{
    apiClientNoAuth,
    apiClientBasicAuth,
    apiClientTokenAuth,
}