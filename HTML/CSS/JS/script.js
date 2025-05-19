console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');                                                       
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let splay=document.getElementsByClassName('songItemPlay');

let songs = [
        { songName: "Ravi", filePath: "", coverPath: "" },
        { songName: "Perfect", filePath: "../music/s2.mp3", coverPath: "" },
        { songName: "Somewhere Only We Know", filePath: "../music/s3.mp3", coverPath: "../Images/3.png" },
        { songName: "Salame-Ishq Meri Jaan", filePath: "../music/s4.mp3", coverPath: "../Images/4.png" },
        { songName: "Kya Hua Tera Wada", filePath: "../music/s5.mp3", coverPath: "../Images/5.png" },
        { songName: "Saiyyan", filePath: "../music/s6.mp3", coverPath: "../Images/6.png" },
        { songName: "I Am In Love", filePath: "../music/s7.mp3", coverPath: "../Images/7.png" },
        { songName: "Enna Sona", filePath: "../music/s8.mp3", coverPath: "../Images/8.png" },
        { songName: "Agar Tum Saath Ho", filePath: "../music/s9.mp3", coverPath: "../Images/9.png" },
        { songName: "Nadaan Parindey", filePath: "../music/s10.mp3", coverPath: "../Images/10.png" },
        { songName: "Mera yaar", filePath: "../music/s11.mp3", coverPath: "../Images/11.png" },
        { songName: "Tu Hi Haqeeqat", filePath: "../music/s12.mp3", coverPath: "../Images/12.png" },
    ];
    
    
    

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `../music/s${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `../music/s${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `../music/s${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
 const updateSongList = (query) => {
        const filteredSongs = songs.filter(song => song.songName.toLowerCase().includes(query.toLowerCase()));
        songItems.forEach((element, i) => {
            const isVisible = filteredSongs.includes(songs[i]);
            element.style.display = isVisible ? 'block' : 'none';
        });
    };

    // Event listener for search input changes
    searchInput.addEventListener('input', function () {
        const searchQuery = this.value.trim();
        updateSongList(searchQuery);

        // Optionally, you can reset the search when the input is empty
        if (!searchQuery) {
            songItems.forEach(element => {
                element.style.display = 'block';
            });
        }
    });