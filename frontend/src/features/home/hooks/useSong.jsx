import { useContext } from "react";

import { getSong } from "../service/song.api";
import { songContext } from "../Song.conext";

export const useSong=()=>{
    const conext=useContext(songContext)

    const {loading,setLoading,song,setsong}=conext

    async function handleGetSong({mood}) {
        setLoading(true);
        try {
            const response=await getSong({mood})
            console.log(response.data.song)
            
            // Update the song in context
            setsong(response.data.song)
            
            return response
        } catch (error) {
            console.error("Error fetching song:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {handleGetSong,song,loading}
}