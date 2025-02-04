document.addEventListener('DOMContentLoaded', () => {
    const playerNameInput = document.getElementById('playerName');
    const playerScoreInput = document.getElementById('playerScore');
    const playerLevelInput = document.getElementById('playerLevel');
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const playerCountDisplay = document.getElementById('playerCount');
    const sortCriteria = document.getElementById('sortCriteria');
    const playerTableBody = document.querySelector('#playerTable tbody');
    const clearLeaderboardBtn = document.getElementById('clearLeaderboardBtn');

    const maxPlayers = 10;

    let players = JSON.parse(localStorage.getItem('players')) || [];

    const updatePlayerCount = () => {
        playerCountDisplay.textContent = `Players Added: ${players.length}/${maxPlayers}`;
    };

    const renderTable = () => {
        playerTableBody.innerHTML = '';

        const sortingCriteria = sortCriteria.value;
        const sortedPlayers = [...players].sort((a, b) => {
            if (sortingCriteria === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortingCriteria === 'level') {
                if (b.level === a.level) {
                    return b.score - a.score;
                }
                return b.level - a.level;
            } else if (sortingCriteria === 'score') {
                return b.score - a.score;
            }
        });

        sortedPlayers.forEach(player => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${player.name}</td>
                <td>${player.score}</td>
                <td>${player.level}</td>
            `;
            playerTableBody.appendChild(row);
        });
    };


    const saveToLocalStorage = () => {
        localStorage.setItem('players', JSON.stringify(players));
    };

    addPlayerBtn.addEventListener('click', () => {
        const name = playerNameInput.value.trim();
        const score = parseInt(playerScoreInput.value, 10);
        const level = parseInt(playerLevelInput.value, 10);

        if (name === '' || name.length > 10) {
            alert('Name must be 1-10 characters long.');
            return;
        }
        if (isNaN(score) || score < 0 || score > 100) {
            alert('Score must be a number between 0 and 100.');
            return;
        }
        if (isNaN(level) || level < 0 || level > 100) {
            alert('Level must be a number between 0 and 100.');
            return;
        }
        if (players.length >= maxPlayers) {
            alert('Maximum number of players reached.');
            return;
        }


        players.push({ name, score, level });


        saveToLocalStorage();


        playerNameInput.value = '';
        playerScoreInput.value = '';
        playerLevelInput.value = '';


        updatePlayerCount();
        renderTable();
    });

    sortCriteria.addEventListener('change', renderTable);


    clearLeaderboardBtn.addEventListener('click', () => {
        players = [];

        localStorage.removeItem('players');
        updatePlayerCount();
        renderTable();
    });

    const resetData = () => {
        players = [];

        localStorage.removeItem('players');
        updatePlayerCount();
        renderTable();
    };


    updatePlayerCount();
    renderTable();
});
