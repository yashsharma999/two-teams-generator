const playerName = document.querySelector("#player-name");
const button = document.querySelector("#submit-btn");
const playersListElement = document.querySelector("#players-list");
const createTeamsBtn = document.querySelector("#create-btn");
const teamAList = document.querySelector("#teamA");
const teamBList = document.querySelector("#teamB");

const playerList = [];

function handleClick(e) {
  e.preventDefault();
  playerList.push(playerName.value);
  createList(playerName.value);
  playerName.value = "";
}

function createList(player) {
  const listItem = document.createElement("li");
  listItem.innerHTML = player;
  playersListElement.appendChild(listItem);
}

button.onclick = handleClick;
createTeamsBtn.onclick = (e) => createTwoTeams(e, playerList);

function createTwoTeams(e, playerList) {
  e.preventDefault();
  teamAList.innerHTML = "";
  teamBList.innerHTML = "";
  let count = 0;
  const teamA = [];
  const teamB = [];

  const randomIndex = (length) => {
    return Math.round(Math.random() * length);
  };

  let currentTeam = "teamA";

  const selectedPlayerIndices = [];

  function makeTwoTeams(totalArr) {
    const teamLength = totalArr.length;

    while (count < teamLength) {
      function selectPlayer() {
        let randomI = randomIndex(teamLength - 1);
        if (!selectedPlayerIndices.includes(randomI)) {
          const currentPlayer = playerList[randomI];
          selectedPlayerIndices.push(randomI);
          if (currentTeam === "teamA") {
            teamA.push(currentPlayer);
            currentTeam = "teamB";
            count++;
          } else {
            teamB.push(currentPlayer);
            currentTeam = "teamA";
            count++;
          }
        } else {
          selectPlayer();
        }
      }
      selectPlayer();
    }

    teamA.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = item;
      teamAList.appendChild(listItem);
    });

    teamB.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = item;
      teamBList.appendChild(listItem);
    });
  }

  makeTwoTeams(playerList);
}
