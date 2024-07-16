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
      newX = NumberUtil.getRandomNumber(this.settings.gridSize.rows);
      newY = NumberUtil.getRandomNumber(this.settings.gridSize.columns);
    } while (
      takenPosition.some(
        (position) => position.x === newX && position.y === newY
      )
    );

    return new Position(newX, newY);
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

  start() {
    if (this.#status === "pending") {
      this.#status = "inProcess";
    }
    const player1Position = this.#getRandomPostion();
    this.#player1 = new Player(1, player1Position);
    this.#player2 = new Player(2, this.#getRandomPostion([player1Position.x, player1Position.y]));
  }

  pause() {}

  resume() {}
}

export class Player {
  constructor(id, position) {
    this.id = id;
    this.position = position;
  }
}

export class Google {
  constructor(position) {
    this.position = position;
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
