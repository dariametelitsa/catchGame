import { Game } from "./game";

describe('Game test', () => {
  it('should return test', () => {
    const game = new Game();

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
    const game = new Game();

    game.settings =
      {
        gridSize: {
          columns: 10,
          rows: 10,
        }
      }
  

    expect(game.status).toBe('pending');
    game.start();
    expect(game.status).toBe('inProcess');
  });
});