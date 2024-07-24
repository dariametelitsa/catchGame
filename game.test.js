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
        (game.player1.position.x !== game.MacGuffin.position.x ||
            game.player1.position.y !== game.MacGuffin.position.y) &&
        (game.player2.position.x !== game.MacGuffin.position.x ||
            game.player2.position.y !== game.MacGuffin.position.y)
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
      const prevPosition = game.MacGuffin.position.returnCopy();
      await sleep(150);

      expect(Position.equals(prevPosition, game.MacGuffin.position)).toBe(false);
      game.stop();
    }
  })

  const sleep = (delay) => {
    return new Promise(resolve => setTimeout(resolve, delay));
 }

});