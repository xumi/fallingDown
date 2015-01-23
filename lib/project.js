(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ObjectContainer = (function(_super) {

    __extends(ObjectContainer, _super);

    function ObjectContainer() {
      PIXI.DisplayObjectContainer.apply(this, arguments);
    }

    ObjectContainer.prototype.setScale = function(r) {
      this.scale.x = r;
      this.scale.y = r;
      return this;
    };

    ObjectContainer.prototype.getPosition = function(p) {
      return {
        x: this.getX(),
        y: this.getY()
      };
    };

    ObjectContainer.prototype.setPosition = function(p) {
      this.position.x = p.x;
      this.position.y = p.y;
      return this;
    };

    ObjectContainer.prototype.getX = function() {
      return this.position.x;
    };

    ObjectContainer.prototype.getY = function() {
      return this.position.y;
    };

    ObjectContainer.prototype.setX = function(x) {
      return this.setPosition({
        "x": x,
        "y": this.getY()
      });
    };

    ObjectContainer.prototype.setY = function(y) {
      return this.setPosition({
        "x": this.getX(),
        "y": y
      });
    };

    return ObjectContainer;

  })(PIXI.DisplayObjectContainer);

  this.TilingSprite = (function(_super) {

    __extends(TilingSprite, _super);

    function TilingSprite() {
      PIXI.TilingSprite.apply(this, arguments);
    }

    TilingSprite.prototype.setScale = function(r) {
      this.scale.x = r;
      this.scale.y = r;
      return this;
    };

    TilingSprite.prototype.getPosition = function(p) {
      return {
        x: this.getX(),
        y: this.getY()
      };
    };

    TilingSprite.prototype.setPosition = function(p) {
      this.position.x = p.x;
      this.position.y = p.y;
      return this;
    };

    TilingSprite.prototype.getX = function() {
      return this.position.x;
    };

    TilingSprite.prototype.getY = function() {
      return this.position.y;
    };

    TilingSprite.prototype.setX = function(x) {
      return this.setPosition({
        "x": x,
        "y": this.getY()
      });
    };

    TilingSprite.prototype.setY = function(y) {
      return this.setPosition({
        "x": this.getX(),
        "y": y
      });
    };

    return TilingSprite;

  })(PIXI.TilingSprite);

  this.Sprite = (function(_super) {

    __extends(Sprite, _super);

    function Sprite() {
      PIXI.Sprite.apply(this, arguments);
    }

    Sprite.prototype.setScale = function(r) {
      this.scale.x = r;
      this.scale.y = r;
      return this;
    };

    Sprite.prototype.getPosition = function(p) {
      return {
        x: this.getX(),
        y: this.getY()
      };
    };

    Sprite.prototype.setPosition = function(p) {
      this.position.x = p.x;
      this.position.y = p.y;
      return this;
    };

    Sprite.prototype.getX = function() {
      return this.position.x;
    };

    Sprite.prototype.getY = function() {
      return this.position.y;
    };

    Sprite.prototype.setX = function(x) {
      return this.setPosition({
        "x": x,
        "y": this.getY()
      });
    };

    Sprite.prototype.setY = function(y) {
      return this.setPosition({
        "x": this.getX(),
        "y": y
      });
    };

    return Sprite;

  })(PIXI.Sprite);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.GameElement = (function(_super) {

    __extends(GameElement, _super);

    function GameElement(game) {
      GameElement.__super__.constructor.apply(this, arguments);
      this.game = game;
      this.sprite = null;
      this.scene = null;
      this.id = null;
      this.helper = null;
      this.clicked = false;
      this.clickedState = 0;
    }

    GameElement.prototype.start = function() {
      return console.log('started:', this);
    };

    GameElement.prototype.tick = function() {
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

    GameElement.prototype.setInteractive = function(state) {
      var _this;
      GameElement.__super__.setInteractive.apply(this, arguments);
      _this = this;
      if (this.sprite) {
        this.sprite.setInteractive(true);
      }
      if (state && !this.helper) {
        return this.addHelper();
      }
    };

    GameElement.prototype.withSprite = function(path) {
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

    GameElement.prototype.addHelper = function() {
      this.helper = new Sprite(GameAssets.getImage('abstract/helper.png'));
      this.placeHelper();
      this.helper.alpha = 0;
      return this.addChild(this.helper);
    };

    GameElement.prototype.placeHelper = function() {
      this.helper.setX(this.sprite.width / 2 - this.helper.width / 2);
      return this.helper.setY(-this.helper.height / 2);
    };

    GameElement.prototype.showHelper = function() {
      if (this.helper) {
        return this.helper.alpha = .8;
      }
    };

    GameElement.prototype.hideHelper = function() {
      if (this.helper) {
        return this.helper.alpha = 0;
      }
    };

    GameElement.prototype.setScene = function(scene) {
      return this.scene = scene;
    };

    GameElement.prototype.mouseOver = function() {
      return this.showHelper();
    };

    GameElement.prototype.mouseOut = function() {
      return this.hideHelper();
    };

    GameElement.prototype.mouseClick = function() {
      return this.clicked = true;
    };

    GameElement.prototype.addX = function(dx) {
      return this.setPosition(this.position.x + dx, this.position.y);
    };

    GameElement.prototype.addY = function(dy) {
      return this.setPosition(this.position.x, this.position.y + dy);
    };

    GameElement.prototype.setID = function(id) {
      return this.id = id;
    };

    GameElement.prototype.setScale = function(r) {
      this.scale.x = r;
      this.scale.y = r;
      return this;
    };

    GameElement.prototype.getPosition = function(p) {
      return {
        x: this.getX(),
        y: this.getY()
      };
    };

    GameElement.prototype.setPosition = function(p) {
      this.position.x = p.x;
      this.position.y = p.y;
      return this;
    };

    GameElement.prototype.getX = function() {
      return this.position.x;
    };

    GameElement.prototype.getY = function() {
      return this.position.y;
    };

    GameElement.prototype.setX = function(x) {
      return this.setPosition({
        "x": x,
        "y": this.getY()
      });
    };

    GameElement.prototype.setY = function(y) {
      return this.setPosition({
        "x": this.getX(),
        "y": y
      });
    };

    return GameElement;

  })(ObjectContainer);

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
    }

    Scene.prototype.start = function() {
      this.loadBackgrounds();
      return this.loadElements();
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
        if (e.object) {
          if (window[e.object]) {
            element = new window[e.object];
          } else {
            console.error('Class ', e.object, 'is not defined!');
          }
        } else {
          element = new GameElement();
        }
        element.withSprite(e.sprite);
        element.setScene(this);
        element.setInteractive(true);
        element.setID(e.id);
        element.setPosition(e.position);
        this.elements.push(element);
        _results.push(this.addChild(element));
      }
      return _results;
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

  })(GameElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Phone = (function(_super) {

    __extends(Phone, _super);

    function Phone() {
      Phone.__super__.constructor.apply(this, arguments);
    }

    Phone.prototype.mouseClick = function() {
      Phone.__super__.mouseClick.apply(this, arguments);
      return console.log('click on phone');
    };

    return Phone;

  })(GameElement);

}).call(this);

