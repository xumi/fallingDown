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

    PIXIOverrideMixin.prototype.setSize = function(s) {
      this.width = s.width;
      this.height = s.height;
      return this;
    };

    PIXIOverrideMixin.prototype.getHeight = function() {
      return this.height;
    };

    PIXIOverrideMixin.prototype.getWidth = function() {
      return this.width;
    };

    PIXIOverrideMixin.prototype.setWidth = function(w) {
      return this.setSize({
        "width": w,
        "height": this.getHeight()
      });
    };

    PIXIOverrideMixin.prototype.setHeight = function(h) {
      return this.setSize({
        "width": this.getWidth(),
        "height": h
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
      this.zIndex = 1;
      this.sprite = null;
      this.scene = null;
      this.id = null;
      this.clicked = false;
      this.clickedState = 0;
    }

    BaseElement.prototype.withSprite = function(path) {
      return this.setSprite(new Sprite(GameAssets.getImage(path)));
    };

    BaseElement.prototype.setSprite = function(sprite) {
      var _this;
      this.sprite = sprite;
      this.addChild(this.sprite);
      _this = this;
      return this;
    };

    BaseElement.prototype.tick = function() {};

    BaseElement.prototype.setInteractive = function(state) {
      var _this;
      BaseElement.__super__.setInteractive.apply(this, arguments);
      _this = this;
      if (state) {
        if (this.hitbox) {
          this.hitbox.setInteractive(state);
          this.hitbox.mouseover = function() {
            return _this.mouseOver();
          };
          this.hitbox.mouseout = function() {
            return _this.mouseOut();
          };
          this.hitbox.click = function() {
            return _this.mouseClick();
          };
          this.hitbox.buttonMode = true;
          this.hitbox.defaultCursor = "crosshair";
        } else {
          this.mouseover = function() {
            return _this.mouseOver();
          };
          this.mouseout = function() {
            return _this.mouseOut();
          };
          this.click = function() {
            return _this.mouseClick();
          };
          this.buttonMode = true;
          this.defaultCursor = "crosshair";
        }
      } else {
        this.buttonMode = false;
        if (this.hitbox) {
          this.hitbox.buttonMode = false;
          this.defaultCursor = "default";
        }
      }
      return this;
    };

    BaseElement.prototype.mouseOver = function() {};

    BaseElement.prototype.mouseOut = function() {};

    BaseElement.prototype.mouseClick = function() {};

    BaseElement.prototype.setSize = function(size) {
      if (this.sprite) {
        this.sprite.width = size.width;
        this.sprite.height = size.height;
      } else {
        this.width = size.width;
        this.height = size.height;
      }
      return this;
    };

    BaseElement.prototype.getWidth = function() {
      if (this.sprite) {
        return this.sprite.width;
      } else {
        return this.width;
      }
    };

    BaseElement.prototype.getHeight = function() {
      if (this.sprite) {
        return this.sprite.height;
      } else {
        return this.height;
      }
    };

    BaseElement.prototype.hide = function() {
      this.visible = false;
      this.wasInteractive = this.interactive;
      this.setInteractive(false);
      return this;
    };

    BaseElement.prototype.show = function() {
      this.visible = true;
      if (this.wasInteractive) {
        this.setInteractive(true);
      }
      return this;
    };

    BaseElement.prototype.toggle = function() {
      this.visible = !this.visible;
      return this;
    };

    BaseElement.prototype.setScene = function(scene) {
      return this.scene = scene;
    };

    BaseElement.prototype.setTitle = function(title) {
      return this.title = title;
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
      this.zIndex = 98;
      this.eyeTop = new BaseElement().withSprite("camera/eye_top.png");
      this.eyeBottom = new BaseElement().withSprite("camera/eye_bottom.png");
      this.game.addChild(this);
      this.eyeTop.setY(-Game.HEIGHT);
      this.eyeBottom.setY(Game.HEIGHT);
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

  this.InteractionsManager = (function() {

    function InteractionsManager(game) {
      this.game = game;
    }

    InteractionsManager.prototype.useOn = function(itemClicked) {
      if (this.game.inventory.isHandFree()) {
        return;
      }
      if (this.game.inventory.isHolding("lighter")) {
        this.game.inventory.reset();
        return this.game.textManager.setText("It won't burn.");
      }
      if (this.game.inventory.isHolding("knife")) {
        this.game.inventory.reset();
        return this.game.textManager.setText("Can't cut it.");
      }
      this.game.inventory.reset();
      return this.game.textManager.setText("Nothing to do here.");
    };

    return InteractionsManager;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Inventory = (function(_super) {

    __extends(Inventory, _super);

    function Inventory(game) {
      var style;
      Inventory.__super__.constructor.apply(this, arguments);
      this.zIndex = 97;
      this.useItem = null;
      this.onItem = null;
      this.game.addChild(this);
      style = {
        font: "20px Arial",
        fill: "white",
        stroke: "black",
        strokeThickness: 7
      };
      this.textHolder = new Text("", style);
      this.addChild(this.textHolder);
      this.place();
    }

    Inventory.prototype.reset = function() {
      this.useItem = null;
      this.onItem = null;
      return this.update();
    };

    Inventory.prototype.use = function(element) {
      this.useItem = element;
      return this.update();
    };

    Inventory.prototype.on = function(element) {
      if (!this.useItem) {
        return;
      }
      if ((this.useItem && element) && this.useItem.id === element.id) {
        return;
      }
      this.onItem = element;
      return this.update();
    };

    Inventory.prototype.isHandFree = function() {
      return !this.useItem;
    };

    Inventory.prototype.isHolding = function(id) {
      return this.useItem && this.useItem.id === id;
    };

    Inventory.prototype.place = function() {
      this.setX(10);
      return this.setY(Game.HEIGHT - this.textHolder.height - 10);
    };

    Inventory.prototype.update = function() {
      var text;
      if ((this.useItem && this.onItem) && this.useItem.id === this.onItem.id) {
        this.onItem = null;
      }
      text = "";
      if (this.useItem) {
        text += "Use " + this.useItem.title;
        if (this.onItem) {
          text += " with " + this.onItem.title;
        }
      }
      this.textHolder.setText(text);
      this.textHolder.visible = text !== "";
      return this;
    };

    return Inventory;

  })(BaseElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Scene = (function(_super) {

    __extends(Scene, _super);

    function Scene(game, source) {
      this.zIndex = 0;
      Scene.__super__.constructor.apply(this, arguments);
      this.source = source;
      this.background = null;
      this.elements = new BaseElement();
      this.musicName = null;
      this.textColor = "white";
      this.textStroke = "black";
    }

    Scene.prototype.start = function() {
      this.loadOptions();
      this.loadMusic();
      this.loadBackground();
      return this.loadElements();
    };

    Scene.prototype.leaving = function() {
      this.game.inventory.reset();
      return this.setInteractive(false);
    };

    Scene.prototype.loadMusic = function() {
      if (this.source.music) {
        return this.musicName = this.source.music;
      }
    };

    Scene.prototype.loadOptions = function() {
      if (this.source.textColor) {
        return this.textColor = this.source.textColor;
      }
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

    Scene.prototype.loadBackground = function() {
      var bgs, _this;
      if (!this.source.background) {
        return;
      }
      _this = this;
      bgs = this.source.background instanceof Array ? this.source.background : [this.source.background];
      this.background = new BaseElement(this.game).withSprite(this.source.background);
      this.background.setInteractive(true);
      this.background.mouseClick = function() {
        return _this.game.inventory.reset();
      };
      if (this.source.backgroundSpeed) {
        this.backgroundSpeed = parseInt(this.source.backgroundSpeed);
      }
      return this.addChild(this.background);
    };

    Scene.prototype.loadElements = function() {
      var e, element, _i, _len, _ref, _results;
      if (!this.source.elements) {
        return;
      }
      this.addChild(this.elements);
      this.elements.zIndex = 3;
      _ref = this.source.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        element = this.loadElement(e);
        if (e.sprite) {
          element.withSprite(e.sprite);
        }
        if (e.hitbox) {
          element.withHitBox(e.hitbox);
        }
        element.setScene(this);
        element.setID(e.id);
        if (e.hidden) {
          element.visible = false;
        }
        if (e.title) {
          element.setTitle(e.title);
        }
        element.setPosition(e.position);
        if (e.title) {
          element.setDefaultText(e.title);
        }
        _results.push(this.elements.addChild(element));
      }
      return _results;
    };

    Scene.prototype.setInteractive = function(state) {
      var element, _i, _len, _ref;
      _ref = this.elements.children;
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
          return console.error('Element Class ', e.object, 'is not defined!');
        }
      } else {
        return element = new SceneElement(this.game);
      }
    };

    Scene.prototype.findElement = function(id) {
      var element, found, _i, _len, _ref;
      found = null;
      _ref = this.elements.children;
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
      _ref = this.elements.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        _results.push(element.tick());
      }
      return _results;
    };

    Scene.prototype.addChild = function(element) {
      Scene.__super__.addChild.apply(this, arguments);
      if (element.setScene) {
        element.setScene(this);
      }
      return this.sortLayouts();
    };

    Scene.prototype.sortLayouts = function() {
      this.children.sort(function(a, b) {
        if (a.zIndex < b.zIndex) {
          return -1;
        }
        if (a.zIndex > b.zIndex) {
          return 1;
        }
        return 0;
      });
      return this;
    };

    return Scene;

  })(BaseElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SceneElement = (function(_super) {

    __extends(SceneElement, _super);

    function SceneElement(game) {
      SceneElement.__super__.constructor.apply(this, arguments);
      this.title;
      this.helper = null;
      this.title = "Something";
      this.defaultText = null;
      this.currentText = null;
      this.textHolder = null;
      this.useHelper = true;
      this.usable = true;
    }

    SceneElement.prototype.start = function() {};

    SceneElement.prototype.tick = function() {
      return this.animateHelper();
    };

    SceneElement.prototype.update = function() {};

    SceneElement.prototype.noHelper = function() {
      if (this.helper) {
        this.helper.hide();
      }
      this.helper = null;
      this.useHelper = false;
      return this;
    };

    SceneElement.prototype.setInteractive = function(state) {
      var _this;
      SceneElement.__super__.setInteractive.apply(this, arguments);
      _this = this;
      if (state) {
        if (!this.helper) {
          this.addHelper();
        }
      } else {
        this.hideHelper();
        this.hideText();
      }
      return this;
    };

    SceneElement.prototype.withHitBox = function(size) {
      this.hitbox = new Sprite(GameAssets.getImage('abstract/debug.png'));
      this.addChild(this.hitbox);
      this.hitbox;
      this.hitbox.setSize(size);
      return this.hitbox.alpha = Game.DEV_ENV ? 0.3 : 0;
    };

    SceneElement.prototype.addHelper = function() {
      if (!this.useHelper) {
        return;
      }
      this.helper = new Sprite(GameAssets.getImage('abstract/helper.png'));
      this.placeHelper();
      this.helper.alpha = 0;
      return this.addChild(this.helper);
    };

    SceneElement.prototype.placeHelper = function() {
      if (!this.hitbox) {
        return this;
      }
      this.helper.setX(this.hitbox.width / 2 - this.helper.width / 2);
      this.helper.setY(-this.helper.height / 2);
      return this;
    };

    SceneElement.prototype.showHelper = function() {
      if (this.helper) {
        this.helper.alpha = .8;
      }
      return this;
    };

    SceneElement.prototype.hideHelper = function() {
      if (this.helper) {
        this.helper.alpha = 0;
      }
      return this;
    };

    SceneElement.prototype.animateHelper = function() {
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

    SceneElement.prototype.setDefaultText = function(t) {
      this.defaultText = t;
      return this.setText(this.defaultText);
    };

    SceneElement.prototype.setText = function(t, style) {
      this.textHolder = t;
      if (!style) {
        style = {
          font: "20px Arial",
          fill: this.scene.textColor,
          stroke: this.scene.textStroke,
          strokeThickness: 7
        };
      }
      if (!this.currentText) {
        this.currentText = new Text(t, style);
        this.addChild(this.currentText);
      }
      this.currentText.setText(this.textHolder);
      this.currentText.setStyle(style);
      this.placeText();
      return this.hideText();
    };

    SceneElement.prototype.placeText = function() {
      this.currentText.setX(this.hitbox.width / 2 - this.currentText.width / 2);
      this.currentText.setY(-this.currentText.height * 1.5);
      return this;
    };

    SceneElement.prototype.showText = function() {
      if (this.currentText) {
        return this.currentText.alpha = .9;
      }
    };

    SceneElement.prototype.hideText = function() {
      if (this.currentText) {
        return this.currentText.alpha = 0;
      }
    };

    SceneElement.prototype.mouseOver = function() {
      SceneElement.__super__.mouseOver.apply(this, arguments);
      if (this.game.textManager.visible) {
        return this.hideHelper().hideText();
      }
      if (this.hitbox && this.helper && this.hitbox.buttonMode) {
        this.showHelper();
      }
      if (this.hitbox && this.hitbox.buttonMode) {
        this.showText();
      }
      this.game.inventory.on(this);
      return this.over = true;
    };

    SceneElement.prototype.mouseOut = function() {
      SceneElement.__super__.mouseOut.apply(this, arguments);
      if (this.game.textManager.visible) {
        return this.hideHelper().hideText();
      }
      if (this.hitbox && this.helper && this.hitbox.buttonMode) {
        this.hideHelper();
      }
      if (this.hitbox && this.hitbox.buttonMode) {
        this.hideText();
      }
      this.game.inventory.on(null);
      return this.over = false;
    };

    SceneElement.prototype.mouseClick = function() {
      SceneElement.__super__.mouseClick.apply(this, arguments);
      if (this.game.textManager.visible) {
        return;
      }
      this.clicked = true;
      this.game.interactionsManager.useOn(this);
      return this.game.inventory.use(this);
    };

    SceneElement.prototype.setSize = function(size) {
      if (this.hitbox) {
        this.hitbox.width = size.width;
        this.hitbox.height = size.height;
      } else {
        SceneElement.__super__.setSize.apply(this, arguments);
      }
      return this;
    };

    SceneElement.prototype.hide = function() {
      this.visible = false;
      this.wasInteractive = this.interactive;
      this.setInteractive(false);
      return this;
    };

    SceneElement.prototype.show = function() {
      this.visible = true;
      if (this.wasInteractive) {
        this.setInteractive(true);
      }
      return this;
    };

    SceneElement.prototype.toggle = function() {
      this.visible = !this.visible;
      return this;
    };

    SceneElement.prototype.setScene = function(scene) {
      return this.scene = scene;
    };

    SceneElement.prototype.setTitle = function(title) {
      return this.title = title;
    };

    SceneElement.prototype.setID = function(id) {
      return this.id = id;
    };

    return SceneElement;

  })(BaseElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Bus = (function(_super) {

    __extends(Bus, _super);

    function Bus() {
      Bus.__super__.constructor.apply(this, arguments);
      this.zIndex = 1;
      this.withSprite('background/bus.png');
      this.coming = false;
      this.delay = 10;
      this.sprite.visible = false;
      this.i = 0;
    }

    Bus.prototype.tick = function() {
      if (!this.coming) {
        return;
      }
      this.sprite.visible = true;
      if (this.i === this.delay * 0) {
        this.setScale(0.1).setX((Game.WIDTH / 2) - 100).setY(-10);
      }
      if (this.i === this.delay * 1) {
        this.setScale(0.2).setX((Game.WIDTH / 2) - 120).setY(-20);
      }
      if (this.i === this.delay * 2) {
        this.setScale(0.5).setX((Game.WIDTH / 2) - 180).setY(-30);
      }
      if (this.i === this.delay * 3) {
        this.setScale(0.7).setX((Game.WIDTH / 2) - 240).setY(-40);
      }
      if (this.i === this.delay * 4) {
        this.setScale(0.9).setX((Game.WIDTH / 2) - 300).setY(-50);
      }
      if (this.i === this.delay * 5) {
        this.setScale(1.2).setX((Game.WIDTH / 2) - 380).setY(-60);
      }
      if (this.i === this.delay * 6) {
        this.setScale(1.5).setX((Game.WIDTH / 2) - 450).setY(-70);
      }
      if (this.i === this.delay * 7) {
        this.setScale(1.8).setX((Game.WIDTH / 2) - 500).setY(-70);
      }
      if (this.i === this.delay * 8) {
        this.setScale(1.8).setX((Game.WIDTH / 2) - 500).setY(-80);
        this.game.sceneManager.change('transitionCarOut');
      }
      return this.i++;
    };

    Bus.prototype.leaving = function() {
      return this.game.soundManager.stopMusic();
    };

    Bus.prototype.start = function() {
      var _this;
      this.coming = true;
      this.game.soundManager.playSound('car-bus_horn');
      _this = this;
      setTimeout(function() {
        return _this.scene.doEmergencyAction();
      }, 1000);
      return this.i = 0;
    };

    return Bus;

  })(BaseElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.CarControl = (function(_super) {

    __extends(CarControl, _super);

    function CarControl() {
      return CarControl.__super__.constructor.apply(this, arguments);
    }

    CarControl.prototype.mouseClick = function() {
      CarControl.__super__.mouseClick.apply(this, arguments);
      return this.scene.doEmergencyAction();
    };

    return CarControl;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Carpet = (function(_super) {

    __extends(Carpet, _super);

    function Carpet() {
      var _this;
      Carpet.__super__.constructor.apply(this, arguments);
      this.occupied = false;
      _this = this;
    }

    Carpet.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        this.game.textManager.setText("Perfectly clean.");
      } else if (this.game.inventory.isHolding("lighter")) {
        if (this.scene.findElement('georgette').dead) {
          this.scene.lightFire();
        } else {
          this.game.textManager.setText("Why would I do that?");
        }
        return;
      } else if (this.game.inventory.isHolding("george")) {
        if (this.scene.findElement('georgette').dead) {
          this.hideCorpse();
          return;
        }
      } else if (this.game.inventory.isHolding("georgette")) {
        if (this.scene.findElement('georgette').dead) {
          this.hideCorpse();
          return;
        }
      }
      return Carpet.__super__.mouseClick.apply(this, arguments);
    };

    Carpet.prototype.hideCorpse = function() {
      this.occupied = true;
      this.scene.findElement('george').hide();
      this.sprite = new BaseElement().withSprite('elements/apartment-carpet_with_body.png');
      this.sprite.setX(-498).setY(-123);
      this.addChild(this.sprite);
      return this.game.textManager.setText("This is not very efficient.");
    };

    return Carpet;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Couch = (function(_super) {

    __extends(Couch, _super);

    function Couch() {
      Couch.__super__.constructor.apply(this, arguments);
      this.opened = false;
    }

    Couch.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        this.game.textManager.setText("Not exactly the best time to rest.");
        return;
      } else if (this.game.inventory.isHolding("lighter")) {
        if (this.scene.findElement('georgette').dead) {
          this.scene.lightFire();
        } else {
          this.game.textManager.setText("Why would I do that?");
        }
        return;
      } else if (this.game.inventory.isHolding("knife")) {
        this.game.textManager.setText("No need to cut it.");
        return;
      }
      return Couch.__super__.mouseClick.apply(this, arguments);
    };

    Couch.prototype.open = function() {
      return this.opened = true;
    };

    return Couch;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Door = (function(_super) {

    __extends(Door, _super);

    function Door() {
      Door.__super__.constructor.apply(this, arguments);
      this.knockSoundVisual = new KnockSound(this.game);
      this.addChild(this.knockSoundVisual);
    }

    Door.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        if (this.knockSoundVisual.knocking) {
          this.open();
          return;
        }
        if (this.scene.findElement('georgette').dead) {
          if (this.scene.onFire) {
            this.game.textManager.setText("I cannot leave by foot, they will find me. Better take his car.");
          } else {
            this.game.textManager.setText("I need to fix this mess.");
          }
        } else {
          this.game.textManager.setText("I cannot leave him leave like that.");
        }
      } else if (this.game.inventory.isHolding('keys')) {
        this.game.sceneManager.change('transitionApartmentOut');
        this.game.soundManager.playSound('apartment-walking');
        this.game.textManager.setText(false);
      }
      return Door.__super__.mouseClick.apply(this, arguments);
    };

    Door.prototype.open = function() {
      this.game.inventory.reset();
      this.knockSoundVisual.stop();
      return this.scene.findElement('georgette').show();
    };

    Door.prototype.tick = function() {
      if (this.knockSoundVisual.knocking) {
        return this.knockSoundVisual.tick();
      }
    };

    Door.prototype.knock = function() {
      this.neighborVisited = true;
      return this.knockSoundVisual.start();
    };

    return Door;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.EntranceDrawer = (function(_super) {

    __extends(EntranceDrawer, _super);

    function EntranceDrawer() {
      EntranceDrawer.__super__.constructor.apply(this, arguments);
      this.opened = false;
    }

    EntranceDrawer.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        if (!this.opened) {
          this.game.soundManager.playSound('apartment-drawer');
          this.game.textManager.setText("It's empty.");
          return this.open();
        }
      } else {
        return EntranceDrawer.__super__.mouseClick.apply(this, arguments);
      }
    };

    EntranceDrawer.prototype.open = function() {
      return this.opened = true;
    };

    return EntranceDrawer;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Fridge = (function(_super) {

    __extends(Fridge, _super);

    function Fridge() {
      return Fridge.__super__.constructor.apply(this, arguments);
    }

    Fridge.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        this.game.textManager.setText("I'm not hungry.");
        return;
      }
      return Fridge.__super__.mouseClick.apply(this, arguments);
    };

    return Fridge;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.GeorgeCorpse = (function(_super) {

    __extends(GeorgeCorpse, _super);

    function GeorgeCorpse() {
      GeorgeCorpse.__super__.constructor.apply(this, arguments);
      this.searched = false;
    }

    GeorgeCorpse.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        this.game.textManager.setText(false);
        if (!this.searched) {
          this.game.textManager.setText("What's that?");
          this.search();
          return;
        }
      }
      if (this.game.inventory.isHolding('knife')) {
        this.game.textManager.setText("Not sure this is what the man needs right now...");
        return;
      }
      return GeorgeCorpse.__super__.mouseClick.apply(this, arguments);
    };

    GeorgeCorpse.prototype.search = function() {
      this.searched = true;
      return this.scene.findElement('businessCard').show();
    };

    return GeorgeCorpse;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Georgette = (function(_super) {

    __extends(Georgette, _super);

    function Georgette() {
      Georgette.__super__.constructor.apply(this, arguments);
      this.dead = false;
    }

    Georgette.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        if (this.dead) {
          this.game.textManager.setText("She will probably shut up now.");
          this.game.inventory.use(this);
          return;
        } else {
          this.game.textManager.setText("She saw too much, she will call the cops. Nobody will believe me.");
          return;
        }
      }
      if (this.game.inventory.isHolding('knife')) {
        if (!this.dead) {
          this.scene.findElement('knife').hide();
          this.game.textManager.setText("Sorry.");
          this.die();
        } else {
          this.game.textManager.setText("She is dead enough, I think.");
        }
        return;
      }
      if (this.game.inventory.isHolding('piggyBank')) {
        if (!this.dead) {
          this.scene.findElement('piggyBank').hide();
          this.game.textManager.setText("Sorry.");
          this.die();
        } else {
          this.game.textManager.setText("She is dead enough, I think.");
        }
        return;
      }
      return Georgette.__super__.mouseClick.apply(this, arguments);
    };

    Georgette.prototype.die = function() {
      this.dead = true;
      return this.game.inventory.reset();
    };

    return Georgette;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.GloveBox = (function(_super) {

    __extends(GloveBox, _super);

    function GloveBox() {
      return GloveBox.__super__.constructor.apply(this, arguments);
    }

    GloveBox.prototype.mouseClick = function() {
      return GloveBox.__super__.mouseClick.apply(this, arguments);
    };

    return GloveBox;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.GoldenHand = (function(_super) {

    __extends(GoldenHand, _super);

    function GoldenHand() {
      return GoldenHand.__super__.constructor.apply(this, arguments);
    }

    GoldenHand.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        this.game.textManager.setText("Shinny.");
      }
      return GoldenHand.__super__.mouseClick.apply(this, arguments);
    };

    return GoldenHand;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Keys = (function(_super) {

    __extends(Keys, _super);

    function Keys() {
      Keys.__super__.constructor.apply(this, arguments);
    }

    Keys.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        this.game.textManager.setText("His car keys.");
      }
      return Keys.__super__.mouseClick.apply(this, arguments);
    };

    return Keys;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.KitchenWindow = (function(_super) {

    __extends(KitchenWindow, _super);

    function KitchenWindow() {
      return KitchenWindow.__super__.constructor.apply(this, arguments);
    }

    KitchenWindow.prototype.mouseClick = function() {
      KitchenWindow.__super__.mouseClick.apply(this, arguments);
      return this.game.textManager.setText(["The night is dark.", "And full of terror.", "I read it somewhere."]);
    };

    return KitchenWindow;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Knife = (function(_super) {

    __extends(Knife, _super);

    function Knife() {
      Knife.__super__.constructor.apply(this, arguments);
      this.grabbed = false;
    }

    Knife.prototype.mouseClick = function() {
      var _this;
      _this = this;
      if (this.game.inventory.isHandFree()) {
        if (!this.grabbed) {
          this.grabbed = true;
          this.game.textManager.setText(["Did I just grab a weapon used in a crime?", "Am I really THAT dumb?", "Yes I am!"]).onTextRead(function() {
            return _this.scene.findElement('door').knock();
          });
        } else {
          this.game.inventory.use(this);
          return;
        }
      } else if (this.game.inventory.isHolding('george')) {
        this.game.textManager.setText("Well, even if I try really hard, it will not look like a suicide...");
        return;
      }
      return Knife.__super__.mouseClick.apply(this, arguments);
    };

    return Knife;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.KnockSound = (function(_super) {

    __extends(KnockSound, _super);

    function KnockSound() {
      KnockSound.__super__.constructor.apply(this, arguments);
      this.withSprite('background/knock1.png');
      this.state1 = GameAssets.getFrame('background/knock1.png');
      this.state2 = GameAssets.getFrame('background/knock2.png');
      this.knocking = false;
      this.delay = 10;
      this.sprite.visible = false;
      this.setX(-650).setY(-200);
      this.i = 0;
    }

    KnockSound.prototype.tick = function() {
      if (!this.knocking) {
        return;
      }
      this.sprite.visible = true;
      if (this.i === this.delay) {
        this.sprite.setTexture(this.state1);
        this.game.soundManager.playSound('apartment-knock');
      }
      if (this.i === this.delay * 2) {
        this.sprite.setTexture(this.state2);
      }
      if (this.i === this.delay * 3) {
        this.sprite.setTexture(this.state1);
      }
      if (this.i === this.delay * 4) {
        this.sprite.setTexture(this.state2);
        this.i = -this.delay;
      }
      return this.i++;
    };

    KnockSound.prototype.start = function() {
      this.knocking = true;
      return this.i = 0;
    };

    KnockSound.prototype.stop = function() {
      this.knocking = false;
      this.game.soundManager.stopSound();
      return this.hide();
    };

    return KnockSound;

  })(BaseElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Lighter = (function(_super) {

    __extends(Lighter, _super);

    function Lighter() {
      Lighter.__super__.constructor.apply(this, arguments);
    }

    Lighter.prototype.mouseClick = function() {
      return Lighter.__super__.mouseClick.apply(this, arguments);
    };

    return Lighter;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Painting = (function(_super) {

    __extends(Painting, _super);

    function Painting() {
      return Painting.__super__.constructor.apply(this, arguments);
    }

    Painting.prototype.mouseClick = function() {
      var texts;
      if (this.game.inventory.isHandFree()) {
        texts = ["What a fine piece of art.", "Nice touch."];
        this.game.textManager.setText(texts[0]);
      }
      return Painting.__super__.mouseClick.apply(this, arguments);
    };

    return Painting;

  })(SceneElement);

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
      if (this.game.inventory.isHandFree()) {
        if (this.scene.findElement('knife').grabbed) {
          this.game.textManager.setText("I have to clean this mess myself now...");
          return;
        } else {
          this.call911();
          return;
        }
      }
      return Phone.__super__.mouseClick.apply(this, arguments);
    };

    Phone.prototype.call911 = function() {
      return this.game.sceneManager.change('transition911');
    };

    return Phone;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.PiggyBank = (function(_super) {

    __extends(PiggyBank, _super);

    function PiggyBank() {
      return PiggyBank.__super__.constructor.apply(this, arguments);
    }

    PiggyBank.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        if (!this.scene.findElement('georgette').visible) {
          this.game.textManager.setText("A thrifty man.");
          this.game.inventory.use(this);
          return;
        }
      }
      return PiggyBank.__super__.mouseClick.apply(this, arguments);
    };

    return PiggyBank;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Plate = (function(_super) {

    __extends(Plate, _super);

    function Plate() {
      return Plate.__super__.constructor.apply(this, arguments);
    }

    Plate.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        this.game.textManager.setText("I'm not hungry.");
        return;
      }
      return Plate.__super__.mouseClick.apply(this, arguments);
    };

    return Plate;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Radio = (function(_super) {

    __extends(Radio, _super);

    function Radio() {
      return Radio.__super__.constructor.apply(this, arguments);
    }

    Radio.prototype.mouseClick = function() {
      Radio.__super__.mouseClick.apply(this, arguments);
      return this.scene.startBus();
    };

    return Radio;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.RearViewMirror = (function(_super) {

    __extends(RearViewMirror, _super);

    function RearViewMirror() {
      return RearViewMirror.__super__.constructor.apply(this, arguments);
    }

    RearViewMirror.prototype.mouseClick = function() {
      return RearViewMirror.__super__.mouseClick.apply(this, arguments);
    };

    return RearViewMirror;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Road = (function(_super) {

    __extends(Road, _super);

    function Road() {
      Road.__super__.constructor.apply(this, arguments);
      this.state1 = new BaseElement(this.game).withSprite('background/road1.png');
      this.state2 = new BaseElement(this.game).withSprite('background/road2.png');
      this.state2.visible = false;
      this.addChild(this.state1);
      this.addChild(this.state2);
      this.factor = 5;
    }

    Road.prototype.mouseClick = function() {
      return this.stop();
    };

    Road.prototype.slowDown = function() {
      return this.factor = 8;
    };

    Road.prototype.stop = function() {
      return this.stopped = true;
    };

    Road.prototype.tick = function() {
      Road.__super__.tick.apply(this, arguments);
      if (this.stopped) {
        return;
      }
      if (this.game.life % this.factor === 0) {
        this.state1.visible = !this.state1.visible;
        return this.state2.visible = !this.state2.visible;
      }
    };

    return Road;

  })(BaseElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Sink = (function(_super) {

    __extends(Sink, _super);

    function Sink() {
      return Sink.__super__.constructor.apply(this, arguments);
    }

    Sink.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        this.game.textManager.setText("Very neat.");
        return;
      }
      return Sink.__super__.mouseClick.apply(this, arguments);
    };

    return Sink;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.TrinketBowl = (function(_super) {

    __extends(TrinketBowl, _super);

    function TrinketBowl() {
      TrinketBowl.__super__.constructor.apply(this, arguments);
      this.searched = false;
    }

    TrinketBowl.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        if (!this.searched) {
          this.game.textManager.setText("A ligther, might be handy.");
          this.scene.findElement('lighter').show();
          this.search();
          return;
        }
        if (this.scene.onFire) {
          this.game.textManager.setText("Car keys, that's what I need.");
          this.scene.findElement("keys").show();
          return;
        }
      }
      return TrinketBowl.__super__.mouseClick.apply(this, arguments);
    };

    TrinketBowl.prototype.search = function() {
      return this.searched = true;
    };

    return TrinketBowl;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Umbrella = (function(_super) {

    __extends(Umbrella, _super);

    function Umbrella() {
      return Umbrella.__super__.constructor.apply(this, arguments);
    }

    Umbrella.prototype.mouseClick = function() {
      var texts;
      if (this.game.inventory.isHandFree()) {
        texts = ["It's useless inside.", "It's not raining outside."];
        this.game.textManager.setText(texts[0]);
      }
      return Umbrella.__super__.mouseClick.apply(this, arguments);
    };

    return Umbrella;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Wardrobe = (function(_super) {

    __extends(Wardrobe, _super);

    function Wardrobe() {
      Wardrobe.__super__.constructor.apply(this, arguments);
      this.opened = false;
      this.occupied = false;
      this.openedSprite = new BaseElement().withSprite('elements/apartment-wardrobe_open.png');
      this.openedSprite.setX(-20).setY(-200);
      this.openedSprite.hide();
      this.addChild(this.openedSprite);
    }

    Wardrobe.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        if (this.opened) {
          this.game.textManager.setText("Nothing interesting.");
        } else {
          this.open();
        }
        return;
      } else if (this.game.inventory.isHolding("george")) {
        if (!this.opened) {
          this.game.textManager.setText("I should probably check it out first.");
          return;
        }
        if (this.scene.findElement('georgette').dead) {
          this.hideCorpse();
          return;
        }
      } else if (this.game.inventory.isHolding("georgette")) {
        if (this.scene.findElement('georgette').dead) {
          if (!this.opened) {
            this.game.textManager.setText("I should probably check it out first.");
            return;
          }
          this.hideCorpse();
          return;
        }
      }
      return Wardrobe.__super__.mouseClick.apply(this, arguments);
    };

    Wardrobe.prototype.open = function() {
      this.opened = true;
      this.setText("Open Wardrobe");
      this.openedSprite.show();
      this.hitbox.setX(0).setY(-150).setWidth(200).setHeight(300);
      this.placeHelper().placeText();
      this.scene.findElement('wardrobeGoldenHand').show();
      return this.game.soundManager.playSound('apartment-wardrobe');
    };

    Wardrobe.prototype.close = function() {
      this.setText(this.defaultText);
      return this.scene.findElement("wardrobeGoldenHand").hide();
    };

    Wardrobe.prototype.hideCorpse = function() {
      this.occupied = true;
      this.game.inventory.useItem.hide();
      this.game.textManager.setText("This will buy me some time.");
      return this.close();
    };

    return Wardrobe;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Wheel = (function(_super) {

    __extends(Wheel, _super);

    function Wheel() {
      var amount, decal;
      Wheel.__super__.constructor.apply(this, arguments);
      this.zIndex = 2;
      this.withSprite('elements/wheel.png');
      this.pivot.x = this.getWidth() / 2;
      this.pivot.y = this.getHeight() / 2;
      this.i = 0;
      decal = Math.PI / 120;
      amount = 14;
      this.positions = [];
      this.insertPositions(amount, Math.PI * 2 - decal);
      this.insertPositions(amount, Math.PI * 2);
      this.insertPositions(amount, Math.PI * 2 - decal / 2);
      this.insertPositions(amount, Math.PI * 2);
      this.insertPositions(amount, Math.PI * 2);
      this.insertPositions(amount, Math.PI * 2 + decal / 2);
      this.insertPositions(amount, Math.PI * 2);
      this.insertPositions(amount, Math.PI * 2);
      this.insertPositions(amount, Math.PI * 2 + decal);
      this.insertPositions(amount, Math.PI * 2);
    }

    Wheel.prototype.insertPositions = function(amount, value) {
      var x, _i, _results;
      _results = [];
      for (x = _i = 0; 0 <= amount ? _i < amount : _i > amount; x = 0 <= amount ? ++_i : --_i) {
        _results.push(this.positions.push(value));
      }
      return _results;
    };

    Wheel.prototype.tick = function() {
      var angle, position;
      this.i++;
      position = this.i % this.positions.length;
      angle = this.positions[position];
      return this.rotation = angle;
    };

    return Wheel;

  })(BaseElement);

}).call(this);

(function() {

  this.Game = (function() {

    Game.WIDTH = 1280;

    Game.HEIGHT = 720;

    Game.DEV_ENV = true;

    Game.MUTE = true;

    function Game(container) {
      this.container = container;
      this.stage = new PIXI.Stage(0x000000, true);
      this.renderer = new PIXI.CanvasRenderer(Game.WIDTH, Game.HEIGHT);
      this.sceneManager = null;
      this.states = new GameStates();
      this.camera = null;
      this.textManager = null;
      this.inventory = new Inventory(this);
      this.interactionsManager = new InteractionsManager(this);
      this.life = 0;
    }

    Game.prototype.start = function() {
      this.container.appendChild(this.renderer.view);
      this.assets = new GameAssets(this);
      return this.soundManager = new GameSounds(this);
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

    Game.prototype.addChild = function(child) {
      this.stage.addChild(child);
      return this.sortLayouts();
    };

    Game.prototype.sortLayouts = function() {
      this.stage.children.sort(function(a, b) {
        if (a.zIndex < b.zIndex) {
          return -1;
        }
        if (a.zIndex > b.zIndex) {
          return 1;
        }
        return 0;
      });
      return this;
    };

    Game.prototype.setScene = function(scene) {
      return this.sceneManager.change(scene);
    };

    Game.prototype.setScale = function(s) {
      this.scene.setScale(s);
      return this.renderer.resize(Game.WIDTH * s, Game.HEIGHT * s);
    };

    Game.prototype.assetsReady = function() {
      this.ssets;
      this.sceneManager = new SceneManager(this);
      return this.textManager = new TextManager(this);
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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SceneCredits = (function(_super) {

    __extends(SceneCredits, _super);

    function SceneCredits() {
      var nameStyle, roleStyle, titleStyle;
      SceneCredits.__super__.constructor.apply(this, arguments);
      this.scroller = new BaseElement();
      titleStyle = {
        font: "70px Arial",
        fill: "white"
      };
      nameStyle = {
        font: "20px Arial",
        fill: "white",
        align: "right"
      };
      roleStyle = {
        font: "20px Arial",
        fill: "white"
      };
      this.scroller.addChild(new Text("Credits", titleStyle).setX(300));
      this.addChild(this.scroller);
    }

    return SceneCredits;

  })(Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SceneApartment = (function(_super) {

    __extends(SceneApartment, _super);

    function SceneApartment() {
      return SceneApartment.__super__.constructor.apply(this, arguments);
    }

    SceneApartment.prototype.start = function() {
      var _this;
      SceneApartment.__super__.start.apply(this, arguments);
      _this = this;
      return this.game.soundManager.playMusic('music-apartment-bonito_windchime');
    };

    SceneApartment.prototype.leaving = function() {
      SceneApartment.__super__.leaving.apply(this, arguments);
      return this.game.soundManager.stopMusic();
    };

    SceneApartment.prototype.lightFire = function() {
      this.onFire = true;
      this.game.inventory.reset();
      this.game.textManager.setText(["Ok, better leave this place now.", "Quick."]);
      return this.findElement('lighter').hide();
    };

    return SceneApartment;

  })(Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SceneCar = (function(_super) {

    __extends(SceneCar, _super);

    function SceneCar() {
      SceneCar.__super__.constructor.apply(this, arguments);
      this.game.soundManager.playMusic('music-car-arpeggio4');
      this.road = new Road(this.game);
      this.road.zIndex = 0;
      this.addChild(this.road);
      this.game.textManager.setText(false);
      this.wheel = new Wheel(this.game);
      this.wheel.setX(408).setY(310);
      this.addChild(this.wheel);
      this.bus = new Bus(this.game);
      this.addChild(this.bus);
    }

    SceneCar.prototype.start = function() {
      SceneCar.__super__.start.apply(this, arguments);
      return this.hideEmergencyControls();
    };

    SceneCar.prototype.startBus = function() {
      this.showEmergencyControls();
      return this.bus.start();
    };

    SceneCar.prototype.doEmergencyAction = function() {
      var _this;
      if (this.crashed) {
        return;
      }
      _this = this;
      this.crashed = true;
      this.game.soundManager.playSound('car-brake');
      return setTimeout(function() {
        return _this.game.soundManager.playSound('car-car_accident');
      }, 1000);
    };

    SceneCar.prototype.hideEmergencyControls = function() {
      this.findElement('turnLeft').hide();
      this.findElement('turnRight').hide();
      this.findElement('accelerate').hide();
      return this.findElement('brake').hide();
    };

    SceneCar.prototype.showEmergencyControls = function() {
      var element, _i, _len, _ref;
      _ref = this.elements.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        element.hide();
      }
      this.game.inventory.reset();
      this.findElement('turnLeft').show().showHelper();
      this.findElement('turnRight').show().showHelper();
      this.findElement('accelerate').show().showHelper();
      return this.findElement('brake').show().showHelper();
    };

    SceneCar.prototype.tick = function() {
      this.road.tick();
      this.bus.tick();
      return this.wheel.tick();
    };

    return SceneCar;

  })(Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SceneTransition911 = (function(_super) {

    __extends(SceneTransition911, _super);

    function SceneTransition911() {
      SceneTransition911.__super__.constructor.apply(this, arguments);
    }

    SceneTransition911.prototype.start = function() {
      var _this;
      SceneTransition911.__super__.start.apply(this, arguments);
      return _this = this;
    };

    return SceneTransition911;

  })(Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SceneTransitionApartement = (function(_super) {

    __extends(SceneTransitionApartement, _super);

    function SceneTransitionApartement() {
      SceneTransitionApartement.__super__.constructor.apply(this, arguments);
    }

    SceneTransitionApartement.prototype.start = function() {
      var _this;
      SceneTransitionApartement.__super__.start.apply(this, arguments);
      _this = this;
      if (Game.MUTE) {
        return _this.game.sceneManager.change('car');
      } else {
        return setTimeout(function() {
          _this.game.soundManager.playSound('car-car_starting');
          return setTimeout(function() {
            return _this.game.sceneManager.change('car');
          }, 6000);
        }, 2000);
      }
    };

    return SceneTransitionApartement;

  })(Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SceneTransitionCar = (function(_super) {

    __extends(SceneTransitionCar, _super);

    function SceneTransitionCar() {
      SceneTransitionCar.__super__.constructor.apply(this, arguments);
    }

    SceneTransitionCar.prototype.start = function() {
      var _this;
      SceneTransitionCar.__super__.start.apply(this, arguments);
      _this = this;
      return this.startRadioMsg();
    };

    SceneTransitionCar.prototype.startRadioMsg = function() {
      return this.playRadioLoop();
    };

    SceneTransitionCar.prototype.playRadioLoop = function() {
      var timer, _this;
      _this = this;
      _this.game.soundManager.playSound('car-radio');
      timer = 2000 + Math.random() * 7000;
      return setTimeout(function() {
        return _this.playRadioLoop();
      }, timer);
    };

    return SceneTransitionCar;

  })(Scene);

}).call(this);

(function() {

  this.GameAssets = (function() {

    GameAssets.ASSETS = false;

    GameAssets.ROOT = '/assets/';

    function GameAssets(game) {
      var _this;
      this.game = game;
      _this = this;
      this.sourceLoader = new PIXI.JsonLoader('/src/json/assets.json');
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
      this.sourceLoader = new PIXI.JsonLoader('/src/json/game.json');
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
            this.scene = this.transitioningTo;
            this.game.sortLayouts();
            this.scene.alpha = 0;
            return this.scene.show();
          }
        } else {
          this.scene = false;
          this.transitioningTo.alpha += step;
          if (this.transitioningTo.alpha >= 1) {
            this.scene = this.transitioningTo;
            this.game.sortLayouts();
            this.scene.setInteractive(true);
            this.scene.sortLayouts();
            this.scene.alpha = 1;
            return this.transitioningTo = false;
          }
        }
      }
    };

    SceneManager.prototype.change = function(sceneID) {
      var className, scene, sceneSource;
      if (this.scene) {
        this.scene.leaving();
      }
      this.game.soundManager.stopMusic();
      sceneSource = this.source[sceneID];
      if (!sceneSource) {
        return console.error('Invalid Scene id ', sceneID);
      }
      if (sceneSource.object) {
        className = 'Scene' + sceneSource.object;
        if (window[className]) {
          scene = new window[className](this.game, sceneSource);
        } else {
          console.error('Scene Class ', sceneSource.object, 'is not defined!');
        }
      } else {
        scene = new Scene(this.game, sceneSource);
      }
      this.game.addChild(scene);
      this.transitioningTo = scene;
      this.transitioningTo.alpha = 0;
      return this.transitioningTo.start();
    };

    return SceneManager;

  })();

}).call(this);

(function() {

  this.GameSounds = (function() {

    GameSounds.PATH = '/assets/audio/';

    function GameSounds(game) {
      var _this;
      this.sound = null;
      this.music = null;
      this.defaultFormats = ['mp3'];
      this.defaultOptions = {
        "formats": this.defaultFormats
      };
      _this = this;
      this.sourceLoader = new PIXI.JsonLoader('/src/json/assets.json');
      this.sourceLoader.on('loaded', function(event) {
        return _this.onRead(event.content.json);
      });
      this.sourceLoader.load();
    }

    GameSounds.prototype.onRead = function(json) {
      var path, _i, _len, _ref, _results;
      if (!json.sounds) {
        return;
      }
      _ref = json.sounds;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        _results.push(this.createSound(path));
      }
      return _results;
    };

    GameSounds.prototype.createSound = function(name) {
      return new buzz.sound(GameSounds.PATH + name, this.defaultOptions);
    };

    GameSounds.prototype.playSound = function(name, callback) {
      if (Game.MUTE) {
        return;
      }
      this.stopSound();
      delete this.sound;
      this.sound = this.createSound(name);
      if (callback) {
        this.sound.bind("ended", function() {
          return callback();
        });
      }
      return this.sound.play();
    };

    GameSounds.prototype.playMusic = function(name, callback) {
      if (Game.MUTE) {
        return;
      }
      this.stopMusic();
      delete this.music;
      this.music = this.createSound(name);
      if (callback) {
        this.music.bind("ended", function() {
          return callback();
        });
      }
      return this.music.fadeIn().loop().play();
    };

    GameSounds.prototype.stopSound = function() {
      if (this.sound) {
        return this.sound.stop();
      }
    };

    GameSounds.prototype.fadeOutSound = function() {
      if (this.sound) {
        return this.sound.fadeOut();
      }
    };

    GameSounds.prototype.stopMusic = function() {
      if (this.music) {
        return this.music.stop();
      }
    };

    GameSounds.prototype.fadeOutMusic = function() {
      if (this.music) {
        return this.music.fadeOut();
      }
    };

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

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.TextManager = (function(_super) {

    __extends(TextManager, _super);

    function TextManager(game) {
      TextManager.__super__.constructor.apply(this, arguments);
      this.game = game;
      this.zIndex = 99;
      this.onTextReadCallback = function() {};
      this.build();
    }

    TextManager.prototype.build = function() {
      var style;
      this.mask = new Sprite(GameAssets.getImage('abstract/textMask.png'));
      this.mask.alpha = 0.5;
      this.mask.height = Game.HEIGHT;
      this.mask.width = Game.WIDTH;
      this.addChild(this.mask);
      this.dialogBox = new BaseElement(this.game);
      this.addChild(this.dialogBox);
      this.background = new BaseElement(this.game).withSprite('abstract/textbox.png');
      this.dialogBox.addChild(this.background);
      this.dialogBox.setX((Game.WIDTH - this.background.getWidth()) / 2);
      this.dialogBox.setY(Game.HEIGHT - this.background.getHeight() - 60);
      style = {};
      this.texts = [];
      this.textHolder = new Text("", style);
      this.textHolder.setX(20).setY(20);
      this.textIterator = 0;
      this.setText(false);
      this.dialogBox.addChild(this.textHolder);
      this.game.addChild(this);
      return this.setInteractive(true);
    };

    TextManager.prototype.mouseClick = function() {
      TextManager.__super__.mouseClick.apply(this, arguments);
      return this.game.textManager.next();
    };

    TextManager.prototype.setText = function(t) {
      var texts;
      texts = [];
      if (t instanceof Array) {
        texts = t;
      }
      if (typeof t === "string") {
        texts = [t];
      }
      if (!(texts instanceof Array)) {
        return this.hide();
      }
      this.show();
      this.texts = texts;
      this.textIterator = 0;
      this.updateText();
      return this;
    };

    TextManager.prototype.next = function() {
      this.textIterator++;
      return this.updateText();
    };

    TextManager.prototype.hide = function() {
      TextManager.__super__.hide.apply(this, arguments);
      if (this.nextButton) {
        return this.nextButton.setInteractive(false);
      }
    };

    TextManager.prototype.show = function() {
      TextManager.__super__.show.apply(this, arguments);
      if (this.nextButton) {
        return this.nextButton.setInteractive(true);
      }
    };

    TextManager.prototype.onTextRead = function(f) {
      if (!f) {
        f = (function() {});
      }
      this.onTextReadCallback = f;
      return this;
    };

    TextManager.prototype.updateText = function() {
      var hasMoreText, text;
      if (this.textIterator >= this.texts.length) {
        this.textIterator = 0;
        if (this.onTextReadCallback) {
          this.onTextReadCallback();
        }
        this.onTextReadCallback = null;
        return this.hide();
      }
      text = this.texts[this.textIterator];
      hasMoreText = this.textIterator <= this.texts.length;
      if (this.nextButton) {
        if (hasMoreText) {
          this.nextButton.show();
        } else {
          this.nextButton.hide();
        }
      }
      this.textHolder.setText(text);
      return this;
    };

    return TextManager;

  })(BaseElement);

}).call(this);
