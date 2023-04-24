(function () {
    "use strict";

    fetch("/assets/data/players.json")
        .then(function (res){
            return res.json();
        })
        .then(function (data){
            setPlayerInfo(data);
            getPlayerInfo();
        })
        .then(function (){
            // getPlayerRankInfo();
        })

        .catch(function (error){
            console.log(error);
        });

    fetch("/assets/data/championKeys.json")
        .then(function (res){
            return res.json();
        })
        .then(function (data){
            setChampionInfo(data);
        })
        .catch(function (error){
            console.log(error);
        });

    function setPlayerInfo(playerData) {
        console.log(playerData);
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

    function setChampionInfo(championKeys) {
        console.log(championKeys);
        championKeys.forEach((champion) => {
            let champ = {
                'name' : champion.name,
                'id' : champion.id,
                'key' : champion.key
            };
            championInfo.push(champ);
        });
    }

    function displayPlayerInfo(player){
        let html = "";
        html += `<div class="friendTile">`

        html += `<div class="friendTileTop"  style="background-image: url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${player.topChampionNames[0]}_0.jpg')">`
        html += `</div>`//end friendTileTop

        html += `<div class="friendTileBottom">`
        html += `<p>${player.tier} ${player.rank} ${player.leaguePoints}</p>`
        html += `<p>Wins: ${player.rankWins} Losses:  ${player.rankLosses} Hotstreak? ${player.hotStreak}</p>`
        html += `</div>`//end friendTileBottom

        //Friend mid section, name and icon
        html += `<div class="friendTileMid">`
        html += `<div class="friendIcon">`
        html += `<img src="http://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/${player.profileIconID}.png" alt="${player.name}'s profile icon">`
        html += `</div>`//end friendIcon
        html += `<div class="friendNames">`
        html += `<p class="fSummonerName">${player.summonerName}</p>`
        html += `<p class="fPlayerName">${player.name}</p>`
        html += `</div>`//end friendNames
        html += `</div>`//end friendTileMid

        html += `</div>`//end player Tile
        mainSection.innerHTML += html;
    }

    function getPlayerInfo(){
        playerInfo.forEach((player) => {
            for(let i = 0; i < 1; i++){
                let summonerID = player.summonerID[i]
                //getPlayerIconInfo(player, summonerID);
                //getPlayerRankInfo(player, summonerID);
                getPlayerSummonerInfo(player, summonerID);
            }
        });
    }

    function getChampionInfo(championKey){
        console.log("Champ key: " + championKey)
        championInfo.forEach((champion) => {
            if (parseInt(champion.key) === parseInt(championKey)){
                return champion.name;
            }
        });
        return console.log("not found");
    }

    function getPlayerRankInfo(player, summonerID){
        fetch(
            `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}?api_key=${RIOT_KEY}`
        ).then(function(result){
            return result.json();
        }).then(function(data){
            player.tier = data[0].tier;
            player.rank = data[0].rank;
            player.leaguePoints = data[0].leaguePoints;
            player.rankWins = data[0].wins;
            player.rankLosses = data[0].losses;
            player.hotStreak = data[0].hotStreak;
            // displayPlayerInfo(player);
        }).catch(function(error){
            console.log(error);
        });
    }

    function getPlayerIconInfo(player, summonerID){
        fetch(
            `https://na1.api.riotgames.com/lol/summoner/v4/summoners/${summonerID}?api_key=${RIOT_KEY}`
        ).then(function(result){
            return result.json();
        }).then(function(data){
            player.profileIconID = data.profileIconId;
            player.summonerLevel = data.summonerLevel;
            player.summonerName = data.name;
            //displayPlayerInfo(player);
        }).catch(function(error){
            console.log(error);
        });
    }

    function getPlayerSummonerInfo(player, summonerID){
        let numToRetrieve = 10;
        fetch(
            `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerID}/top?count=${10}&api_key=${RIOT_KEY}`
        ).then(function(result){
            return result.json();
        }).then(function(data){
            let championIDs = [];
            let championNames = [];
            let championLevels = [];
            let championPoints = [];
            let championName = '';
            for(let i = 0; i < data.length; i++){
                championIDs.push(data[i].championId);
                console.log("championId" + data[i].championId)
                championName = getChampionInfo(data[i].championId);
                championNames.push(championName);
                championLevels.push(data[i].championLevel);
                championPoints.push(data[i].championPoints);
            }
            player.topChampionIDs = championIDs;
            player.topChampionNames = championNames;
            player.topChampionLevels = championLevels;
            player.topChampionPoints = championPoints;
            console.log(championNames);
            displayPlayerInfo(player);
        }).catch(function(error){
            console.log(error);
        });
    }


    /*
    ========================================
    Variables and Arrays
    ========================================
     */
    const mainSection = document.querySelector("#mainSection");
    let playerInfo = [];
    let championInfo = [];
})();