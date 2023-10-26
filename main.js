
    //---global variables----//
    const input1 = document.querySelector('#input1')
    const body = document.querySelector('body')
    const input2 = document.querySelector('#input2')
    const btn1 = document.querySelector('#btn1')
    const btn2 = document.querySelector('#btn2')
    const clear = document.querySelector('#clear')
    const compare = document.querySelector('#compare')
    const boombox = document.querySelector(".boombox");
    const music = document.querySelector("#music");
    const imageGrid = document.querySelector('#image-grid')
    const scoringLeaders = document.querySelector('#top-scores')
   
    let clickCount = 0;
    const playersData = {
        player1: {},
        player2: {}
    }

   
    
    //----event listners on buttons ----//
   
    compare.addEventListener('click', () => {
        getPlayerData1()
        getPlayerData2()
        comparePlayers()
    })

    scoringLeaders.addEventListener('click', getScoringLeaders)

    clear.addEventListener('click', () => {
        const existingTable = document.querySelector('table');
        if (existingTable) {
            existingTable.remove();
        }
    });
    
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
            
            playerName.innerHTML = createPlayerTable(player_name, team, PTS, AST, TRB, three_percent, ft_percent, games, 'pts1', 'ast1', 'rbd1', 'threep1', 'free1');
            
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
                
                playerName2.innerHTML = createPlayerTable(player_name, team, PTS, AST, TRB, three_percent, ft_percent, games, 'pts2', 'ast2', 'rbd2', 'threep2', 'free2');

                
            } else {
                alert(`Player was not found. Enter a valid player`)
                input1.value = ''
            }
        })

        console.log(playersData)
    }

