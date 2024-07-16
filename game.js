export class Game {
  #settings = {
    gridSize: {
      columns: 4,
      rows: 4,
    }
  };
  #status = "pending";
  #player1;
  #player2;
  #google;

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

  #createUnits(){
    const player1Position = this.#getRandomPostion();
    this.#player1 = new Player(1, player1Position);

    const player2Position = this.#getRandomPostion([player1Position]);
    this.#player2 = new Player(2, player2Position);

    const googlePosition = this.#getRandomPostion([player1Position, player2Position]);
    this.#google = new Google(googlePosition);
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
  }

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
}

class NumberUtil {
  static getRandomNumber(max) {
    return Math.floor(Math.random() * max + 1);
  }
}
