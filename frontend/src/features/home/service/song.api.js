import axios from "axios"

const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials: true
})
//http://localhost:3000/api/song/getSong?mood=sad

export async function getSong({mood}) {
    
    const response=await api.get(`/api/song/getSong?mood=${mood}`)


    return response
    
}