(function () {
    "use strict";

    function getDbData() {
        fetch(dbUrl).then(response => {
            return response.json();
        }).then(data => {
            setPlayerInfoArray(data)
        }).then(() => {
            displayPlayers();
        }).catch((err) => {
            console.log(err);
        });
    }

    function setPlayerInfoArray(playerData){
        playerInfo = [];
        for(let player of playerData){
            playerInfo.push(player);
        }
    }

    function displayPlayers(){
        for (let player of playerInfo){
            displayPlayerInfo(player);
        }
    }

    function displayPlayerInfo(player){
        let html = "";
        html += `<div class="playerTile grid">`

        //Player icon and level section
        html += `<div class="playerIcon">`
        html += `<img src="http://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/${player.profileIconID}.png" alt="${player.name}'s profile icon">`
        html += `<div class="summonerLevelPill">`
        html += `<p class="summonerLevel">${player.summonerLevel}</p>`
        html += `</div>`//end player summoner level
        html += `</div>`//end player icon

        //Player name and summoner name
        html += `<div class="tileNames">`
        html += `<p class="summonerName">${player.summonerName}</p>`
        html += `<p class="playerName">${player.name}</p>`
        html += `</div>`//end player names

        html += `</div>`//end player Tile
        playerNameTiles.innerHTML += html;
    }

    /*
    ========================================
    Variables and Arrays
    ========================================
     */
    const dbUrl = "https://chain-torch-terrier.glitch.me/players/"
    const playerNameTiles = document.querySelector("#trackedFriendsSidebar");
    let playerInfo = [];
    getDbData();
})();