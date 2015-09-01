import {Game} from './game.es6.js';


((window) => {
  // On window load
  window.onload = () => {
    let game = new Game();

    game.init();

    let reset = document.querySelector('.reset');
    reset.addEventListener('click', () => {
      game.restart();
    });
  };
})(window);

