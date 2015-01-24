(function() {
  var PIXIOverrideMixin,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  PIXIOverrideMixin = (function() {

    function PIXIOverrideMixin() {}

    PIXIOverrideMixin.prototype.setScale = function(r) {
      this.scale.x = r;
      this.scale.y = r;
      return this;
    };

    PIXIOverrideMixin.prototype.getPosition = function(p) {
      return {
        x: this.getX(),
        y: this.getY()
      };
    };

    PIXIOverrideMixin.prototype.setPosition = function(p) {
      this.position.x = p.x;
      this.position.y = p.y;
      return this;
    };

    PIXIOverrideMixin.prototype.getX = function() {
      return this.position.x;
    };

    PIXIOverrideMixin.prototype.getY = function() {
      return this.position.y;
    };

    PIXIOverrideMixin.prototype.setX = function(x) {
      return this.setPosition({
        "x": x,
        "y": this.getY()
      });
    };

    PIXIOverrideMixin.prototype.setY = function(y) {
      return this.setPosition({
        "x": this.getX(),
        "y": y
      });
    };

    PIXIOverrideMixin.prototype.addX = function(dx) {
      return this.setPosition({
        "x": this.position.x + dx,
        "y": this.position.y
      });
    };

    PIXIOverrideMixin.prototype.addY = function(dy) {
      return this.setPosition({
        "x": this.position.x,
        "y": this.position.y + dy
      });
    };

    PIXIOverrideMixin.extending = function(t) {
      var m, n, _ref, _results;
      _ref = this.prototype;
      _results = [];
      for (n in _ref) {
        m = _ref[n];
        _results.push(t.prototype[n] = m);
      }
      return _results;
    };

    return PIXIOverrideMixin;

  })();

  this.ObjectContainer = (function(_super) {

    __extends(ObjectContainer, _super);

    function ObjectContainer() {
      PIXI.DisplayObjectContainer.apply(this, arguments);
    }

    PIXIOverrideMixin.extending(ObjectContainer);

    return ObjectContainer;

  })(PIXI.DisplayObjectContainer);

  this.TilingSprite = (function(_super) {

    __extends(TilingSprite, _super);

    function TilingSprite() {
      PIXI.TilingSprite.apply(this, arguments);
    }

    PIXIOverrideMixin.extending(TilingSprite);

    return TilingSprite;

  })(PIXI.TilingSprite);

  this.Sprite = (function(_super) {

    __extends(Sprite, _super);

    function Sprite() {
      PIXI.Sprite.apply(this, arguments);
    }

    PIXIOverrideMixin.extending(Sprite);

    return Sprite;

  })(PIXI.Sprite);

  this.Text = (function(_super) {

    __extends(Text, _super);

    function Text() {
      PIXI.Text.apply(this, arguments);
    }

    PIXIOverrideMixin.extending(Text);

    return Text;

  })(PIXI.Text);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.BaseElement = (function(_super) {

    __extends(BaseElement, _super);

    function BaseElement(game) {
      BaseElement.__super__.constructor.apply(this, arguments);
      this.game = game;
      this.sprite = null;
      this.scene = null;
      this.id = null;
      this.helper = null;
      this.defaultText = null;
      this.currentText = null;
      this.textContent = null;
      this.clicked = false;
      this.clickedState = 0;
    }

    BaseElement.prototype.start = function() {
      return console.log('started:', this);
    };

    BaseElement.prototype.tick = function() {
      return this.animateHelper();
    };

    BaseElement.prototype.update = function() {};

    BaseElement.prototype.setInteractive = function(state) {
      var _this;
      BaseElement.__super__.setInteractive.apply(this, arguments);
      _this = this;
      if (this.sprite) {
        this.sprite.setInteractive(true);
      }
      if (state) {
        if (!this.helper) {
          this.addHelper();
        }
        if (!this.sprite) {
          return;
        }
        this.sprite.buttonMode = true;
        return this.sprite.defaultCursor = "crosshair";
      } else {
        if (this.sprite) {
          this.sprite.buttonMode = false;
        }
        this.hideHelper();
        return this.hideText();
      }
    };

    BaseElement.prototype.withSprite = function(path) {
      var _this;
      this.sprite = new Sprite(GameAssets.getImage(path));
      this.addChild(this.sprite);
      _this = this;
      this.sprite.mouseover = function() {
        return _this.mouseOver();
      };
      this.sprite.mouseout = function() {
        return _this.mouseOut();
      };
      this.sprite.click = function() {
        return _this.mouseClick();
      };
      return this;
    };

    BaseElement.prototype.addHelper = function() {
      this.helper = new Sprite(GameAssets.getImage('abstract/helper.png'));
      this.placeHelper();
      this.helper.alpha = 0;
      return this.addChild(this.helper);
    };

    BaseElement.prototype.placeHelper = function() {
      if (!this.sprite) {
        return;
      }
      this.helper.setX(this.sprite.width / 2 - this.helper.width / 2);
      return this.helper.setY(-this.helper.height / 2);
    };

    BaseElement.prototype.showHelper = function() {
      if (this.helper) {
        return this.helper.alpha = .8;
      }
    };

    BaseElement.prototype.hideHelper = function() {
      if (this.helper) {
        return this.helper.alpha = 0;
      }
    };

    BaseElement.prototype.animateHelper = function() {
      if (this.clicked) {
        this.clickedState++;
        if (this.clickedState === 0) {
          GameSounds.play('interactive');
        }
        if (this.clickedState > 1) {
          this.helper.setScale(1.2);
        }
        if (this.clickedState > 2) {
          this.helper.setScale(1.3);
        }
        if (this.clickedState > 3) {
          this.helper.setScale(1.5);
        }
        if (this.clickedState === 5) {
          this.helper.setScale(1);
          this.clickedState = 0;
          this.clicked = false;
        }
        return this.placeHelper();
      }
    };

    BaseElement.prototype.setDefaultText = function(t) {
      this.defaultText = t;
      return this.setText(this.defaultText);
    };

    BaseElement.prototype.setText = function(t) {
      var style;
      this.textContent = t;
      style = {
        font: "20px Arial",
        fill: this.scene.textColor
      };
      if (!this.currentText) {
        this.currentText = new Text(t, style);
        this.addChild(this.currentText);
      }
      this.currentText.setText(this.textContent);
      this.currentText.setStyle(style);
      this.currentText.setX(this.sprite.width / 2 - this.currentText.width / 2);
      this.currentText.setY(-this.currentText.height * 1.5);
      return this.hideText();
    };

    BaseElement.prototype.showText = function() {
      if (this.currentText) {
        return this.currentText.alpha = .9;
      }
    };

    BaseElement.prototype.hideText = function() {
      if (this.currentText) {
        return this.currentText.alpha = 0;
      }
    };

    BaseElement.prototype.mouseOver = function() {
      if (this.sprite && this.helper && this.sprite.buttonMode) {
        this.showHelper();
      }
      if (this.sprite && this.sprite.buttonMode) {
        this.showText();
      }
      return this.over = true;
    };

    BaseElement.prototype.mouseOut = function() {
      if (this.sprite && this.helper && this.sprite.buttonMode) {
        this.hideHelper();
      }
      if (this.sprite && this.sprite.buttonMode) {
        this.hideText();
      }
      return this.over = false;
    };

    BaseElement.prototype.mouseClick = function() {
      return this.clicked = true;
    };

    BaseElement.prototype.hide = function() {
      this.visible = false;
      return this;
    };

    BaseElement.prototype.show = function() {
      this.visible = true;
      return this;
    };

    BaseElement.prototype.toggle = function() {
      this.visible = !this.visible;
      return this;
    };

    BaseElement.prototype.setScene = function(scene) {
      return this.scene = scene;
    };

    BaseElement.prototype.setID = function(id) {
      return this.id = id;
    };

    return BaseElement;

  })(ObjectContainer);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Camera = (function(_super) {

    __extends(Camera, _super);

    function Camera(game) {
      Camera.__super__.constructor.apply(this, arguments);
      this.eyeTop = new BaseElement().withSprite("camera/eye_top.png");
      this.eyeBottom = new BaseElement().withSprite("camera/eye_bottom.png");
      this.game.stage.addChild(this.eyeTop);
      this.game.stage.addChild(this.eyeBottom);
      this.eyeTop.setY(0);
      this.eyeBottom.setY(0);
      this.blinkState = false;
      this.blinkStep = 0;
      this.blinkGoalStep = 0;
      this.requiredBlink = 0;
    }

    Camera.prototype.tick = function() {
      if (this.blinkState) {
        return this.animateBlink();
      }
    };

    Camera.prototype.animateBlink = function() {
      var step;
      if (this.game.life % 4 !== 0) {
        return;
      }
      step = 80;
      this.eyeTop.toggle();
      console.log(this.eyeTop.visible);
      if (this.blinkState === 'closing') {
        this.randBlinkTime();
        this.blinkStep++;
        this.eyeTop.addY(step);
        if (this.eyeTop.getY() >= 0) {
          this.eyeTop.setY(0);
        }
        this.eyeBottom.addY(-step);
        if (this.eyeBottom.getY() < 0) {
          this.eyeBottom.setY(0);
        }
        if (this.eyeTop.getY() >= 0 && this.blinkStep >= this.blinkGoalStep) {
          this.blinkState = 'opening';
          this.blinkGoalStep = 0;
          return this.blinkStep = 0;
        }
      } else {
        this.eyeBottom.addY(step);
        this.eyeTop.addY(-step);
        if (this.eyeTop.getY() < -Game.HEIGHT) {
          this.requiredBlink--;
          if (this.requiredBlink <= 0) {
            return this.blinkState = false;
          } else {
            return this.blinkState = 'closing';
          }
        }
      }
    };

    Camera.prototype.blink = function(amount) {
      this.requiredBlink = isNaN(amount) ? 1 : amount;
      this.blinkState = 'closing';
      return this.blinkStep = 0;
    };

    Camera.prototype.randBlinkTime = function() {
      return this.blinkGoalStep = 5 + Math.random() * 30;
    };

    return Camera;

  })(BaseElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Scene = (function(_super) {

    __extends(Scene, _super);

    function Scene(game, source) {
      Scene.__super__.constructor.apply(this, arguments);
      this.source = source;
      this.backgrounds = [];
      this.backgroundSpeed = 1;
      this.elements = [];
      this.textColor = "black";
    }

    Scene.prototype.start = function() {
      if (this.source.textColor) {
        this.textColor = this.source.textColor;
      }
      this.loadBackgrounds();
      return this.loadElements();
    };

    Scene.prototype.stateChanged = function() {
      var e, _i, _len, _ref, _results;
      _ref = this.source.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        _results.push(e.update());
      }
      return _results;
    };

    Scene.prototype.loadBackgrounds = function() {
      var bg, bgs, _i, _len;
      bgs = this.source.background instanceof Array ? this.source.background : [this.source.background];
      for (_i = 0, _len = bgs.length; _i < _len; _i++) {
        bg = bgs[_i];
        this.backgrounds.push(new Sprite(GameAssets.getImage(bg), Game.WIDTH, Game.HEIGHT));
      }
      if (this.source.backgroundSpeed) {
        this.backgroundSpeed = parseInt(this.source.backgroundSpeed);
      }
      return this.addChild(this.backgrounds[0]);
    };

    Scene.prototype.loadElements = function() {
      var e, element, _i, _len, _ref, _results;
      _ref = this.source.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        element = this.loadElement(e);
        element.withSprite(e.sprite);
        element.setScene(this);
        element.setID(e.id);
        element.setPosition(e.position);
        if (e.text) {
          element.setDefaultText(e.text);
        }
        this.elements.push(element);
        _results.push(this.addChild(element));
      }
      return _results;
    };

    Scene.prototype.setInteractive = function(state) {
      var element, _i, _len, _ref;
      _ref = this.elements;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        element.setInteractive(state);
      }
      return Scene.__super__.setInteractive.apply(this, arguments);
    };

    Scene.prototype.loadElement = function(e) {
      var element;
      if (e.object) {
        if (window[e.object]) {
          return element = new window[e.object](this.game);
        } else {
          return console.error('Class ', e.object, 'is not defined!');
        }
      } else {
        return element = new BaseElement(this.game);
      }
    };

    Scene.prototype.findElement = function(id) {
      var element, found, _i, _len, _ref;
      found = null;
      _ref = this.elements;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        if (element.id === id) {
          found = element;
        }
        if (found) {
          break;
        }
      }
      return found;
    };

    Scene.prototype.tick = function() {
      var element, _i, _len, _ref, _results;
      _ref = this.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        _results.push(element.tick());
      }
      return _results;
    };

    return Scene;

  })(BaseElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Keys = (function(_super) {

    __extends(Keys, _super);

    function Keys() {
      return Keys.__super__.constructor.apply(this, arguments);
    }

    Keys.prototype.mouseClick = function() {
      Keys.__super__.mouseClick.apply(this, arguments);
      return this.game.sceneManager.change('car');
    };

    return Keys;

  })(BaseElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Phone = (function(_super) {

    __extends(Phone, _super);

    function Phone() {
      return Phone.__super__.constructor.apply(this, arguments);
    }

    Phone.prototype.mouseClick = function() {
      Phone.__super__.mouseClick.apply(this, arguments);
      return this.game.camera.blink(2);
    };

    return Phone;

  })(BaseElement);

}).call(this);

