import { createContext, useState } from "react";

export const songContext = createContext();

export const SongProvider = ({ children }) => {
    const [song, setsong] = useState({
        url: "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/songs/Lady_Singham_gs01DFz-1.mp3",
        posterUrl: "https://ik.imagekit.io/hnoglyswo0/cohort-2/moodify/posters/Lady_Singham_VW8DGJkie.jpeg",
        title: "Lady Singham",
        mood: "happy",
    });

    const [loading, setLoading] = useState(false);

    const [allSong, setallSong] = useState([])

    return (
        <songContext.Provider
            value={{ loading, setLoading, song, setsong ,allSong,setallSong}}
        >
            {children}
        </songContext.Provider>
    );
};