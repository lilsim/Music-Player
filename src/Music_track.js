import React, { useState, useRef } from 'react';
import song1 from './assets/songs/song1.mp3';
import song2 from './assets/songs/song2.mp3';
import song3 from './assets/songs/song3.mp3';

// Sample track list
const trackList = [
    { title: 'Song 1', url: song1 },
    { title: 'Song 2', url: song2 },
    { title: 'Song 3', url: song3 },
];

function MusicPlayer() {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playlistVisible, setPlaylistVisible] = useState(false); // State for playlist visibility
    const [addToPlaylistVisible, setAddToPlaylistVisible] = useState(false); // State for add to playlist visibility
    const [playlist, setPlaylist] = useState([]);
    const audioRef = useRef(null);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const playPrevSong = () => {
        setCurrentTrackIndex(prevIndex => (prevIndex === 0 ? trackList.length - 1 : prevIndex - 1));
    };

    const playNextSong = () => {
        setCurrentTrackIndex(prevIndex => (prevIndex === trackList.length - 1 ? 0 : prevIndex + 1));
    };

    const handleTrackChange = () => {
        const audio = audioRef.current;
        audio.load();
        if (isPlaying) {
            audio.play();
        }
    };

    const addToPlaylist = (track) => {
        // Prevent adding duplicates
        if (!playlist.some(item => item.title === track.title)) {
            setPlaylist([...playlist, track]);
        }
    };

    const togglePlaylistVisibility = () => {
        setPlaylistVisible(!playlistVisible); // Toggle playlist visibility
    };

    const toggleAddToPlaylistVisibility = () => {
        setAddToPlaylistVisible(!addToPlaylistVisible); // Toggle add to playlist visibility
    };

    React.useEffect(() => {
        handleTrackChange();
    }, [currentTrackIndex]);

    return (
        <div className="musicPlayer">
            <h2>Now Playing: {trackList[currentTrackIndex].title}</h2>
            <audio ref={audioRef} controls src={trackList[currentTrackIndex].url}>
                Your browser does not support the audio element.
            </audio>
            <div className="controls">
                <button onClick={playPrevSong}>⏮️ Prev</button>
                <button onClick={togglePlayPause}>
                    {isPlaying ? '⏸️ Pause' : '⏯️ Play'}
                </button>
                <button onClick={playNextSong}>⏭️ Next</button>
            </div>

            {/* Toggle Add to Playlist Button */}
            <button className="toggle-add-to-playlist" onClick={toggleAddToPlaylistVisibility}>
                {addToPlaylistVisible ? '🔽 Hide Add to Playlist' : 'Add to Playlist +'}
            </button>

            {/* Add to Playlist Section */}
            {addToPlaylistVisible && (
                <div className="track-list">
                    <h3>All Songs</h3>
                    {trackList.map((track, index) => (
                        <div key={index} className="track-item">
                            <span>{track.title}</span>
                            <button onClick={() => addToPlaylist(track)}>➕ Add to Playlist</button>
                        </div>
                    ))}
                </div>
            )}

            {/* Toggle Playlist Button */}
            <button className="toggle-playlist" onClick={togglePlaylistVisibility}>
                {playlistVisible ? '🔽 Hide Playlist' : 'Show Playlist'}
            </button>

            {/* Playlist Section */}
            {playlistVisible && (
                <div className="playlist">
                    <h3>Your Playlist</h3>
                    {playlist.length === 0 ? (
                        <p>No songs in playlist</p>
                    ) : (
                        <ul>
                            {playlist.map((track, index) => (
                                <li key={index}>{track.title}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default MusicPlayer;