(function() {

  this.Game = (function() {

    Game.WIDTH = 1280;

    Game.HEIGHT = 720;

    function Game(container) {
      this.container = container;
      this.stage = new PIXI.Stage(0x000000, true);
      this.renderer = new PIXI.CanvasRenderer(Game.WIDTH, Game.HEIGHT);
      this.sceneManager = null;
      this.states = new GameStates();
      this.camera = null;
      this.life = 0;
    }

    Game.prototype.start = function() {
      this.container.appendChild(this.renderer.view);
      return this.assets = new GameAssets(this);
    };

    Game.prototype.tick = function() {
      this.life++;
      if (this.sceneManager) {
        this.sceneManager.tick();
      }
      if (this.camera) {
        return this.camera.tick();
      }
    };

    Game.prototype.setScene = function(scene) {
      return this.sceneManager.change(scene);
    };

    Game.prototype.setScale = function(s) {
      this.scene.setScale(s);
      return this.renderer.resize(Game.WIDTH * s, Game.HEIGHT * s);
    };

    Game.prototype.assetsReady = function() {
      return this.sceneManager = new SceneManager(this);
    };

    Game.prototype.scenesReady = function() {
      var _this;
      _this = this;
      this.camera = new Camera(this);
      return requestAnimFrame(function() {
        return _this.animate();
      });
    };

    Game.prototype.stateChanged = function() {
      return this.sceneManager.scene.stateChanged();
    };

    Game.prototype.animate = function() {
      var _this;
      _this = this;
      this.tick();
      requestAnimFrame(function() {
        return _this.animate();
      });
      return this.renderer.render(this.stage);
    };

    return Game;

  })();

}).call(this);

