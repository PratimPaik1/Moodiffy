import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials: true,
})

export async function login(userName, password) {

    try{
        const response=api.post('/api/auth/login',{
            userName:userName,
            email:userName,
            password:password
        })

        return response
    }
    catch(err){
        throw err
    }
}


export async function register(userName,email,password){
    try{

        const response=await api.post('api/auth/register',{
            userName:userName,
            email:email,
            password:password
        })
        
        return response
    }
    catch(err){
        
        throw err
    }
}


export async function getMe(){
    try{
        const response= await api.get("/api/auth/getMe",)
        return response
    }
    catch(err)
    {
      throw err
    }
}