//-----Creating table for scoring leaders---//
    function getScoringLeaders() { 
        $.get(`https://nba-stats-db.herokuapp.com/api/playerdata/topscorers/total/season/2023/`, (data) => {
            const table = document.createElement('table');
            table.classList.add('scoring-leaders')
            const tableHeader = table.createTHead();
            const headerRow = tableHeader.insertRow(0);
    
            const headers = ['Rank', 'Player Name', 'PTS'];
            headers.forEach((headerText) => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
    
            const tableBody = table.createTBody();
    
            for (let i = 0; i < 10 && i < data.results.length; i++) {
                const { PTS, player_name } = data.results[i];
    
                const row = tableBody.insertRow(i);
                row.insertCell(0).textContent = i + 1; 
                row.insertCell(1).textContent = player_name; 
                row.insertCell(2).textContent = PTS; 


                row.addEventListener('click', () => {
                    clickCount++
                       if (clickCount === 1) {
                        input1.value = player_name
                        getPlayerData1()
                       } else if (clickCount === 2){
                        input2.value = player_name
                        getPlayerData2()
                        clickCount = 0
                
                       }
                })
                
                
                

            }
    
            document.body.appendChild(table);
        });
    }
    


    //---create table to store player data---//
    function createPlayerTable(player_name, team, PTS, AST, TRB, three_percent, ft_percent, games, ptsClass, astClass, rbdClass, threeClass, freeClass) {
        return `
            <table class="basketball-card">
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
                    <td class="${astClass}">${(AST / games).toFixed(1)}</td>
                </tr>
                <tr>
                    <th>RPG</th>
                    <td class="${rbdClass}">${(TRB / games).toFixed(1)}</td>
                </tr>
                <tr>
                    <th>3P%</th>
                    <td class="${threeClass}">${Number(three_percent).toFixed(2)}%</td>
                </tr>
                <tr>
                    <th>FT%</th>
                    <td class="${freeClass}">${Number(ft_percent).toFixed(2)}%</td>
                </tr>
            </table>
        `;
    }

   //-----compare player stats----//
    function comparePlayers() {
        const player1 = playersData.player1;
        const player2 = playersData.player2;
        
    
       
        if (player1.PTS > player2.PTS) {
            document.querySelector('.pts1').style.backgroundColor = 'green'
            document.querySelector('.pts2').style.backgroundColor = 'red';
        } else if (player1.PTS < player2.PTS) {
            document.querySelector('.pts1').style.backgroundColor = 'red'
            document.querySelector('.pts2').style.backgroundColor = 'green';
        } else {
            document.querySelector('.pts1').style.color = 'grey'
            document.querySelector('.pts2').style.color = 'grey';
        }
    
        if (player1.AST > player2.AST) {
            document.querySelector('.ast1').style.backgroundColor = 'green';
            document.querySelector('.ast2').style.backgroundColor = 'red';
        } else if (player1.AST < player2.AST) {
            document.querySelector('.ast1').style.backgroundColor = 'red';
            document.querySelector('.ast2').style.backgroundColor = 'green';
        } else {
            document.querySelector('.ast1').style.color = 'grey';
            document.querySelector('.ast2').style.color = 'grey';
        }

        if (player1.TRB > player2.TRB) {
            document.querySelector('.rbd1').style.backgroundColor = 'green';
            document.querySelector('.rbd2').style.backgroundColor = 'red';
        } else if (player1.TRB < player2.TRB) {
            document.querySelector('.rbd1').style.backgroundColor = 'red';
            document.querySelector('.rbd2').style.backgroundColor = 'green';
        } else {
            document.querySelector('.rbd1').style.color = 'grey';
            document.querySelector('.rbd2').style.color = 'grey';
        }

        if (player1.three_percent > player2.three_percent) {
            document.querySelector('.threep1').style.backgroundColor = 'green';
            document.querySelector('.threep2').style.backgroundColor = 'red';
        } else if (player1.three_percent < player2.three_percent) {
            document.querySelector('.threep1').style.backgroundColor = 'red';
            document.querySelector('.threep2').style.backgroundColor = 'green';
        } else {
            document.querySelector('.threep1').style.color = 'grey';
            document.querySelector('.threep2').style.color = 'grey';
        }

        if (player1.ft_percent > player2.ft_percent) {
            document.querySelector('.free1').style.backgroundColor = 'green';
            document.querySelector('.free2').style.backgroundColor = 'red';
        } else if (player1.ft_percent < player2.ft_percent) {
            document.querySelector('.free1').style.backgroundColor = 'red';
            document.querySelector('.free2').style.backgroundColor = 'green';
        } else {
            document.querySelector('.free1').style.color = 'grey';
            document.querySelector('.free2').style.color = 'grey';
        }

       
        
    }

 

    const images = [
        'images/nbalogo.gif',
        'images/vince.gif',
        'images/harden.gif',
        'images/luka.gif',
        'images/kobe.gif',
        'images/steph.gif',
        'images/dame.gif',
        'images/lebron.gif',
        'images/jordan.gif',
        'images/jokic.gif',
        'images/kawhi.gif',
        'images/kd.gif',
        'images/trae.gif',
        'images/vince2.gif',
        'images/lebron2.gif',
    ]

    //-----generating random background---//
    
    function setRandomBackground() {
        const randomImage = images[Math.floor(Math.random() * images.length)]
        return `url(${randomImage})`
    }
    
    function shuffleImages(array) {
        let currentIndex = array.length;
        let temp, randomIndex;
        
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            
            temp = array[currentIndex];
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temp
        }
        
        return array
    }

    shuffleImages(images)
    
    
    images.forEach((path) => {
        const cell = document.createElement('div')
        cell.classList.add('image-cell')
        cell.style.backgroundImage = `url(${path})`
        imageGrid.appendChild(cell)
        
    })
    
    //-----changing background every 8 seconds---//
    const imageCells = document.querySelectorAll('.image-cell')
    console.log(document.querySelectorAll('.image-cell'))
    
    function updateCells() {
        imageCells.forEach((cell) => {
            cell.style.backgroundImage = setRandomBackground()
        })
    }
    
    
    setInterval(() => {
        updateCells()
    }, 10000)
    

//----Creator Box------//
    function createInfoBox() {
        const infoBox = document.createElement('div');
        infoBox.id = 'infoBox';
        infoBox.innerHTML = `
            <h3>Curated by Zoi</h3>
            <p><a href="https://github.com/ZenBond/frontend-project">View this project in Github</a></p>
        `;
        document.body.appendChild(infoBox);
      }

      createInfoBox()



   
          
    //-----background music----//
    boombox.addEventListener("click", function () {
        if (music.paused) {
              music.play();
        } else {
              music.pause();
        }
    });
