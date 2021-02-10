const searchSongs=()=>{
    const searchText=document.getElementById("search-field").value;
    //console.log(searchText);
    const url=`https://api.lyrics.ovh/suggest/${searchText}`;
    //console.log(url);
    //load data
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySongs(data.data))
}

const displaySongs=(songs)=>{
    const songContainer=document.getElementById("song-container");
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

const getLyric=(artist,title)=>{
    console.log(artist,title);
}