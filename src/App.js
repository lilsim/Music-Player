import React from 'react';
import './App.css';
import MusicPlayer from './Music_track'; // Import the MusicPlayer component

function App() {
    return (
        <div className="App">
            <div className="music-player">
                <MusicPlayer /> {/* Use the MusicPlayer component here */}
            </div>
        </div>
    );
}

export default App;
