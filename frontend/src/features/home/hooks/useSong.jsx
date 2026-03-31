import { useContext } from "react";

import { getSong } from "../service/song.api";
import { songContext } from "../Song.conext";

export const useSong=()=>{
    const conext=useContext(songContext)
    if (!conext) {
        throw new Error("useSong must be used within SongProvider");
    }

    const {loading, setLoading, song, setsong ,allSong,setallSong}=conext

    async function handleGetSong({mood}) {
        setLoading(true);
        try {
            const response=await getSong({mood})
            //  console.log(response.data.songs)
            
            
            setallSong(response.data.songs)
           // console.log(response.data.songs)
            setsong(response.data.songs[0])
            
            return response
        } catch (error) {
            console.error("Error fetching song:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {handleGetSong,song,loading,setLoading,setsong,allSong,setallSong}
}
