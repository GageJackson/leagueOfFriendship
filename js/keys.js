
//the riot api key
const RIOT_KEY = "RGAPI-f5e8794b-39dd-42cd-9fd6-c493f3d05c6d";

/*
===================================================
Summoner Info
===================================================
 */
//summoner ids and info
//find players info, if json info is just temp
//https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/{SUMMONER NAME}}?api_key={RIOT_KEY}
/*
RESPONSE
{
    "id": "ffnzCXzM7xH-P7uc82d1YlMNvL8l08WCOIVpjzeeXqXqiOcilQq8OEVpcA",
    "accountId": "bJugrugFdtSI3xICmCPkaDNfdpZ9FMSodxvR7LJiLt7W14I27ARXXYjq",
    "puuid": "16cKrIE9nKSPkTOPzLEvZbjPDigPF3dG-pN4MO1gXDmdpOX6eUPVRLj5iH7Feq82BK8uK0zR7ymn9Q",
    "name": "gvzhnv",
    "profileIconId": 20,
    "revisionDate": 1682142962796,
    "summonerLevel": 47
}
 */

//Summoner top masteries
//FIND person's top played champs
//https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/{SUMMONER_ID}/top?count={HOW_MANY_RESULTS}&api_key={RIOT_KEY}
/*
RESPONSE
{
        "championId": 21,
        "championLevel": 7,
        "championPoints": 348960,
        "lastPlayTime": 1682144975000,
        "championPointsSinceLastLevel": 327360,
        "championPointsUntilNextLevel": 0,
        "chestGranted": true,
        "tokensEarned": 0,
        "summonerId": "m-_faKcheSfh6jJgn2RNi4aHB2XShSmWx95jaOm_GbXZDbE"
    }
 */

//Summoner total champ mastery
//FIND person's total champ mastery over all champs
//https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/{SUMMONER_ID}?api_key={RIOT_KEY}
/*
RESPONSE
418
 */

//Summoner info
//FIND person's league info?
//https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/{SUMMONER_ID}?api_key={RIOT_KEY}
/*
RESPONSE
Good ranked info
{
        "leagueId": "e7a0cf42-a601-4a9a-81dd-5dd23a974c2b",
        "queueType": "RANKED_SOLO_5x5",
        "tier": "BRONZE",
        "rank": "IV",
        "summonerId": "m-_faKcheSfh6jJgn2RNi4aHB2XShSmWx95jaOm_GbXZDbE",
        "summonerName": "Gagermeister",
        "leaguePoints": 10,
        "wins": 10,
        "losses": 9,
        "veteran": false,
        "inactive": false,
        "freshBlood": false,
        "hotStreak": false
    }
 */


/*
===================================================
Challenges Section Idea
===================================================
 */
/*
Get name info based on id
https://na1.api.riotgames.com/lol/challenges/v1/challenges/config?api_key={RIOT_KEY}
RESULT(example, one of several, localized names, reduced for this doc)
{
        "id": 210002,
        "localizedNames": {
            "en_US": {
                "description": "Get a Pentakill with different champions",
                "name": "Same Penta, Different Champ",
                "shortDescription": "Get a Pentakill with different champions"
            }
        },
        "state": "ENABLED",
        "leaderboard": true,
        "thresholds": {
            "BRONZE": 3,
            "DIAMOND": 20,
            "GRANDMASTER": 40,
            "SILVER": 5,
            "GOLD": 10,
            "MASTER": 30,
            "CHALLENGER": 50,
            "PLATINUM": 15,
            "IRON": 1
        }
    },
 */

/*
Get Players challenge info
https://na1.api.riotgames.com/lol/challenges/v1/player-data/{PLAYER_PUUID}?api_key={RIOT_KEY}
{
    "totalPoints": {
        "level": "GOLD",
        "current": 8580,
        "max": 28780,
        "percentile": 0.102
    },
    "categoryPoints": {
        "COLLECTION": {
            "level": "DIAMOND",
            "current": 2510,
            "max": 4200,
            "percentile": 0.019
        },####################################(MORE)
    },
    "challenges": [
        {
            "challengeId": 0,
            "percentile": 0.102,
            "level": "GOLD",
            "value": 8580,
            "achievedTime": 1656479799793
        },#################################(A LOT MORE)
    },
    "preferences": {
        "bannerAccent": "2",
        "title": "20310302",
        "challengeIds": [
            101306,
            2022004,
            401303
        ],
        "crestBorder": "1",
        "prestigeCrestBorderLevel": 400
    }
 */


/*
===================================================
Matches Section Idea
===================================================
 */

/*
Get latest matches from player
https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{PLAYER_PUUID}/ids?start=0&count={HOW_MANY_MATCHES_TO_SHOW}&api_key={RIOT_KEY}
RETURNS array of strings
[
    "NA1_4636345122",
    "NA1_4635450471"
]
 */

/*
Get info from match
https://americas.api.riotgames.com/lol/match/v5/matches/{MATCH_STRING}?api_key={RIOT_KEY}
 */


/*
Get timeline info from match... a lot of info
Separted by timestamps in ms, not sure if the timestamps have a pattern yet epoch ms??
https://americas.api.riotgames.com/lol/match/v5/matches/{MATCH_STRING}/timeline?api_key={RIOT_KEY}
 */


/*
===================================================
Currntly Playing Section Idea
===================================================
 */

/*
Shows info of anyone currently playing, kinda interesting but might not be worth pursuing
https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/{SUMMONER_ID}?api_key={RIOT_KEY}
 */

// function refreshIcons(){
//     playerInfo.forEach((player) => {
//         for(let i = 0; i < 1; i++){
//             let summonerID = player.summonerID[i]
//             getPlayerIconInfo(player, summonerID);
//         }
//     });
//     mainSection.innerHTML = "";
//     getPlayerInfo();
// }
//
// function refreshRanks(){
//     playerInfo.forEach((player) => {
//         for(let i = 0; i < 1; i++){
//             let summonerID = player.summonerID[i]
//             getPlayerRankInfo(player, summonerID);
//         }
//     });
//     mainSection.innerHTML = "";
//     getPlayerInfo();
// }
//
// function refreshChamps(){
//     playerInfo.forEach((player) => {
//         for(let i = 0; i < 1; i++){
//             let summonerID = player.summonerID[i]
//             getPlayerSummonerInfo(player, summonerID);
//         }
//     });
//     mainSection.innerHTML = "";
//     getPlayerInfo();
// }


// function getPlayerInfo2(){
//     playerInfo.forEach((player) => {
//         for(let i = 0; i < 1; i++){
//             let summonerID = player.summonerID[i]
//             displayPlayerInfo(player);
//         }
//     });
// }