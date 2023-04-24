(function () {
    "use strict";
    $.ajax("/assets/data/players.json")
        .done(function (data, status, jqXhr){
        setPlayerInfo(data);
        getPlayerInfo();
        }
    );

    function setPlayerInfo(playerData) {
        playerData.forEach((player) => {
            let person = {
                'name' : player.player_name,
                'accountID' : player.account_id,
                'summonerID' : player.summoner_id,
                'puuID' : player.puu_id,
                'roles' : player.role
            };
            playerInfo.push(person);
        });
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



    function getPlayerInfo(){
        playerInfo.forEach((player) => {
            for(let i = 0; i < player.summonerID.length; i++){
                let summonerID = player.summonerID[i]
                $.get(
                    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/${summonerID}?api_key=${RIOT_KEY}`
                ).done(function(data){
                    player.profileIconID = data.profileIconId;
                    player.summonerLevel = data.summonerLevel;
                    player.summonerName = data.name;
                    displayPlayerInfo(player);
                });
            }
        });
    }


    /*
    ========================================
    Variables and Arrays
    ========================================
     */
    const playerNameTiles = document.querySelector("#trackedFriendsSidebar");
    let playerInfo = [];
})();