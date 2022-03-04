let playerName = window.prompt("What is your robot's name?");
let playerHealth = 100
let playerAttack = 10;
let playerMoney = 10;

let enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
let enemyHealth = 50;
let enemyAttack = 12;

let fight = function(enemyName) {

  //fight for as long as enemy robot is alive
  while(enemyHealth > 0 && playerHealth > 0) {
    //Ask player if they want to fight
    let promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // if player choses to fight, then fight
    if (promptFight.toLowerCase() === "skip") {
      //confirm skip
      let confirmSkip = window.confirm("Are you sure you'd like to quit this fight?");

      // if true leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerMoney = playerMoney - 10;
      console.log("playerMoney", playerMoney)
      break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth -= playerAttack;
    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");
      //award money for victory
      playerMoney += 20;
      //fight over
      break;
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // remove player's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
      enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      break;
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  } 
}

let startGame = function() {
  //reset stats
  playerHealth = 100
  playerAttack = 10;
  playerMoney = 10;

  for (let i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      //alert player to round
      window.alert(`Welcome to Robot Gladiators! Round ${i + 1}!`)

      //pick enemy
      let pickedEnemyNames = enemyNames[i];

      //set enemy health
      enemyHealth = 50;

      //start fight function
      fight(pickedEnemyNames);
    }

    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  //after player dies or wins, start end game
  endGame();
}

let endGame = function() {
  // if player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert(`Great job, you've survived the game! You now have a score of ${playerMoney}.`);
  } 
  else {
    window.alert("You've lost your robot in battle.");
  }

  //restart game?
  let playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //restart
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
}

startGame();

/*
let userRobot = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
}

let enemyRobot = {
  name: "Roberto",
  health: 50,
  attack: 12,
}
*/
