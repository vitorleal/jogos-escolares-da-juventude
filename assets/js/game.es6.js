import {Circle} from './circle.es6.js';
import {questions} from './questions.es6.js';

/**
 * Creates an instance of the Game object.
 * @class
 * @example
 * ```js
 * var game = new Game();
 *
 * game.init();
 * ```
 */
export class Game {
  constructor () {
    // Game stage
    this.stage = null;

    // Score array
    this.score = [];

    // Score up listener
    this.scoreUpListener = null;

    // Colors
    this.colors = {
      question: '#6bffff',
      answare: '#00FF51'
    };

    // Game questions
    this.questions = questions;
  }

  /**
  * Setup the Game
  * @private
  */
  _setup() {
    // Create the stage
    this.stage = new createjs.Stage('stage');

    // Add the stage boungs and dimentions
    this.stage.setBounds(0, 0, 1920, 1080);

    // Add support to touch interfaces
    createjs.Touch.enable(this.stage);

    // Insert the dot in the stage
    this._insertDots();

    // On event scoreUp
    this.scoreUpListener = this.stage.on('scoreUp', () => this._scoreUp());
  }


  /**
   * Score up method
   * @example
   * ```js
   * var game = new Game();
   *
   * game._scoreUp();
   * ```
   */
  _scoreUp() {
    // Add one point to the scores
    this.score.push(1);

    // If score length equal the number of questions
    if (this.score.length === this.questions.length) {
      // End the game
      Game.end(() => {
        // Restar the game
        this.restart();
      });
    }
  }


  /**
   * Insert questions and anwares in the stage
   * @private
   */
  _insertDots() {
    for (var item of this.questions) {
      // Create the question
      let circle = new Circle();
      let question = circle.create({
        type : 'question',
        color: this.colors.question,
        x    : item.question.x,
        y    : item.question.y,
        id   : item.id
      });

      // Add question to the stage
      this.stage.addChild(question.circle);
      this.stage.addChild(question.circle.line);

      // Create the answare
      let circle2 = new Circle();
      let answare = circle2.create({
        type       : 'answare',
        color      : this.colors.answare,
        shadowColor: this.colors.question,
        x          : item.answare.x,
        y          : item.answare.y,
        id         : item.id
      });

      // Add answare to the stage
      this.stage.addChild(answare.circle);
    }
  }


  /**
   * Initiate the Game
   * @example
   * ```js
   * var game = new Game();
   *
   * game.init();
   * ```
   */
  init() {
    this._setup();

    // Add stage ticker
    createjs.Ticker.addEventListener('tick', () => {
      this.stage.update();
    });
  }

  /**
   * Restart the Game
   * @example
   * ```js
   * var game = new Game();
   *
   * game.restart();
   * ```
   */
  restart() {
    createjs.Touch.disable(this.stage);
    this.score.length = 0;
    this.stage.off('scoreUp', this.scoreUpListener);
    this.init();
  }

  /**
   * Show the overlay message
   * @static
   * @param [type=error] {string} - The type of the message to show success | error | done
   * @example
   * ```js
   * Game.showMessage();
   * ```
   */
  static showMessage(type) {
    let messageType = (type ? type : 'error'),
        message = document.querySelector('.message'),
        time = 2000;

    // Add classes to the message
    message.classList.add(`message-${messageType}`);
    message.classList.add('ball-fall');

    // Close the message
    setTimeout(() => {
      // Remove classes from the message
      message.classList.remove('ball-fall');
      message.classList.remove(`message-${messageType}`);
    }, time);
  }

  /**
   * Show end game message
   * @static
   * @param callback {function} - Something to execute after the end of the game
   * @example
   * ```js
   * Game.end();
   * Game.end(function doSomething() {});
   * ```
   */
  static end(callback) {
    let message = document.querySelector('.message'),
        canvas = document.querySelector('canvas'),
        header = document.querySelector('header'),
        qa = document.querySelector('.qa'),
        time = 5500;

    // Add animation classes to the message
    message.classList.add('message-done');
    message.classList.add('ball-fall-big');

    // Hide the canvas, header and the questions/answares
    canvas.classList.add('hide');
    header.classList.add('hide');
    qa.classList.add('hide');

    // If callback execute
    if (callback) {
      callback();
    }

    // Close the message
    setTimeout(() => {
      // Remoce the class from the message
      message.classList.remove('message-done');

      // Show the canvas, header and questions/answares
      canvas.classList.remove('hide');
      header.classList.remove('hide');
      qa.classList.remove('hide');

      // Remove the animation class from message
      message.classList.remove('ball-fall-big');
    }, time);
  };
}