(function() {

  this.Game = (function() {

    Game.WIDTH = 1280;

    Game.HEIGHT = 720;

    function Game(container) {
      this.container = container;
      this.stage = new PIXI.Stage(0x000000, true);
      this.renderer = new PIXI.CanvasRenderer(Game.WIDTH, Game.HEIGHT);
      this.sceneManager = new SceneManager(this);
      this.scene = null;
      this.life = 0;
    }

    Game.prototype.start = function() {
      this.container.appendChild(this.renderer.view);
      return this.assets = new GameAssets(this);
    };

    Game.prototype.tick = function() {
      if (this.scene) {
        this.scene.tick();
      }
      return this.life++;
    };

    Game.prototype.setScene = function(scene) {
      this.scene = scene;
      this.stage.addChild(this.scene);
      return scene.start();
    };

    Game.prototype.setScale = function(s) {
      this.level.setScale(s);
      return this.renderer.resize(Game.WIDTH * s, Game.HEIGHT * s);
    };

    Game.prototype.assetsReady = function() {
      var _this;
      this.level = new Scene(this);
      this.stage.addChild(this.level);
      this.setScale(1);
      _this = this;
      return requestAnimFrame(function() {
        return _this.animate();
      });
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
      var _this;
      this.game = game;
      _this = this;
      this.source = false;
      this.sourceLoader = new PIXI.JsonLoader('/src/game.json');
      this.sourceLoader.on('loaded', function(event) {
        return _this.onRead(event.content.json);
      });
      this.sourceLoader.load();
    }

    SceneManager.prototype.onRead = function(json) {
      var _this;
      _this = this;
      this.source = json;
      return this.game.setScene(new Scene(this.game, this.source["default"]));
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
