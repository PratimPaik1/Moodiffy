import axios from "axios"

const api=axios.create({
     baseURL: "http://localhost:3000/api",
    withCredentials: true
})
//http://localhost:3000/api/song/getSong?mood=sad

export async function getSong({mood}) {
    console.log(mood)
    const response=await api.get(`/song/getSong?mood=${mood}`)

    return response
    
}