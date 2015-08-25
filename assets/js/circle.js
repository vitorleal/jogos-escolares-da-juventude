/**
 * Creates an instance of the Circle object.
 * @class
 * @example
 * ```js
 * var circle = new Circle();
 * ```
 */
var Circle = function Circle () {
  this.size = 15;
  this.shadowSize = 20;
  this.circle = null;
  this.line = null;

  return this;
};


/**
 * Draw the shape and add the event listners to the Circle.
 * @class
 * @param conf {object} - configuration object.
 * @param conf.x {int} - X postion in the canvas.
 * @param conf.y {int} - Y postion in the canvas.
 * @param conf.id {int} - The question/answare ID.
 * @param conf.color {string} - The hexadecimal color of the circle.
 * @param conf.type {string} - Circle type can be question or answare.
 * @example
 * ```js
 * var circle = new Circle();
 * circle.create({
 *   type: 'question',
 *   color: '#000000',
 *   x: 220,
 *   y: 340,
 *   id: 2
 * });
 * ```
 */
Circle.prototype.create = function circleCreate (conf) {
  this.circle = new createjs.Shape();

  // Create the circle graphics
  this.circle.graphics
    .beginFill(conf.color)
    .drawCircle(0, 0, this.size);

  // Add the circle params
  this.circle.x = conf.x;
  this.circle.y = conf.y;
  this.circle.question = conf.id;
  this.circle.type = conf.type;
  this.circle.mouseEnabled = true;
  this.circle.cursor = 'pointer';

  // Circle methods
  this.circle.drawLine = _drawLine;
  this.circle.clearLine = _clearLine;

  // Add shadow
  this.circle.shadow = new createjs
    .Shadow((conf.shadowColor ? conf.shadowColor : conf.color), 0, 0, 20);

  // Add a tween loop to the circle shadow blur
  createjs.Tween.get(this.circle.shadow, { loop: true })
    .to({ blur: 20 }, 700)
    .to({ blur: 5 }, 700)
    .to({ blur: 20 }, 700);

  // Add a tweent loop to the circle scale X/Y
  createjs.Tween.get(this.circle, { loop: true })
    .to({ scaleX: 1.2, scaleY: 1.2 }, 700)
    .to({ scaleX: 1, scaleY: 1 }, 700);

  // If the circle is a question
  if (this.circle.type === 'question') {
    this.circle.line = new createjs.Shape();

    // Add mouse events to the circle
    this.circle.on('pressmove', pressmove);
    this.circle.on('pressup', pressup);
  }

  return this;
};


// Pressmove event
function pressmove (e) {
  this.drawLine();
}

// Pressup event
function pressup (e) {
  // Get the object under the pressup point
  var answare = this.stage.getObjectUnderPoint(
    this.stage.mouseX,
    this.stage.mouseY,
    2
  );

  // If pressup is in a answare circle
  if (answare && answare.type === 'answare') {
    // If this is the correct anwsare
    if (answare.question === this.question) {
      this.mouseEnabled = false;
      this.drawLine(answare);

      // Emit event score up
      this.stage.dispatchEvent('scoreUp', this.question);
      Game.showMessage('success');

    // If this is the wrong answare
    } else {
      Game.showMessage();
      this.clearLine();
    }

  // If pressup is not in a answare circle
  } else {
    this.clearLine();
  }
}

// Draw the line
function _drawLine (answare) {
  var toX = answare ? answare.x : this.stage.mouseX,
      toY = answare ? answare.y : this.stage.mouseY;

  // Clear line to prevent duplication
  this.line.graphics.clear();

  // Draw line
  this.line.graphics
    .beginStroke('#6bffff')
    .setStrokeStyle(2, 'round')
    .moveTo(this.x, this.y)
    .lineTo(toX, toY);

  // Update the stage
  this.stage.update();
}

// Clear the line
function _clearLine () {
  this.line.graphics.clear();
}

