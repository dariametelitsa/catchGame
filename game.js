export class Game {
  #settings = {
    gridSize: {
      columns: 4,
      rows: 4,
    },
    MacGuffinJumpInterval: 2000,
  };
  #status = "pending";
  #player1;
  #player2;
  #MacGuffin;
  #MacGuffinJumpIntervalId;
  #score = {
    1: {points: 0},
    2: {points: 0},
  }

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

  #moveMacGuffinToRandomPosition(isStartPosition){
    const MacGuffinPosition = isStartPosition ? 
    this.#getRandomPostion([this.player1.position, this.player2.position])
    : this.#getRandomPostion([this.player1.position, this.player2.position, this.#MacGuffin.position]);
    this.#MacGuffin = new MacGuffin(MacGuffinPosition);
  }

  #createUnits(){
    const player1Position = this.#getRandomPostion();
    this.#player1 = new Player(1, player1Position);

    const player2Position = this.#getRandomPostion([player1Position]);
    this.#player2 = new Player(2, player2Position);

    this.#moveMacGuffinToRandomPosition(true);
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

  get MacGuffin(){
    return this.#MacGuffin;
  }

  start() {
    if (this.#status === "pending") {
      this.#status = "inProcess";
    }
    this.#createUnits();
    this.#MacGuffinJumpIntervalId = setInterval(() => {
      this.#moveMacGuffinToRandomPosition(false);
    }, this.#settings.MacGuffinJumpInterval);
  }

  stop(){
    this.#status = 'finished';
    clearInterval(this.#MacGuffinJumpIntervalId);
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

  #isOtherPlayer(movingPlayer, otherPlayer, step){
    const prevPlayerPosition = movingPlayer.position.copy();
    if(step.x) {
      prevPlayerPosition += step.x;
    }
    if(step.y) {
      prevPlayerPosition += step.y;
    }
    return Position.equals(prevPlayerPosition, otherPlayer.position);
  };

  #checkMacGuffinCatching(movingPlayer) {
    if(Position.equals(movingPlayer.position, this.#MacGuffin.position)) {
      this.#score[movingPlayer.id].points++;
    }
    this.#moveMacGuffinToRandomPosition(false);
  }

  #movePlayer(movingPlayer, otherPlayer, step) {
    const isBorder = this.#isBorder(movingPlayer, step);
    const isOtherPlayer = this.#isOtherPlayer(movingPlayer, otherPlayer, step)
    if(isBorder || isOtherPlayer) {
      return;
    }
    if(step.x) {
      movingPlayer.position.x += step.x;
    }
    if(step.y) {
      movingPlayer.position.y += step.y;
    }
    this.#checkMacGuffinCatching(movingPlayer);
  }

  movePlayer1Right() {
    const step = {x: 1};
    this.#movePlayer(this.#player1, this.#player2, step);
  };
  movePlayer1Left() {
    const step = {x: -1};
    this.#movePlayer(this.#player1, this.#player2, step);
  };
  movePlayer1Up() {
    const step = {y: -1};
    this.#movePlayer(this.#player1, this.#player2, step);
  };
  movePlayer1Down() {
    const step = {y: 1};
    this.#movePlayer(this.#player1, this.#player2, step);
  };

  movePlayer2Right() {
    const step = {x: 1};
    this.#movePlayer(this.#player2, this.#player1, step);
  };
  movePlayer2Left() {
    const step = {x: -1};
    this.#movePlayer(this.#player2, this.#player1, step);
  };
  movePlayer2Up() {
    const step = {y: -1};
    this.#movePlayer(this.#player2, this.#player1, step);
  };
  movePlayer2Down() {
    const step = {y: 1};
    this.#movePlayer(this.#player2, this.#player1, step);
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

export class MacGuffin extends Units {
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
