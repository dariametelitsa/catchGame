import { EvenEmmiter } from "./assets/eventEmitter.js";
import { Game } from "./game.js";

const eventEmmiter = new EvenEmmiter();
const game = new Game(eventEmmiter);
game.settings.gridSize = {
  rows: 4,
  columns: 5,
}
const tableElement = document.getElementById("field");

game.start();

const render = () => {
  tableElement.innerHTML = '';
  for (let y = 1; y <= game.settings.gridSize.rows; y++) {
    const trElement = document.createElement('tr');
    tableElement.append(trElement);
  
    for (let x= 1; x <= game.settings.gridSize.columns; x++) {
      const tdElement = document.createElement('td');
      trElement.append(tdElement);
  
      if(game.macGuffin.position.x === x && game.macGuffin.position.y === y ) {
        const imgElement = document.createElement('img');
        imgElement.src = "./assets/google.png";
        imgElement.alt = 'macGuffin';
        tdElement.append(imgElement);
      }
  
      if(game.player1.position.x === x && game.player1.position.y === y ) {
        const imgElement = document.createElement('img');
        imgElement.src = "./assets/first.png";
        imgElement.alt = 'Player 1';
        tdElement.append(imgElement);
      }
  
      if(game.player2.position.x === x && game.player2.position.y === y ) {
        const imgElement = document.createElement('img');
        imgElement.src = "./assets/second.png";
        imgElement.alt = 'Player 2';
        tdElement.append(imgElement);
      }
    }
  }
}

render();
game.eventEmmiter.subscribe('changePosition', render);