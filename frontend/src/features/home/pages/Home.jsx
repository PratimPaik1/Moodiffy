import React, { useEffect } from 'react'
import { useSong } from '../hooks/useSong'
import PlaySong from '../components/PlaySong'
import Expression from '../../faces/pages/Expression'
import './Home.scss'


import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'
import AllSongs from '../components/AllSongs'
const Home = () => {
    const { handleGetSong } = useSong()
    const navigate=useNavigate()
useEffect(() => {
    const verifyUser = async () => {
        try {
            const res = await fetch("/api/auth/me", {
                credentials: "include"
            })

            if (!res.ok) {
                navigate("/login")
            }
        } catch (err) {
            navigate("/login")
        }
    }

    verifyUser()
}, [navigate])
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
                <div>
                    <h2>Songs based on your mood</h2>
                    <AllSongs/>
                </div>
            </div>
        </div>
    )
}

export default Home