(function() {

  this.GameAssets = (function() {

    GameAssets.ASSETS = false;

    GameAssets.ROOT = '/assets/';

    function GameAssets(game) {
      var _this;
      this.game = game;
      _this = this;
      this.sourceLoader = new PIXI.JsonLoader('/src/assets.json');
      this.sourceLoader.on('loaded', function(event) {
        return _this.onRead(event.content.json);
      });
      this.sourceLoader.load();
    }

    GameAssets.prototype.onRead = function(json) {
      var _this;
      _this = this;
      GameAssets.ASSETS = json;
      this.loader = new PIXI.AssetLoader(this.buildAssets());
      this.loader.onComplete = function() {
        return _this.game.assetsReady();
      };
      return this.loader.load();
    };

    GameAssets.prototype.buildAssets = function() {
      var assets, image_path, path, _i, _len, _ref;
      assets = [];
      _ref = GameAssets.ASSETS['images'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        image_path = GameAssets.toPath('images', path);
        assets.push(image_path);
      }
      return assets;
    };

    GameAssets.getDefaultImage = function(name) {
      return PIXI.Texture.fromImage(GameAssets.toPath('images', 'missing.png'));
    };

    GameAssets.getImage = function(name) {
      return PIXI.Texture.fromImage(GameAssets.toPath('images', name));
    };

    GameAssets.getFrame = function(name) {
      return PIXI.Texture.fromFrame(GameAssets.toPath('images', name));
    };

    GameAssets.toPath = function(type, path) {
      return GameAssets.ROOT + type + '/' + path;
    };

    return GameAssets;

  })();

}).call(this);

