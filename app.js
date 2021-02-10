const searchSongs=async()=>{
    const searchText=document.getElementById("search-field").value;
    //console.log(searchText);
    const url=`https://api.lyrics.ovh/suggest/${searchText}`;
    //console.log(url);
    //load data
    // const res= await fetch(url);
    // const data= await res.json();
    // displaySongs(data.data);
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySongs(data.data))
    .catch(error=>displayError('Something went song. Please, try again later.'))
}

const displaySongs=(songs)=>{
    const songContainer=document.getElementById("song-container");
    songContainer.innerHTML="";
    songs.forEach(song => {
        console.log(song);
        const songDiv=document.createElement("div");
        songDiv.className="search-result col-md-8 mx-auto py-4";
        songDiv.innerHTML=`
            <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
    </div>
        `;
        songContainer.append(songDiv);
    });
}

const getLyric=async(artist,title)=>{
    //console.log(artist,title);
    const url=`https://api.lyrics.ovh/v1/${artist}/${title}`;
    //console.log(url);

    try{
        const res= await fetch(url);
        const data= await res.json();
        displayLyrics(data.lyrics);
    }catch(error){
        displayError('Sorry! I failed to load lyrics, please try again later');
    }


}

const displayLyrics=lyrics=>{
    const lyricsDiv=document.getElementById("song-lyrics");
    lyricsDiv.innerText=lyrics;
}

const displayError=error=>{
    const errorTag=document.getElementById("error-message");
    errorTag.innerText=error;
}