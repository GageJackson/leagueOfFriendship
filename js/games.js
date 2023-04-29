(function () {
    "use strict";
    async function getDbData() {
        const dbData = await fetch(playerDbUrl);
        const dbResponse = await dbData.json();
        console.log(dbResponse);

        const dbGameData = await fetch(gameDbUrl);
        const dbGameResponse = await dbGameData.json();
        console.log(dbGameResponse);

        // const playerArray = await setPlayerInfoArray(dbResponse);
        // console.log(playerArray);
        // const matches = await getMatches();
        // console.log(matches);
        // console.log(games);
        // games.sort();
        // saveToDB(games);
    }

    async function getStuff(puuid){
        const howManyToShow = 100;
        const rateLimit = 10;
        const responses = [];

        for (let i = 0; i < rateLimit; i++) {
            console.log(i);
            const start = (i * howManyToShow);
            const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=normal&start=${start}&count=${howManyToShow}&api_key=${RIOT_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            responses.push(data);
        }

        return responses.flat();
    }

    async function getMatches() {
        for (let player of playerInfo) {
            console.log(player.puuID);
            const data = await getStuff(player.puuID);
            pushToArray(data);
        }
        console.log(games);
        return "matches are set"
    }

    async function setPlayerInfoArray(playerData){
        playerInfo = [];
        for(let player of playerData){
            playerInfo.push(player);
        }
        return "player array set";
    }

    function pushToArray(data){
        for (let match of data){
            if(!games.includes(match)){
                games.push(match);
            }
        }
    }

    function saveToDB(data){
        fetch(gameDbUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {

        }).catch(() => {
            console.log("error");
        });
    }


    const playerDbUrl = "https://chain-torch-terrier.glitch.me/players/"
    const gameDbUrl = "https://chain-torch-terrier.glitch.me/games/"
    const mainSection = document.querySelector("#gamesSection");

    let playerInfo = [];
    let games = [];
    getDbData();
})();