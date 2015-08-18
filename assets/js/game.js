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
var Game = function Game () {
  // Game stage
  this.stage = null;

  // Score array
  this.score = [];

  // Colors
  this.colors = {
    question: '#6bffff',
    answare: '#b8ffa2'
  };

  // Game questions
  this.questions = [{
    id: 1,
    question: {
      text: 'Qual a sigla em Inglês da Agência Mundial Antidopagem responsável pela Luta Mundial Contra a Dopagem no Esporte?',
      x: 192,
      y: 205
    },
    answare: {
      text: 'WADA – World Anti-doping Agency',
      x: 390,
      y: 811
    }
  },{
    id: 2,
    question: {
      text: 'Como é garantida a correta identificação da amostra de cada atleta se o nome não consta do frasco?',
      x: 362,
      y: 360
    },
    answare: {
      text: 'Os kits de coleta são numerados e só o atleta e as Autoridades de Teste têm a informação que relaciona o número do kit com o atleta. O laboratório não tem acesso à identificação do atleta',
      x: 182,
      y: 551
    }
  }, {
    id: 3,
    question: {
      text: 'Razão pela qual a dopagem no esporte precisa ser combatida',
      x: 810,
      y: 645
    },
    answare: {
      text: 'Defesa dos interesses dos atletas que jogam limpo, mantendo a justiça e a ética nas competições esportivas',
      x: 433,
      y: 914
    }
  }, {
    id: 4,
    question: {
      text: 'Por que é arriscado consumir suplementos alimentares sem indicação nutricional?',
      x: 760,
      y: 768
    },
    answare: {
      text: 'Porque as informações presentes na embalagem nem sempre correspondem à real composição do produto',
      x: 1068,
      y: 950
    }
  }, {
    id: 5,
    question: {
      text: 'O que é o Código Mundial Antidopagem?',
      x: 707,
      y: 943
    },
    answare: {
      text: 'É o conjunto de normas que têm o objetivo de unir e fortalecer as políticas antidopagem adotadas por todos os países que aderiram à Convenção Internacional contra a Dopagem no Esporte',
      x: 1395,
      y: 810
    }
  }, {
    id: 6,
    question: {
      text: 'O que é a Lista de Substâncias e Métodos Proibidos?',
      x: 1092,
      y: 731
    },
    answare: {
      text: 'Lista criada pela WADA-AMA com todas as substâncias e métodos proibidos no esporte',
      x: 1496,
      y: 626
    }
  }, {
    id: 7,
    question: {
      text: 'Por que o Atleta que não se dopa é prejudicado?',
      x: 1514,
      y: 697
    },
    answare: {
      text: 'A Dopagem rouba do verdadeiro atleta o tempo, o esforço e o sacrifício de toda uma vida dedicada ao esporte',
      x: 606,
      y: 583
    }
  }, {
    id: 8,
    question: {
      text: 'Caso o atleta tenha dúvida sobre algum medicamento onde ele pode procurar informações?',
      x: 736,
      y: 462
    },
    answare: {
      text: 'No site da ABCD existe o Consulte a Lista que permite pesquisar se medicamentos vendidos no Brasil contêm substâncias proibidas pela Agência Mundial Antidopagem – AMA',
      x: 1316,
      y: 368
    }
  }, {
    id: 9,
    question: {
      text: 'Por que a dopagem deve ser combatida?',
      x: 1177,
      y: 604
    },
    answare: {
      text: 'Porque é uma forma de trapacear os demais atletas. Os atletas devem ter o direito de participar de competições justas e livres de quaisquer formas de dopagem',
      x: 865,
      y: 189
    }
  }, {
    id: 10,
    question: {
      text: 'O que o atleta deve fazer se precisar continuar usando um medicamento autorizado por uma AUT – Autorização de Uso Terapêutico depois do vencimento do prazo de validade?',
      x: 1400,
      y: 251
    },
    answare: {
      text: 'Solicitar uma nova AUT',
      x: 838,
      y: 332
    }
  }];
};

/**
 * Setup the Game
 * @private
 */
Game.prototype._setup = function gameSetup () {
  this.stage = new createjs.Stage('stage');
  this.stage.setBounds(0, 0, 1920, 1080);
  this._insertDots();

  // On event scoreUp
  this.stage.addEventListener('scoreUp', function (e) {
    this.score.push(1);

    if (this.score.length === 10) {
      alert('Parabéns você terminou');
      this.restart();
    }
  }.bind(this));
};

/**
 * Insert questions and anwares in the stage
 * @private
 */
Game.prototype._insertDots = function gameInsertDots () {
  for (var i = 0; i < this.questions.length; i++) {
    // Create the question
    var circle = new Circle();
    var question = circle.create({
      type : 'question',
      color: this.colors.question,
      x    : this.questions[i].question.x,
      y    : this.questions[i].question.y,
      id   : this.questions[i].id
    });

    // Add question to the stage
    this.stage.addChild(question.circle);
    this.stage.addChild(question.circle.line);

    // Create the answare
    var circle2 = new Circle();
    var answare = circle2.create({
      type : 'answare',
      color: this.colors.answare,
      x    : this.questions[i].answare.x,
      y    : this.questions[i].answare.y,
      id   : this.questions[i].id
    });

    // Add answare to the stage
    this.stage.addChild(answare.circle);
  }
};

/**
 * Initiate the Game
 * @example
 * ```js
 * var game = new Game();
 *
 * game.init();
 * ```
 */
Game.prototype.init = function gameInit () {
  this._setup();

  // Add stage ticker
  createjs.Ticker.addEventListener('tick', function () {
    this.stage.update();
  }.bind(this));
};

/**
 * Restart the Game
 * @example
 * ```js
 * var game = new Game();
 *
 * game.restart();
 * ```
 */
Game.prototype.restart = function gameRestart () {
  this.score.length = 0;
  this.init();
};
