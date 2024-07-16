export class Game {
#settings;
#status = 'pending';
#player1;
#player2;
#google;

  set settings(settings) {
    this.#settings = settings;
  }
  get settings(){
    return this.#settings;
  }

  start(){
  }

  pause(){
  }

  resume(){
  }

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