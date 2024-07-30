import { Game, Position } from "./game";

describe('Game test', () => {

let game;
beforeEach(() => {
  game = new Game();
});

afterEach(() => {
  game.stop();
});

  it('should return test', () => {
    game = new Game();
    game.settings =
      {
        gridSize: {
          columns: 10,
          rows: 10,
        }
      }
  
    const settings = game.settings;
    expect(settings.gridSize.rows).toBe(10);
    expect(settings.gridSize.columns).toBe(10);
  });

  it('should change status', () => {
    game = new Game();

    expect(game.status).toBe('pending');
    game.start();
    expect(game.status).toBe('inProcess');
  });

  it('should units have unique position', () => {
    for(let i = 0; i < 10; i++) {
      game = new Game();
      game.settings =
      {
        gridSize: {
          columns: 4,
          rows: 3,
        }
      }

      game.start();

      expect([1,2,3,4]).toContain(game.player1.position.x);
      expect([1,2,3]).toContain(game.player1.position.y);

      expect([1,2,3,4]).toContain(game.player2.position.x);
      expect([1,2,3]).toContain(game.player2.position.y);

      expect(
        (game.player1.position.x !== game.player2.position.x ||
            game.player1.position.y !== game.player2.position.y) &&
        (game.player1.position.x !== game.macGuffin.position.x ||
            game.player1.position.y !== game.macGuffin.position.y) &&
        (game.player2.position.x !== game.macGuffin.position.x ||
            game.player2.position.y !== game.macGuffin.position.y)
    ).toBe(true);
    game.stop();
    }
  });

  it('should MacGuffin change position', async() => {
    for(let i = 0; i< 10; i++) {
      game = new Game();
      game.settings = {
        gridSize: {
          columns: 4,
          rows: 1,
        },
        MacGuffinJumpInterval: 100,
      }

      game.start();
      const prevPosition = game.macGuffin.position.clone();
      await sleep(150);

      expect(Position.equals(prevPosition, game.macGuffin.position)).toBe(false);
      game.stop();
    }
  })

  const sleep = (delay) => {
    return new Promise(resolve => setTimeout(resolve, delay));
 }

 it('should MacGuffin be caught by player1 or player2 for one row', async () => {    for (let i = 0; i < 10; i++) {
  game = new Game()
  game.settings = {
    gridSize: {
      columns: 3,
      rows: 1,
      },
      MacGuffinJumpInterval: 100,
    };
      game.start();
  // p1 p2 g | p1 g p2 | p2 p1 g | p2 g p1 | g p1 p2 | g p2 p1        
  const diffForPlayer1 = game.macGuffin.position.x - game.player1.position.x;
  const prevMacGuffinPosition = game.macGuffin.position.clone();
  if (Math.abs(diffForPlayer1) === 2) {
      const diffForPlayer2 = game.macGuffin.position.x - game.player2.position.x
      if (diffForPlayer2 > 0) {
          game.movePlayer2Right();
        } else {
          game.movePlayer2Left();
        }
      expect(game.score[1].points).toBe(0);
      expect(game.score[2].points).toBe(1);
    } else {
      if (diffForPlayer1 > 0) {
        game.movePlayer1Right();
      } else {
        game.movePlayer1Left();
      }
      expect(game.score[1].points).toBe(1);          
      expect(game.score[2].points).toBe(0);
  }
  expect(Position.equals(game.macGuffin.position, prevMacGuffinPosition)).toBe(false);     
  game.stop();
}});

it('should MacGuffin be caught by player1 or player2 for one column', async () => {    for (let i = 0; i < 10; i++) {
  game = new Game();
  game.settings = {            
    gridSize: {
          columns: 1,
          rows: 3,
      },
    }
  game.start()
  // p1   p1   p2   p2    g    g        
  // p2   g    p1    g   p1   p2
  //  g   p2    g   p1   p2   p1        
  const diffForPlayer1 = game.macGuffin.position.y - game.player1.position.y;
  const prevMacGuffinPosition = game.macGuffin.position.clone();
  if (Math.abs(diffForPlayer1) === 2) {
      const diffForPlayer2 = game.macGuffin.position.y - game.player2.position.y;
      if (diffForPlayer2 > 0) {
          game.movePlayer2Down();        
        } else {
          game.movePlayer2Up();        
        }
      expect(game.score[1].points).toBe(0);
      expect(game.score[2].points).toBe(1);   
    } else {
      if (diffForPlayer1 > 0) {                
        game.movePlayer1Down();
      } else {                
        game.movePlayer1Up();
      }
      expect(game.score[1].points).toBe(1);
      expect(game.score[2].points).toBe(0);
  }
  expect(Position.equals(game.macGuffin.position, prevMacGuffinPosition)).toBe(false);     
  game.stop();
}});

it("first or second player wins", () => {    
  game = new Game();
  game.settings = {
      pointsToWin: 3,        
      gridSize: {
          columns: 3,            
          rows: 1,
      },    
    };
  game.start();
  // p1 p2 g | p1 g p2 | p2 p1 g | p2 g p1 | g p1 p2 | g p2 p1    
  const diffForPlayer1 = game.macGuffin.position.x - game.player1.position.x;
  if (Math.abs(diffForPlayer1) === 2) {
      const diffForPlayer2 = game.macGuffin.position.x - game.player2.position.x;        
      if (diffForPlayer2 > 0) {
          game.movePlayer2Right();            
          game.movePlayer2Left();
          game.movePlayer2Right();        
        } else {
          game.movePlayer2Left();            
          game.movePlayer2Right();
          game.movePlayer2Left();        
        }
      expect(game.status).toBe("finished");
      expect(game.score[1].points).toBe(0);        
      expect(game.score[2].points).toBe(3);
  } else {        
    if (diffForPlayer1 > 0) {
          game.movePlayer1Right();            
          game.movePlayer1Left();
          game.movePlayer1Right();        
        } else {
          game.movePlayer1Left();            
          game.movePlayer1Right();
          game.movePlayer1Left();        
        }
      expect(game.status).toBe("finished");        
      expect(game.score[1].points).toBe(3);
      expect(game.score[2].points).toBe(0);    
    }
});
  
});

