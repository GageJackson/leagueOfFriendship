(function () {
    "use strict";


    //https://gomakethings.com/waiting-for-multiple-all-api-responses-to-complete-with-the-vanilla-js-promise.all-method/
    function getDbData() {
        Promise.all([
            fetch(dbUrl),
            fetch(champJSON)
        ]).then(responses => {
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        }).then(data => { //The data is an array of data in order of the fetches.
            setPlayerInfoArray(data[0]);
            setChampInfoArray(data[1]);
        }).then(() => {
            displayPlayers();

        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            createButtons(playerBtns, getDetailedPlayerInfo);
        });
    }

    function setPlayerInfoArray(playerData){
        playerInfo = [];
        for(let player of playerData){
            playerInfo.push(player);
        }
    }

    function setChampInfoArray(champData){
        champInfo = [];
        for(let champ of champData){
            champInfo.push(champ);
        }
    }

    function getEveryPlayersRiotInfo() {
        let delay = 0;
        for (let player of playerInfo) {
            setTimeout(() => {
                getRiotData(player.summonerID, player)
                // console.log("Player out: ");
                // console.log(player);
                // console.log(player.summonerID);
                // console.log("===============================");
            }, delay);
            delay += 500; // Increase the delay by 500 milliseconds for each player
        }
    }

    function getRiotData(summonerID, player) {
        // console.log("Player in: ");
        // console.log(player);
        // console.log(summonerID);
        // console.log("================");
        Promise.all([
            fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}?api_key=${RIOT_KEY}`),
            fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/${summonerID}?api_key=${RIOT_KEY}`),
            fetch(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerID}/top?count=10&api_key=${RIOT_KEY}`)
        ]).then(responses => {
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        }).then(data => { //The data is an array of data in order of the fetches.
            getPlayerRankInfo(player, data[0]);
            getPlayerIconInfo(player, data[1]);
            getPlayerSummonerInfo(player, data[2]);
            displayPlayerInfo(player);
            saveToDB(player, player.id);
        }).catch((err) => {
            console.log(err);
        });
    }

    function setPlayerNameInfo(player) {
        return {
            'id' : player.id,
            'name' : player.player_name,
            'accountID' : player.account_id,
            'summonerID' : player.summoner_id,
            'puuID' : player.puu_id,
            'roles' : player.role
        };
    }

    function getPlayerRankInfo(player, data){
        player.tier = data[0].tier;
        player.rank = data[0].rank;
        player.leaguePoints = data[0].leaguePoints;
        player.rankWins = data[0].wins;
        player.rankLosses = data[0].losses;
        player.hotStreak = data[0].hotStreak;
    }

    function getPlayerIconInfo(player, data){
        player.profileIconID = data.profileIconId;
        player.summonerLevel = data.summonerLevel;
        player.summonerName = data.name;
    }

    function getPlayerSummonerInfo(player, data){
        let championIDs = [];
        let championNames = [];
        let championLevels = [];
        let championPoints = [];

        for(let i = 0; i < data.length; i++){
            championIDs.push(data[i].championId);
            let championName = getChampionInfo(data[i].championId);
            championNames.push(championName);
            championLevels.push(data[i].championLevel);
            championPoints.push(data[i].championPoints);
        }

        player.topChampionIDs = championIDs;
        player.topChampionNames = championNames;
        player.topChampionLevels = championLevels;
        player.topChampionPoints = championPoints;
    }

    function saveToDB(player, playerID){
        fetch(dbUrl + playerID, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        }).then(() => {

        }).catch(() => {
                console.log("error");
            });
    }

    function getChampionInfo(championKey) {
        for (const champ of champInfo) {
            if (parseInt(champ.key) === parseInt(championKey)) {
                return champ.name;
            }
        }
        console.log("not found");
        return undefined;
    }

    function refreshIcons(){
        playerInfo.forEach((player) => {
            for(let i = 0; i < 1; i++){
                let summonerID = player.summonerID[i]
                getPlayerIconInfo(player, summonerID);
            }
        });
        mainSection.innerHTML = "";
        getPlayerInfo();
    }

    function refreshRanks(){
        playerInfo.forEach((player) => {
            for(let i = 0; i < 1; i++){
                let summonerID = player.summonerID[i]
                getPlayerRankInfo(player, summonerID);
            }
        });
        mainSection.innerHTML = "";
        getPlayerInfo();
    }

    function refreshChamps(){
        playerInfo.forEach((player) => {
            for(let i = 0; i < 1; i++){
                let summonerID = player.summonerID[i]
                getPlayerSummonerInfo(player, summonerID);
            }
        });
        mainSection.innerHTML = "";
        getPlayerInfo();
    }

    function createButtons(btnArray, btnFunction){
        for(let button of btnArray){
            let newButton = document.querySelector(button);
            newButton.addEventListener("click",btnFunction);
        }
    }
    function findBtnId(targetId){
        let index = targetId.indexOf("-")
        return targetId.slice(index + 1);
    }

    function getDetailedPlayerInfo(e){
        console.log(findBtnId(e.target.id));
        let clickedPlayer = findBtnId(e.target.id);
        clearFriendSection();
        displayDetailedPlayer(clickedPlayer);
    }

    function clearFriendSection(){
         mainSection.innerHTML = ""
    }

    function displayPlayers(){
        for (let player of playerInfo){
            displayPlayerInfo(player);
        }
    }

    function displayDetailedPlayer(playerID){
        for (let player of playerInfo){
            if(player.id === parseInt(playerID)){
                for(let i = 0; i < player.topChampionIDs.length; i++){
                    displayDetailedPlayerInfo(player, i);
                }
            }
        }
    }

    function displayPlayerInfo(player){
        let html = "";
        html += `<div class="friendTile" id ="playerID-${player.id}" 
                style="background-image: url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${player.topChampionNames[0]}_0.jpg')">`

        html += `<div class="friendTileTop">`
        html += `</div>`//end friendTileTop

        html += `<div class="friendTileBottom">`
        html += `<p>${player.tier} ${player.rank} ${player.leaguePoints}</p>`
        html += `<p>Wins: ${player.rankWins} Losses:  ${player.rankLosses}</p>`
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

        playerBtns.push(`#playerID-${player.id}`);
    }

    function displayDetailedPlayerInfo(player, num){
        let html = "";
        html += `<div class="championTile"
                style="background-image: url('https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${player.topChampionNames[num]}_0.jpg')">`

        //http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg

        html += `<div class="championTileTop">`
        html += `</div>`//end friendTileTop

        html += `<div class="championTileBottom">`
        html += `<p>${player.topChampionNames[num]}</p>`
        //html += `<p>Wins: ${player.rankWins} Losses:  ${player.rankLosses}</p>`
        html += `<p>${player.topChampionPoints[num]}</p>`
        html += `</div>`//end friendTileBottom

        //Friend mid section, name and icon
        html += `<div class="championTileMid">`
        html += `<div class="championIcon">`
        html += `<p>${player.topChampionLevels[num]}</p>`
        html += `<div></div>`
        html += `</div>`//end friendIcon
        html += `</div>`//end friendTileMid

        html += `</div>`//end player Tile
        mainSection.innerHTML += html;

        // playerBtns.push(`#playerID-${player.id}`);
    }

    /*
    ========================================
    Variables and Arrays
    ========================================
     */
    const dbUrl = "https://chain-torch-terrier.glitch.me/players/"
    const champJSON = "/assets/data/championKeys.json";
    const mainSection = document.querySelector("#friendSection");

    const refreshIconsButton = document.querySelector("#refreshIconsBtn");
    const refreshChampsButton = document.querySelector("#refreshChampsBtn");
    const refreshRanksButton = document.querySelector("#refreshRanksBtn");

    refreshIconsButton.addEventListener("click", refreshIcons);
    refreshChampsButton.addEventListener("click", refreshChamps);
    refreshRanksButton.addEventListener("click", refreshRanks);

    let playerInfo = [];
    let champInfo = [];
    let playerBtns = [];

    getDbData();
})();