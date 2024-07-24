export class Game {
  #settings = {
    gridSize: {
      columns: 4,
      rows: 4,
    },
    googleJumpInterval: 2000,
  };
  #status = "pending";
  #player1;
  #player2;
  #google;
  #googleJumpIntervalId;

  #getRandomPostion(takenPosition = []) {
    let newX;
    let newY;
    do {
      newX = NumberUtil.getRandomNumber(this.#settings.gridSize.columns);
      newY = NumberUtil.getRandomNumber(this.#settings.gridSize.rows);
    } while (
      takenPosition.some(
        (position) => position.x === newX && position.y === newY
      )
    );

    return new Position(newX, newY);
  }

  #moveGoogleToRandomPosition(isStartPosition){
    const googlePosition = isStartPosition ? 
    this.#getRandomPostion([this.player1.position, this.player2.position])
    : this.#getRandomPostion([this.player1.position, this.player2.position, this.#google.position]);
    this.#google = new Google(googlePosition);
  }

  #createUnits(){
    const player1Position = this.#getRandomPostion();
    this.#player1 = new Player(1, player1Position);

    const player2Position = this.#getRandomPostion([player1Position]);
    this.#player2 = new Player(2, player2Position);

    this.#moveGoogleToRandomPosition(true);
  }

  get status() {
    return this.#status;
  }

  set settings(settings) {
    this.#settings = settings;
  }

  get settings() {
    return this.#settings;
  }

  get player1(){
    return this.#player1;
  }

  get player2(){
    return this.#player2;
  }

  get google(){
    return this.#google;
  }

  start() {
    if (this.#status === "pending") {
      this.#status = "inProcess";
    }
    this.#createUnits();
    this.#googleJumpIntervalId = setInterval(() => {
      this.#moveGoogleToRandomPosition(false);
    }, this.#settings.googleJumpInterval);
  }

  stop(){
    this.#status = 'finished';
    clearInterval(this.#googleJumpIntervalId);
  }

  #isBorder(movingPlayer, step) {
    const prevPlayerPosition = movingPlayer.position.copy();
    if(step.x) {
      prevPlayerPosition += step.x;
      return prevPlayerPosition.x < 1 || prevPlayerPosition.x > this.#settings.gridSize.columns;
    }
    if(step.y) {
      prevPlayerPosition += step.y;
      return prevPlayerPosition.y < 1 || prevPlayerPosition.y > this.#settings.gridSize.rows;
    }
  };
  #isOtherPlayer(){};

  movePlayer1Right() {
    const step = {x: 1};
    if(this.#isBorder(this.#player1, step)) {
      return;
    }
    if(this.#isOtherPlayer()) {
      return;
    }

    //checkGoogleCatching
  };
  movePlayer1Left() {
    const step = {x: -1};
  };
  movePlayer1Up() {
    const step = {y: -1};
  };
  movePlayer1Down() {
    const step = {y: 1};
  };

  movePlayer2Right() {
    const step = {x: 1};
  };
  movePlayer2Left() {
    const step = {x: -1};
  };
  movePlayer2Up() {
    const step = {y: -1};
  };
  movePlayer2Down() {
    const step = {y: 1};
  };

  pause() {};

  resume() {};
}


export class Units {
  constructor(position) {
    this.position = position;
  }
}
export class Player extends Units {
  constructor(id, position) {
    super(position);
    this.id = id;
  }
}

export class Google extends Units {
  constructor(position) {
    super(position);
  }
}

export class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  returnCopy() {
    return new Position(this.x, this.y);
  }
  static equals(somePosition1, somePosition2) {
    return somePosition1.x === somePosition2 && somePosition1.y === somePosition2.y
  }
}

class NumberUtil {
  static getRandomNumber(max) {
    return Math.floor(Math.random() * max + 1);
  }
}
