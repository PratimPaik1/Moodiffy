import React from 'react'
import { useSong } from '../hooks/useSong'
import PlaySong from '../components/PlaySong'
import Expression from '../../faces/pages/Expression'
import './Home.scss'

import AllSongs from '../components/AllSongs'


const Home = () => {
    const { handleGetSong } = useSong()
    return (
        <div className="home-container">
            <div className="home-header">
                <h1 className="main-title">🎵 Moodify</h1>
                <p className="subtitle">Detect Your Mood, Get Perfect Music</p>
            </div>

            <div className="home-content">
                <div className="expression-section">
                    <h2 className="section-title">Emotion Detection</h2>
                    <Expression  handleGetSong={handleGetSong}/>
                </div>

                <div className="player-section">
                    <h2 className="section-title">Your Song</h2>
                    <PlaySong />
                </div>
                <div className="songs-section">
                    <h2 className="section-title">Songs based on your mood</h2>
                    <AllSongs/>
                </div>
            </div>
        </div>
    )
}

export default Home
