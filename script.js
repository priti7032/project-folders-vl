// List of Indian songs with title, artist, and audio URL (using sample URLs from public domain or placeholders)
const songs = [
    {
        title: "Tum Hi Ho",
        artist: "Arijit Singh",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Chaiyya Chaiyya",
        artist: "Sukhwinder Singh",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Jai Ho",
        artist: "A. R. Rahman",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        title: "Kal Ho Naa Ho",
        artist: "Sonu Nigam",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        title: "Tera Ban Jaunga",
        artist: "Akhil Sachdeva",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    }
    
];

const audio = document.getElementById('audio');
const playlist = document.getElementById('playlist');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentSongIndex = 0;
let isPlaying = false;

// Load playlist dynamically
function loadPlaylist() {
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.setAttribute('data-index', index);
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        playlist.appendChild(li);
    });
}

// Load song details and audio source
function loadSong(index) {
    const song = songs[index];
    audio.src = song.url;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    updateActiveSong();
}

// Play the audio
function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = '&#10074;&#10074;'; // Pause icon
    animatePlayButton(true);
}

// Pause the audio
function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = '&#9654;'; // Play icon
    animatePlayButton(false);
}

// Toggle play/pause
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Play previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playSong();
});

// Play next song
nextBtn.addEventListener('click', () => {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    playSong();
});

// Update active song in playlist UI
function updateActiveSong() {
    const items = playlist.querySelectorAll('li');
    items.forEach(item => item.classList.remove('active'));
    const activeItem = playlist.querySelector(`li[data-index="${currentSongIndex}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Animate play button when playing
function animatePlayButton(playing) {
    if (playing) {
        playBtn.classList.add('playing');
    } else {
        playBtn.classList.remove('playing');
    }
}

// When song ends, play next automatically
audio.addEventListener('ended', () => {
    nextBtn.click();
});

// Initialize
loadPlaylist();
loadSong(currentSongIndex);