(function() {

  this.SceneManager = (function() {

    function SceneManager(game) {
      this.game = game;
      this.scene = null;
      this.transitioningTo = null;
      this.load();
    }

    SceneManager.prototype.load = function() {
      var _this;
      _this = this;
      this.source = false;
      this.sourceLoader = new PIXI.JsonLoader('/src/game.json');
      this.sourceLoader.on('loaded', function(event) {
        return _this.onRead(event.content.json);
      });
      return this.sourceLoader.load();
    };

    SceneManager.prototype.onRead = function(json) {
      var _this;
      _this = this;
      this.source = json;
      this.game.scenesReady();
      return this.change('default');
    };

    SceneManager.prototype.tick = function() {
      var step;
      if (this.scene) {
        this.scene.tick();
      }
      if (this.transitioningTo) {
        if (this.scene) {
          this.scene.setInteractive(false);
        }
        step = .01;
        if (this.scene && this.scene.alpha > 0) {
          this.scene.alpha -= step;
          if (this.scene.alpha < 0) {
            this.scene.alpha = 0;
            this.scene.hide();
            this.transitioningTo.alpha = 0;
            return this.transitioningTo.show();
          }
        } else {
          this.transitioningTo.alpha += step;
          if (this.transitioningTo.alpha >= 1) {
            this.scene = this.transitioningTo;
            this.scene.setInteractive(true);
            this.scene.alpha = 1;
            return this.transitioningTo = false;
          }
        }
      }
    };

    SceneManager.prototype.change = function(sceneID) {
      var scene;
      scene = new Scene(this.game, this.source[sceneID]);
      this.game.stage.addChild(scene);
      this.transitioningTo = scene;
      this.transitioningTo.alpha = 0;
      return this.transitioningTo.start();
    };

    return SceneManager;

  })();

}).call(this);

(function() {

  this.GameSounds = (function() {

    function GameSounds() {}

    GameSounds.play = function(file) {};

    return GameSounds;

  })();

}).call(this);

(function() {

  this.GameStates = (function() {

    function GameStates(game) {
      this.game = game;
      this.states = {};
    }

    GameStates.prototype.incState = function(id) {
      this.states[id] = this.states[id] ? this.states[id] + 1 : 1;
      return this.game.stateChanged();
    };

    GameStates.prototype.setState = function(id, value) {
      var changed;
      changed = this.states[id] === !value;
      this.states[id] = value;
      if (changed) {
        return this.game.stateChanged();
      }
    };

    return GameStates;

  })();

}).call(this);
