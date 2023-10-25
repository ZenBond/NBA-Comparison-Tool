
    //---global variables----//
    const input1 = document.querySelector('#input1')
    const input2 = document.querySelector('#input2')
    const btn1 = document.querySelector('#btn1')
    const btn2 = document.querySelector('#btn2')
    const clear = document.querySelector('#clear')
    const scoringLeaders = document.querySelector('#top-scores')
    const playersData = {
        player1: {},
        player2: {}
    }

   
    
    //----event to submit players----//
   
    compare.addEventListener('click', () => {
        getPlayerData1()
        getPlayerData2()
        comparePlayers()
    })
    scoringLeaders.addEventListener('click', getScoringLeaders)


    
//---keydown event input 1---//
    input1.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            getPlayerData1()
            input1.value = ''
        }
    })

//---keydown event input 2----/
    input2.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            getPlayerData2()
            input2.value = ''
        }
    })
    
    
    
    //--generate data for player 1----//
    function getPlayerData1() {
        

        $.get(`https://nba-stats-db.herokuapp.com/api/playerdata/name/${input1.value}`, (data) => {    
            
        if (data.results && data.results.length > 0) {

            const {player_name, team, AST, PTS, TRB, three_percent, ft_percent, games} = data.results[0]
            
            playersData.player1 = {
                player_name,
                team,
                PTS,
                AST,
                TRB,
                three_percent,
                ft_percent,
                games,
            };

            clear.addEventListener('click', () => {
                input1.value = ''
                playerName.innerHTML = ''
            })
            
            console.log(data.results)
            const playerName = document.querySelector('#player-name')
            
            playerName.innerHTML = playerName.innerHTML = createPlayerTable(player_name, team, PTS, AST, TRB, three_percent, ft_percent, games, 'pts1');
            
            console.log(player2)
        
        } else {
            alert(`Player was not found. Enter a valid player`)
            input1.value = ''
        }
        })
        console.log(playersData)
      
    }

//----generate data for player 2-----//
    function getPlayerData2() {
       
        
        $.get(`https://nba-stats-db.herokuapp.com/api/playerdata/name/${input2.value}`, (data) => {    
            if (data.results && data.results.length > 0) {
                const {player_name, team, AST, PTS, TRB, three_percent, ft_percent, games} = data.results[0]
                
                playersData.player2 = {
                    player_name,
                    team,
                    PTS,
                    AST,
                    TRB,
                    three_percent,
                    ft_percent,
                    games,
                };

                clear.addEventListener('click', () => {
                    input2.value = ''
                    playerName2.innerHTML = ''
                })

                
                const playerName2 = document.querySelector('#player-name2')
                
                playerName2.innerHTML = createPlayerTable(player_name, team, PTS, AST, TRB, three_percent, ft_percent, games, 'pts2');

                
            } else {
                alert(`Player was not found. Enter a valid player`)
                input1.value = ''
            }
        })

        console.log(playersData)
    }



    function getScoringLeaders() {
        $.get(`https://nba-stats-db.herokuapp.com/api/playerdata/topscorers/total/season/2023/`, (data) => {
            for (let i = 0; i < 10 && i < data.results.length; i++) {
                const {PTS, player_name} = data.results[i]
                console.log(player_name)
            }
        })
    }


                   
    function createPlayerTable(player_name, team, PTS, AST, TRB, three_percent, ft_percent, games, ptsClass) {
        return `
            <table>
                <tr>
                    <th>Player Name</th>
                    <td>${player_name}</td>
                </tr>
                <tr>
                    <th>Team</th>
                    <td>${team}</td>
                </tr>
                <tr>
                    <th>PPG</th>
                    <td class="${ptsClass}">${(PTS / games).toFixed(1)}</td>
                </tr>
                <tr>
                    <th>APG</th>
                    <td>${(AST / games).toFixed(1)}</td>
                </tr>
                <tr>
                    <th>RPG</th>
                    <td>${(TRB / games).toFixed(1)}</td>
                </tr>
                <tr>
                    <th>3P%</th>
                    <td>${Number(three_percent).toFixed(2)}%</td>
                </tr>
                <tr>
                    <th>FT%</th>
                    <td>${Number(ft_percent).toFixed(2)}%</td>
                </tr>
            </table>
        `;
    }

   
    function comparePlayers() {
        const player1 = playersData.player1;
        const player2 = playersData.player2;
        const pts1 = document.querySelector('.pts1')
        const pts2 = document.querySelector('.pts2')
    
        if (Object.keys(player1).length === 0 || Object.keys(player2).length === 0) {
            alert("Please enter data for both players before comparing.");
            return;
        }
    
        // Compare player statistics
        if (player1.PTS > player2.PTS) {
            alert(`${player1.player_name} has more points per game (PPG) than ${player2.player_name}.`);
            document.querySelector('.pts1').style.color = 'green'
            document.querySelector('.pts2').style.color = 'red';
        } else if (player1.PTS < player2.PTS) {
            alert(`${player2.player_name} has more points per game (PPG) than ${player1.player_name}.`);
            document.querySelector('.pts1').style.color = 'red'
            document.querySelector('.pts2').style.color = 'green';
        } else {
            alert(`${player1.player_name} and ${player2.player_name} have the same points per game (PPG).`);
            document.querySelector('.pts1').style.color = 'grey'
            document.querySelector('.pts2').style.color = 'grey';
        }
    
        // You can add similar comparisons for other statistics like AST, TRB, three_percent, and ft_percent.
    }