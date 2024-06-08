// ITERATING THROUGHT THE DATA AND CREATING A CARD FOR PLAYLIST

function cardCreator(){
    const playlistCards = document.querySelector('.playlist-cards');

    data.playlists.forEach( playlist =>{

        const card = document.createElement('div');
        card.classList.add('playlist');

        console.log(playlist);

        card.innerHTML =
            `
                <img src="${playlist.playlist_art }">
                <div class="playlist-info">
                    <h4> ${playlist.playlist_name}</h4>
                    <h5> ${playlist.playlist_creator}</h5>
                    <i class="fa-regular fa-heart"></i>
                    <span>${playlist.likeCount}</span>
                </div>

            `
        playlistCards.appendChild(card);


// LINKING & UNLIKING SONGS

        card.addEventListener("click",(event) =>{
            const heart= document.createElement('i');
            heart.classList.add('fa-solid', 'fa-heart');
            heart.style.color= "red";

            if (event.target.classList.contains('fa-regular')){
                event.target.parentNode.replaceChild(heart, event.target);
                playlist.likeCount++;
                const likes = document.querySelectorAll('.playlist-info span');
                likes[playlist.playlistID].textContent = playlist.likeCount;


            }
            else if (event.target.classList.contains('fa-solid')){
                const unlike = document.createElement('i');
                unlike.classList.add('fa-regular', 'fa-heart');
                event.target.parentNode.replaceChild(unlike, event.target);
                playlist.likeCount--;
                const likes = document.querySelectorAll('.playlist-info span');
                likes[playlist.playlistID].textContent = playlist.likeCount;
            }

            else{
                playlistDetails(playlist);
            }
        });
    })

}
cardCreator();


// OPENING MODAL WHEN PLAYLIST IS SELECTED


function playlistDetails(playlist){

    const modal_container = document.querySelector('.modal-content');
    modal_container.innerHTML='';
    const modal_heading = document.createElement('div');
    modal_heading.classList.add('modal-heading');

    modal_heading.innerHTML =
    `
        <img src="${playlist.playlist_art }">
        <div class=" modal_heading_info">
            <h4> ${playlist.playlist_name}</h4>
            <h5> Created by ${playlist.playlist_creator}</h5>
        </div>
        <button class="close"> X </button>
    `
    modal_container.appendChild(modal_heading);

    modal_container.innerHTML += `
        <button id=${playlist.playlistID} class= "shuffle-button"> Shuffle </button>

    `

    // LISTING SONG CARD AND DETAILS IN MODAL

    const songCards = document.createElement('div');
    songCards.classList.add('song-cards');

    playlist.songs.forEach(song => {
        const moreSongs = document.createElement('div');
        moreSongs.classList.add('song');

        moreSongs.innerHTML = `

        <img src="${song.cover_art }">
                <div class="more-Songsinfo">
                    <p> ${song.title}</p>
                    <p> ${song.artist}</p>
                    <p> ${song.album} </p>

                </div>
                <span> ${song.duration}</span>
        `
        songCards.appendChild(moreSongs);
    } )

    modal_container.appendChild(songCards);
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.style.display = "block";


    // CLOSING MODAL WITH BUTTON
    const closer = document.querySelector('.close');
    closer.addEventListener("click", () =>{
        modalOverlay.style.display= "none";
    })
}
