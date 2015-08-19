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

  this.circle.graphics
    .beginFill(conf.color)
    .drawCircle(0, 0, this.size);

  this.circle.x = conf.x;
  this.circle.y = conf.y;
  this.circle.question = conf.id;
  this.circle.type = conf.type;
  this.circle.mouseEnabled = true;
  this.circle.cursor = 'pointer';

  // Circle methods
  this.circle.drawLine = drawLine;
  this.circle.clearLine = clearLine;
  this.circle.scaleUp = scaleUp;
  this.circle.scaleDown = scaleDown;

  // Add shadow
  this.circle.shadow = new createjs
    .Shadow((conf.shadowColor ? conf.shadowColor : conf.color), 0, 0, this.shadowSize);

  // If the circle is a question
  if (this.circle.type === 'question') {
    this.circle.line = new createjs.Shape();

    // Add mouse events to the circle
    this.circle.on('mousedown', mousedown);
    this.circle.on('pressmove', pressmove);
    this.circle.on('pressup', pressup);
  }

  return this;
};


// Mousedown
function mousedown (e) {
  this.scaleUp();
}

// Pressmove event
function pressmove (e) {
  this.drawLine();
}

// Pressup event
function pressup (e) {
  this.scaleDown();

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

    // If this is the wrong answare
    } else {
      swal("Resporta errada", "Tente novamente", "error");
      this.clearLine();
    }

  } else {
    this.clearLine();
  }
}

// Draw the line
function drawLine (answare) {
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

  this.stage.update();
}

// Clear the line
function clearLine () {
  this.line.graphics.clear();
}

// Scale up
function scaleUp () {
  createjs.Tween.get(this, { override: true })
    .to({ scaleX: 1.5, scaleY: 1.5 }, 100);
}

// Scale down
function scaleDown () {
  createjs.Tween.get(this, { override: true })
    .to({ scaleX: 1, scaleY: 1 }, 100);
}

