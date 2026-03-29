import {  useRef, useState, useEffect } from "react";
import { useSong } from "../hooks/useSong";
import "./PlaySong.scss";

const moodColors = {
    happy: "#FFD700",
    sad: "#4169E1",
    energetic: "#FF6347",
    calm: "#98FB98",
    romantic: "#FF69B4",
    angry: "#DC143C",
    melancholic: "#8B7355",
    peaceful: "#87CEEB",
    default: "#9370DB",
};

export const PlaySong = () => {
    const { song } = useSong();
    const audioRef = useRef(null);
    const progressRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [speed, setSpeed] = useState(1);

    // Format time helper
    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Play/Pause handler
    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Speed change handler
    const handleSpeedChange = (e) => {
        const newSpeed = parseFloat(e.target.value);
        setSpeed(newSpeed);
        if (audioRef.current) {
            audioRef.current.playbackRate = newSpeed;
        }
    };

    // Update current time
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Update duration
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Progress bar handler
    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    // Handle song end
    const handleSongEnd = () => {
        setIsPlaying(false);
    };

    useEffect(()=>{
        setIsPlaying(false)
    },[song])
    const moodColor = moodColors[song?.mood?.toLowerCase()] || moodColors.default;

    return (
        <div className="play-song-container">
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={song?.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleSongEnd}
                onError={(e) => console.error("Audio error:", e)}
                crossOrigin="anonymous"
            />

            {/* Poster Section */}
            <div className="poster-section">
                <img
                    src={song?.posterUrl}
                    alt={song?.title}
                    className={`song-poster ${isPlaying ? "playing" : ""}`}
                />
            </div>

            {/* Song Info Section */}
            <div className="song-info">
                <h2 className="song-title">{song?.title}</h2>
                <div className="mood-badge" style={{ backgroundColor: moodColor }}>
                    {song?.mood?.toUpperCase()}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
                <input
                    ref={progressRef}
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="progress-bar"
                />
                <div className="time-display">
                    <span className="current-time">{formatTime(currentTime)}</span>
                    <span className="duration">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Controls Section */}
            <div className="controls-section">
                {/* Play/Pause Button */}
                <button
                    className="control-btn play-pause-btn"
                    onClick={handlePlayPause}
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                {/* Speed Controller */}
                <div className="speed-controller">
                    <label htmlFor="speed-select">Speed:</label>
                    <select
                        id="speed-select"
                        value={speed}
                        onChange={handleSpeedChange}
                        className="speed-select"
                    >
                        <option value="0.5">0.5x</option>
                        <option value="0.75">0.75x</option>
                        <option value="1">1x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="1.75">1.75x</option>
                        <option value="2">2x</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PlaySong;
