
    //---global variables----//
    const input1 = document.querySelector('#input1')
    const input2 = document.querySelector('#input2')
    const btn1 = document.querySelector('#btn1')
    const btn2 = document.querySelector('#btn2')
    const clear = document.querySelector('#clear')
    let player1Pts;
    let player2Pts;


    //----event to submit players----//
    btn1.addEventListener('click', getPlayerData1)
    btn2.addEventListener('click', getPlayerData2)


    
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
            
            player1Pts = PTS

            clear.addEventListener('click', () => {
                input1.value = ''
                playerName.innerHTML = ''
            })
            
            console.log(data.results)
            const playerName = document.querySelector('#player-name')
            
            playerName.innerHTML = `
            ${player_name}
            <p>${team}</p>
            <p class='pts1'>PPG: ${(PTS / games).toFixed(1)}</p>
            <p>APG: ${(AST / games).toFixed(1)}</p>
            <p>RPG: ${(TRB / games).toFixed(1)}</p>
            <p>3P%: ${Number(three_percent).toFixed(2)}%</p>
            <p>FT%: ${Number(ft_percent).toFixed(2)}%</p>
            `
        } else {
            alert(`Player was not found. Enter a valid player`)
            input1.value = ''
        }
        })

      
    }

//----generate data for player 2-----//
    function getPlayerData2() {
        $.get(`https://nba-stats-db.herokuapp.com/api/playerdata/name/${input2.value}`, (data) => {    
            if (data.results && data.results.length > 0) {
                const {player_name, team, AST, PTS, TRB, three_percent, ft_percent, games} = data.results[0]
                
                player2Pts = PTS

                clear.addEventListener('click', () => {
                    input2.value = ''
                    playerName2.innerHTML = ''
                })

                
                const playerName2 = document.querySelector('#player-name2')
                
                playerName2.innerHTML = `
                ${player_name}
                <p>TEAM: ${team}</p>
                <p class='pts2'>PPG: ${(PTS / games).toFixed(1)}</p>
                <p>APG: ${(AST / games).toFixed(1)}</p>
                <p>RPG: ${(TRB / games).toFixed(1)}</p>
                <p>3P%: ${Number(three_percent).toFixed(2)}%</p>
                <p>FT%: ${Number(ft_percent).toFixed(2)}%</p>
                `

            } else {
                alert(`Player was not found. Enter a valid player`)
                input1.value = ''
            }
        })

        
    }


                   
  