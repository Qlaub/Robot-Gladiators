//generate random integer
let randomNumber = function(min, max) {
  let value = Math.floor(Math.random() * (max - min + 1)) + min;
  return value;
}

let getPlayerName = function() {
  let name = "";

  while (!name) {
    name = window.prompt("What is your robot's name?")
  }

  console.log(`Your robot's name is ${name}`);
  return name;
}

let playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.attack = 10;
    this.money = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      playerInfo.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7 ) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      playerInfo.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
}

let enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14),
  }
]

let fightOrSkip = function() {
  let promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.")

  if (!promptFight) {
    window.alert("You need to enter a valid answer! Please try again.")
    return fightOrSkip();
  }

  //if player picks "skip" confirm and stop loop
  if (promptFight.toLowerCase() === "skip") {
    //confirm skip
    let confirmSkip = window.confirm("Are you sure you'd like to skip this opponent?");

    //if yes, leave fight
    if (confirmSkip) {
      window.alert(`${playerInfo.name} has decided to skip this fight. Goodbye!`);

      //subtract money for skipping
      playerInfo.money -= 10;

      //enter shop
      shop();
    }
  }
}

let fight = function(enemy) {

  //fight for as long as enemy robot is alive
  while(enemy.health > 0 && playerInfo.health > 0) {
    
    //user fights or skips
    fightOrSkip();

    //generate player attack value
    var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
    console.log("player damage", damage);

    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died!");
      //award money for victory
      playerInfo.money += 20;
      //fight over
      break;
    } else {
      window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }

    //generate computer attack value
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    console.log("enemy attack", damage);

    // remove player's health by subtracting the amount set in enemy.attack
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      break;
    } else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }
  } 
}

let startGame = function() {
  //reset stats
  playerInfo.reset();

  for (let i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      //alert player to round
      window.alert(`Welcome to Robot Gladiators! Round ${i + 1}!`)

      //pick enemy
      let pickedEnemyObj = enemyInfo[i];

      //set enemy health
      pickedEnemyObj.health = randomNumber(40, 60);

      //start fight function
      fight(pickedEnemyObj);

      //enter shop if more enemies and player isn't dead
      if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
        //ask to shop
        let storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        //shop if player wants
        if (storeConfirm){
          shop();
        }
      }
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
  if (playerInfo.health > 0) {
    window.alert(`Great job, you've survived the game! You now have a score of ${playerInfo.money}.`);
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

let shop = function() {

  //prompt for shop choice
  let shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

  //action based on user choice, comparing to forced lowercase to avoid user error
  switch(shopOptionPrompt.toLowerCase()) {
    case "refill":
      playerInfo.refillHealth();
      break;

    case "upgrade":
      playerInfo.upgradeAttack()
      break;

    case "leave":
      window.alert("Leaving the store.");

      //leaving store
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");

      //restart shop
      shop();
      break;
  }
};

startGame();
