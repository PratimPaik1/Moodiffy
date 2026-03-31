import { useMemo } from "react";
import { useSong } from "../hooks/useSong";
import "./Allsong.scss";

const AllSongs = () => {
    const { allSong, loading, setsong } = useSong();

    const songs = useMemo(() => {
        return Array.isArray(allSong) ? allSong : [];
    }, [allSong]);

    if (loading) {
        return <div className="all-songs-state">Loading songs...</div>;
    }

    if (songs.length === 0) {
        return <div className="all-songs-state">No songs available yet.</div>;
    }

    function handleClick(track){
        // console.log("Clicked song details:", track);
        setsong(track);
    }
    return (
        <div className="all-songs-list">
            {songs.map((track, index) => (
                <div
                    onClick={() => handleClick(track)}
                    className="song-item"
                    key={track?._id || track?.url || `${track?.title || "song"}-${index}`}
                >
                    <img
                        className="song-item-poster"
                        src={track?.posterUrl}
                        alt={track?.title || "song poster"}
                        loading="lazy"
                    />
                    <p className="song-item-title">{track?.title || "Untitled Song"}</p>
                </div>
            ))}
        </div>
    );
};

export default AllSongs
