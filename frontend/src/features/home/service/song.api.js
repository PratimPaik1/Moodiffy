import axios from "axios"

const api=axios.create({
     baseURL: "https://moodify-2zhx.onrender.com",
    withCredentials: true
})
//http://localhost:3000/api/song/getSong?mood=sad

export async function getSong({mood}) {
    console.log(mood)
    const response=await api.get(`/song/getSong?mood=${mood}`)

    return response
    
}