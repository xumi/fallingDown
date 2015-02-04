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

    PIXIOverrideMixin.prototype.getSize = function(s) {
      return {
        "width": this.getWidth(),
        "height": this.getHeight()
      };
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

  this.Rectangle = (function(_super) {

    __extends(Rectangle, _super);

    function Rectangle() {
      PIXI.Rectangle.apply(this, arguments);
    }

    PIXIOverrideMixin.extending(Rectangle);

    Rectangle.prototype.getX = function() {
      return this.x;
    };

    Rectangle.prototype.getY = function() {
      return this.y;
    };

    Rectangle.prototype.setPosition = function(p) {
      this.x = p.x;
      this.y = p.y;
      return this;
    };

    return Rectangle;

  })(PIXI.Rectangle);

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
      this.rebind();
    }

    BaseElement.prototype.withSprite = function(path) {
      this.spritePath = path;
      return this.setSprite(new Sprite(GameAssets.getImage(path)));
    };

    BaseElement.prototype.setSprite = function(sprite) {
      this.sprite = sprite;
      this.addChild(this.sprite);
      return this;
    };

    BaseElement.prototype.tick = function() {};

    BaseElement.prototype.rebind = function() {
      var _this;
      _this = this;
      this.mouseover = function() {
        return _this.mouseOver();
      };
      this.mouseout = function() {
        return _this.mouseOut();
      };
      this.click = function() {
        return _this.mouseClick();
      };
      this.touchstart = function() {
        return _this.mouseOver();
      };
      this.touchend = function() {
        return _this.mouseOut();
      };
      this.touchendoutside = function() {
        return _this.mouseOut();
      };
      this.tap = function() {
        return _this.mouseClick();
      };
      return this;
    };

    BaseElement.prototype.setInteractive = function(state) {
      BaseElement.__super__.setInteractive.apply(this, arguments);
      return this;
    };

    BaseElement.prototype.mouseOver = function() {};

    BaseElement.prototype.mouseOut = function() {};

    BaseElement.prototype.mouseClick = function() {};

    BaseElement.prototype.setSize = function(size) {
      if (this.sprite) {
        this.sprite.setSize(size);
      }
      return BaseElement.__super__.setSize.apply(this, arguments);
    };

    BaseElement.prototype.getWidth = function() {
      if (this.sprite) {
        return this.sprite.getWidth();
      } else {
        return BaseElement.__super__.getWidth.apply(this, arguments);
      }
    };

    BaseElement.prototype.getHeight = function() {
      if (this.sprite) {
        return this.sprite.getHeight();
      } else {
        return BaseElement.__super__.getHeight.apply(this, arguments);
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

    BaseElement.prototype.sortLayouts = function() {
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
      this.addChild(this.eyeTop);
      this.addChild(this.eyeBottom);
      this.game.addChild(this);
      this.eyeTop.setY(-Game.HEIGHT);
      this.eyeBottom.setY(Game.HEIGHT);
      this.$State = false;
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
      if (this.game.sceneManager.scene.onFire) {
        return this.game.textManager.setText("No time for that, it's getting hot in here!");
      } else {
        return this.game.textManager.setText("Nothing to do here.");
      }
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
      var _this;
      if (!this.source.background) {
        return;
      }
      _this = this;
      this.background = new SceneBackground(this.game, this.source.background);
      return this.addChild(this.background);
    };

    Scene.prototype.loadElements = function() {
      var e, element, _i, _j, _len, _len1, _ref, _ref1, _results;
      if (!this.source.elements) {
        return;
      }
      this.addChild(this.elements);
      this.elements.zIndex = 3;
      _ref = this.source.elements;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        element = this.loadElement(e);
        element.setID(e.id);
        element.setScene(this);
        if (e.sprite) {
          element.withSprite(e.sprite);
        }
        if (e.hitbox) {
          element.withHitBox(e.hitbox);
        }
        if (e.hidden) {
          element.visible = false;
        }
        if (e.title) {
          element.setTitle(e.title);
        }
        if (e.title) {
          element.setDefaultText(e.title);
        }
        element.setPosition(e.position);
        this.elements.addChild(element);
      }
      _ref1 = this.elements.children;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        element = _ref1[_j];
        if (element.start) {
          _results.push(element.start());
        } else {
          _results.push(void 0);
        }
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
      Scene.__super__.sortLayouts.apply(this, arguments);
      this.elements.sortLayouts();
      return this;
    };

    return Scene;

  })(BaseElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SceneBackground = (function(_super) {

    __extends(SceneBackground, _super);

    function SceneBackground(game, backgroundPath) {
      SceneBackground.__super__.constructor.apply(this, arguments);
      this.withSprite(backgroundPath);
      this.setInteractive(true);
    }

    SceneBackground.prototype.mouseClick = function() {
      return this.game.inventory.reset();
    };

    return SceneBackground;

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
      _this = this;
      if (this.hitbox) {
        this.hitbox.buttonMode = state;
        this.hitbox.setInteractive(state);
      } else {
        SceneElement.__super__.setInteractive.apply(this, arguments);
      }
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

    SceneElement.prototype.withHitBox = function(options) {
      var _this;
      _this = this;
      this.hitbox = new BaseElement().withSprite('abstract/debug.png');
      this.addChild(this.hitbox);
      this.hitbox.alpha = Game.DEV_ENV ? 0.3 : 0;
      this.setHitBox(options);
      this.hitbox.setInteractive(true);
      this.hitbox.mouseOver = function() {
        return _this.mouseOver();
      };
      this.hitbox.mouseOut = function() {
        return _this.mouseOut();
      };
      this.hitbox.mouseClick = function() {
        return _this.mouseClick();
      };
      this.placeText();
      return this.placeHelper();
    };

    SceneElement.prototype.setHitBox = function(options) {
      if (!isNaN(options.width)) {
        this.hitbox.setWidth(options.width);
      }
      if (!isNaN(options.height)) {
        this.hitbox.setHeight(options.height);
      }
      if (!isNaN(options.x)) {
        this.hitbox.setX(options.x);
      }
      if (!isNaN(options.y)) {
        this.hitbox.setY(options.y);
      }
      this.placeHelper();
      this.placeText();
      return this;
    };

    SceneElement.prototype.addHelper = function() {
      if (!this.useHelper) {
        return;
      }
      this.helper = new BaseElement().withSprite('abstract/helper.png');
      this.addChild(this.helper);
      this.placeHelper();
      return this.helper.alpha = 0;
    };

    SceneElement.prototype.placeHelper = function() {
      if (!(this.hitbox && this.helper)) {
        return this;
      }
      this.helper.setX(this.hitbox.getX() + (this.hitbox.getWidth() / 2 - this.helper.getWidth() / 2));
      this.helper.setY(this.hitbox.getY());
      this.helper.zIndex = 2;
      this.sortLayouts();
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
      if (!(this.hitbox && this.currentText)) {
        return this;
      }
      this.currentText.setX(this.hitbox.getX() + (this.hitbox.getWidth() / 2 - this.currentText.getWidth() / 2));
      this.currentText.setY(this.hitbox.getY() - this.currentText.getHeight());
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
      if (this.hitbox && this.helper && this.hitbox.interactive) {
        this.showHelper();
      }
      if (this.hitbox && this.hitbox.interactive) {
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
      if (this.hitbox && this.helper && this.hitbox.interactive) {
        this.hideHelper();
      }
      if (this.hitbox && this.hitbox.interactive) {
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
      if (this.game.inventory.isHandFree()) {
        return this.game.inventory.use(this);
      } else {
        return this.game.interactionsManager.useOn(this);
      }
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
      this.zIndex = 1;
      this.sprite = new BaseElement().withSprite('elements/apartment-carpet_with_body.png');
      this.sprite.hide();
      this.addChild(this.sprite);
    }

    Carpet.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        if (this.occupied) {
          this.game.textManager.setText("That's a pretty big burrito.");
          return;
        } else {

        }
      } else if (this.game.inventory.isHolding('carpet')) {
        if (!this.occupied) {
          this.game.textManager.setText("Perfectly clean.");
          this.game.inventory.reset();
          return;
        }
      } else if (this.game.inventory.isHolding("lighter")) {
        if (this.scene.findElement('georgette').dead) {
          this.scene.lightCarpet();
        } else {
          this.game.textManager.setText("Why would I do that?");
        }
        return;
      } else if (this.game.inventory.isHolding("lighter")) {
        if (this.scene.findElement('georgette').dead) {
          return Carpet.__super__.mouseClick.apply(this, arguments);
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

    Carpet.prototype.hideCorpse = function(corpse) {
      if (this.occupied) {
        this.game.textManager.setText("It's ridiculous enough, I guess.");
        this.game.inventory.reset();
        return;
      }
      this.occupied = true;
      if (!corpse) {
        corpse = this.game.inventory.useItem;
      }
      if (corpse) {
        corpse.hide().setInteractive(false);
        corpse.addY(2000);
      }
      this.game.inventory.reset();
      this.sprite.show();
      this.setHitBox({
        "x": 130,
        "y": 80,
        "width": 480,
        "height": 70
      });
      this.placeHelper();
      this.placeText();
      this.game.textManager.setText("This is not very efficient.");
      return this.scene.sortLayouts();
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
          this.scene.lightCouch();
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
      if (this.scene.findElement('keys').visible) {
        this.game.sceneManager.change('transitionApartmentOut');
        this.game.soundManager.playSound('apartment-walking');
        return;
      }
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
      }
      return Door.__super__.mouseClick.apply(this, arguments);
    };

    Door.prototype.open = function() {
      this.game.inventory.reset();
      this.knockSoundVisual.stop();
      return this.scene.findElement('georgette').enter();
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
      this.zIndex = 5;
      this.searched = false;
      this.opened = false;
      this.openedSprite = new BaseElement().withSprite('elements/apartment-drawer_open.png');
      this.addChild(this.openedSprite);
      this.openedSprite.hide();
    }

    EntranceDrawer.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        if (!this.opened) {
          this.game.soundManager.playSound('apartment-drawer');
          if (!this.searched) {
            this.game.textManager.setText("It's empty.");
          }
          return this.open();
        } else {
          return this.close();
        }
      } else {
        return EntranceDrawer.__super__.mouseClick.apply(this, arguments);
      }
    };

    EntranceDrawer.prototype.open = function() {
      this.searched = true;
      this.openedSprite.show();
      return this.opened = true;
    };

    EntranceDrawer.prototype.close = function() {
      this.openedSprite.hide();
      return this.opened = false;
    };

    return EntranceDrawer;

  })(SceneElement);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Flame = (function(_super) {

    __extends(Flame, _super);

    function Flame() {
      Flame.__super__.constructor.apply(this, arguments);
      this.withSprite('elements/apartment-flame01.png');
      this.state1 = GameAssets.getFrame('elements/apartment-flame01.png');
      this.state2 = GameAssets.getFrame('elements/apartment-flame02.png');
      this.factor = 5;
      this.stateChanger = true;
    }

    Flame.prototype.tick = function() {
      if (this.game.life % this.factor === 0) {
        if (this.stateChanger) {
          this.sprite.setTexture(this.state1);
        }
        if (!this.stateChanger) {
          this.sprite.setTexture(this.state2);
        }
        return this.stateChanger = !this.stateChanger;
      }
    };

    return Flame;

  })(BaseElement);

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
      } else if (this.game.inventory.isHolding('carpet')) {
        if (this.scene.findElement('georgette').dead) {
          return this.scene.findElement('carpet').hideCorpse(this);
        }
      } else if (this.game.inventory.isHolding('george')) {
        this.game.textManager.setText("What happended ?!");
        this.game.inventory.reset();
        return;
      } else if (this.game.inventory.isHolding('knife')) {
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
      this.crazyTimeout = null;
      this.zIndex = 2;
      this.middle = 480;
      this.placed = false;
      this.stateNormal = new BaseElement(this.game).withSprite('elements/apartment-georgette.png');
      this.stateCrazy = new BaseElement(this.game).withSprite('elements/apartment-georgette-crazy-1.png');
      this.currentCrazyTexture = true;
      this.stateCrazy1 = GameAssets.getFrame('elements/apartment-georgette-crazy-1.png');
      this.stateCrazy2 = GameAssets.getFrame('elements/apartment-georgette-crazy-2.png');
      this.stateDeadFell = new BaseElement(this.game).withSprite('elements/apartment-georgette-dead-fell.png');
      this.stateDeadKnife = new BaseElement(this.game).withSprite('elements/apartment-georgette-dead-knife.png');
      this.stateDeadPiggied = new BaseElement(this.game).withSprite('elements/apartment-georgette-dead-piggied.png');
      this.addChild(this.stateNormal);
      this.addChild(this.stateCrazy.hide());
      this.addChild(this.stateDeadFell.hide());
      this.addChild(this.stateDeadKnife.hide());
      this.addChild(this.stateDeadPiggied.hide());
    }

    Georgette.prototype.start = function() {};

    Georgette.prototype.enter = function() {
      var _this;
      _this = this;
      return this.show();
    };

    Georgette.prototype.goCrazy = function() {
      this.crazy = true;
      return this.goMiddle();
    };

    Georgette.prototype.goMiddle = function() {
      this.setX(this.middle).setY(140);
      return this;
    };

    Georgette.prototype.tick = function() {
      Georgette.__super__.tick.apply(this, arguments);
      if (this.visible && !this.placed) {
        if (this.game.life % 20 === 0) {
          if (this.getX() < this.middle) {
            this.addX(20);
            this.addY(20);
          } else {
            this.placed = true;
            this.goCrazy();
          }
        }
      }
      if (this.crazy && !this.dead) {
        if (this.placed) {
          this.stateNormal.hide();
          this.stateCrazy.show();
          if (this.game.life % 10 === 0) {
            if (this.currentCrazyTexture) {
              this.stateCrazy.sprite.setTexture(this.stateCrazy1);
            } else {
              this.stateCrazy.sprite.setTexture(this.stateCrazy2);
            }
            return this.currentCrazyTexture = !this.currentCrazyTexture;
          }
        } else {

        }
      }
    };

    Georgette.prototype.die = function() {
      if (this.dead) {
        return this;
      }
      clearTimeout(this.crazyTimeout);
      this.dead = true;
      this.goMiddle();
      this.setY(280).setX(510);
      this.stateNormal.hide();
      this.stateCrazy.hide();
      if (this.game.inventory.isHolding('piggyBank')) {
        this.stateDeadPiggied.show();
        this.game.soundManager.playSound('apartment-piggy_bank_breaking');
      } else if (this.game.inventory.isHolding('knife')) {
        this.stateDeadKnife.show();
        this.game.soundManager.playSound('apartment-stabbing');
      } else {
        this.stateDeadFell.show();
        this.game.soundManager.playSound('apartment-fall');
      }
      this.setHitBox({
        "x": 0,
        "y": -10,
        "width": 240,
        "height": 90
      });
      return this.game.inventory.reset();
    };

    Georgette.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        if (this.dead) {
          this.game.inventory.use(this);
          return;
        } else {
          this.game.textManager.setText("She saw too much, she will call the cops. Nobody will believe me.");
          return;
        }
      } else if (this.game.inventory.isHolding('georgette')) {
        if (this.dead) {
          this.game.textManager.setText("She will probably shut up now.");
          this.game.inventory.reset();
          return;
        }
      } else if (this.game.inventory.isHolding('carpet')) {
        if (this.dead) {
          this.scene.findElement('carpet').hideCorpse(this);
        }
      } else if (this.game.inventory.isHolding('lighter')) {
        if (!this.dead) {
          this.game.textManager.setText("I don't want her to scream louder.");
          this.game.inventory.reset();
          return;
        }
      } else if (this.game.inventory.isHolding('knife')) {
        if (!this.dead) {
          this.scene.findElement('knife').hide();
          this.game.textManager.setText("Sorry.");
          this.die();
        } else {
          this.game.textManager.setText("She is dead enough, I think.");
        }
        return;
      } else if (this.game.inventory.isHolding('piggyBank')) {
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
      var _this;
      _this = this;
      if (this.game.inventory.isHandFree()) {
        this.game.textManager.onTextRead(function() {
          return _this.game.camera.blink();
        }).setText("Better focus on the road.");
        return;
      }
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
        this.game.inventory.use(this);
        return;
      } else if (this.game.inventory.isHolding('wardrobeGoldenHand')) {
        this.game.textManager.setText("Shiny.");
        this.game.inventory.reset();
        return;
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
        return this.game.inventory.use(this);
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
      if (this.scene.onFire) {
        KitchenWindow.__super__.mouseClick.apply(this, arguments);
      }
      if (this.game.inventory.isHandFree()) {
        this.game.textManager.setText(["The night is dark.", "And full of terror.", "I read it somewhere."]);
      } else if (this.game.inventory.isHolding("lighter")) {
        if (this.scene.findElement('georgette').dead) {
          this.scene.lightCurtains();
        } else {
          this.game.textManager.setText("Why would I do that?");
        }
        return;
      }
      return KitchenWindow.__super__.mouseClick.apply(this, arguments);
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
      if (this.game.inventory.isHandFree()) {
        return this.game.inventory.use(this);
      } else if (this.game.inventory.isHolding('lighter')) {
        if (this.scene.findElement('georgette').dead) {
          this.game.textManager.setText("Burn.");
        } else {
          this.game.textManager.setText("I don't smoke.");
        }
        this.game.inventory.reset();
        return;
      }
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
      if (this.game.inventory.isHandFree()) {
        this.game.inventory.use(this);
        return;
      } else if (this.game.inventory.isHolding('painting')) {
        this.game.textManager.setText("What a fine piece of art.");
        this.game.inventory.reset();
        return;
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
          this.game.inventory.use(this);
          return;
        }
      } else if (this.game.inventory.isHolding('piggyBank')) {
        this.game.textManager.setText("A thrifty man.");
        this.game.inventory.reset();
        return;
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
      var _this;
      _this = this;
      if (this.game.inventory.isHandFree()) {
        this.game.textManager.onTextRead(function() {
          return _this.game.camera.blink();
        }).setText("Better focus on the road.");
        return;
      }
      return Radio.__super__.mouseClick.apply(this, arguments);
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
      var _this;
      _this = this;
      if (this.game.inventory.isHandFree()) {
        this.game.textManager.onTextRead(function() {
          return _this.game.camera.blink();
        }).setText("Better focus on the road.");
        return;
      }
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
      this.searched = 0;
    }

    TrinketBowl.prototype.mouseClick = function() {
      if (this.game.inventory.isHandFree()) {
        if (this.searched === 0) {
          this.game.textManager.setText("A lighter, might be handy.");
          this.scene.findElement('lighter').show();
          this.searched = 1;
          return;
        }
        if (this.searched === 1 && this.scene.onFire) {
          this.game.textManager.setText("Car keys, that's what I need.");
          this.scene.findElement("keys").show();
          this.searched = 2;
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
      if (this.game.inventory.isHandFree()) {
        this.game.inventory.use(this);
        return;
      } else if (this.game.inventory.isHolding('umbrella')) {
        this.game.textManager.setText("It's useless inside.");
        this.game.inventory.reset();
        return;
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
        if (this.occupied) {
          this.game.textManager.setText("This will buy me some time.");
          return;
        } else {
          if (this.opened) {
            this.close();
          } else {
            this.open();
          }
          return;
        }
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
      if (this.occupied) {
        return this;
      }
      this.opened = true;
      this.openedSprite.show();
      this.setHitBox({
        "x": 0,
        "y": -150,
        "width": 200,
        "height": 300
      });
      this.placeHelper().placeText();
      this.scene.findElement('wardrobeGoldenHand').show().setInteractive(true);
      return this.game.soundManager.playSound('apartment-wardrobe');
    };

    Wardrobe.prototype.close = function() {
      this.openedSprite.hide();
      this.setHitBox({
        "x": 0,
        "y": 0,
        "width": 60,
        "height": 100
      });
      this.opened = false;
      return this.scene.findElement("wardrobeGoldenHand").hide().setInteractive(false);
    };

    Wardrobe.prototype.hideCorpse = function() {
      var corpse;
      this.occupied = true;
      corpse = this.game.inventory.useItem;
      corpse.hide().setInteractive(false);
      corpse.addY(2000);
      this.game.inventory.reset();
      this.close();
      return this.game.textManager.setText("This will buy me some time.");
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
      this.withSprite('elements/car-wheel.png');
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

  })(SceneElement);

}).call(this);

(function() {

  this.Game = (function() {

    Game.WIDTH = 1280;

    Game.HEIGHT = 720;

    Game.DEV_ENV = false;

    Game.MUTE = false;

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

    Game.prototype.addStartScreen = function() {
      this.startBackground = new BaseElement().withSprite('background/startscreen_loading.png');
      this.startBackground.setWidth(Game.WIDTH).setHeight(Game.HEIGHT);
      this.addChild(this.startBackground);
      requestAnimFrame(function() {});
      return this.renderer.render(this.stage);
    };

    Game.prototype.removeStartScreen = function() {
      return this.startBackground.hide();
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

    SceneApartment.prototype.lightCarpet = function() {
      this.elements.addChild(new Flame(this.game).setScale(0.5).setX(800).setY(305));
      this.elements.addChild(new Flame(this.game).setScale(0.3).setX(930).setY(340));
      this.elements.addChild(new Flame(this.game).setScale(0.2).setX(900).setY(350));
      this.sortLayouts();
      return this.lightFire();
    };

    SceneApartment.prototype.lightCurtains = function() {
      this.elements.addChild(new Flame(this.game).setScale(0.1).setX(920).setY(100));
      this.elements.addChild(new Flame(this.game).setScale(0.3).setX(923).setY(100));
      this.elements.addChild(new Flame(this.game).setScale(0.2).setX(922).setY(140));
      this.sortLayouts();
      return this.lightFire();
    };

    SceneApartment.prototype.lightCouch = function() {
      this.elements.addChild(new Flame(this.game).setScale(0.5).setX(600).setY(550));
      this.elements.addChild(new Flame(this.game).setScale(1).setX(600).setY(550));
      this.elements.addChild(new Flame(this.game).setScale(0.2).setX(530).setY(420));
      this.elements.addChild(new Flame(this.game).setScale(0.3).setX(470).setY(510));
      this.sortLayouts();
      return this.lightFire();
    };

    SceneApartment.prototype.tick = function() {
      var element, _i, _len, _ref, _results;
      SceneApartment.__super__.tick.apply(this, arguments);
      if (!this.onFire) {
        return;
      }
      _ref = this.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        if (element.tick) {
          _results.push(element.tick());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
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
      this.delayBus = 60 * 30;
      this.road = new Road(this.game);
      this.road.zIndex = 0;
      this.addChild(this.road);
      this.game.textManager.setText(false);
      this.wheel = new Wheel(this.game);
      this.wheel.setX(408).setY(310);
      this.addChild(this.wheel);
      this.bus = new Bus(this.game);
      this.addChild(this.bus);
      this.i = 0;
    }

    SceneCar.prototype.start = function() {
      var _this;
      SceneCar.__super__.start.apply(this, arguments);
      this.hideEmergencyControls();
      return _this = this;
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
      this.wheel.tick();
      if (!this.game.textManager.visible) {
        this.i++;
      }
      if (this.i === this.delayBus) {
        return this.startBus();
      }
    };

    return SceneCar;

  })(Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SceneCredits = (function(_super) {

    __extends(SceneCredits, _super);

    function SceneCredits() {
      SceneCredits.__super__.constructor.apply(this, arguments);
      this.sprite = new BaseElement().withSprite('background/credits.png');
      this.sprite.setWidth(Game.WIDTH).setHeight(Game.HEIGHT);
      this.addChild(this.sprite);
      this.game.soundManager.playMusic('credits-arpeggio5');
    }

    return SceneCredits;

  })(Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SceneStartScreen = (function(_super) {

    __extends(SceneStartScreen, _super);

    function SceneStartScreen() {
      var _this;
      SceneStartScreen.__super__.constructor.apply(this, arguments);
      this.sprite = new BaseElement().withSprite('background/startscreen.png');
      this.sprite.setWidth(Game.WIDTH).setHeight(Game.HEIGHT);
      this.addChild(this.sprite);
      _this = this;
      this.setInteractive(true);
      this.loading = false;
      this.buttonMode = true;
    }

    SceneStartScreen.prototype.mouseClick = function() {
      return this.game.sceneManager.change("apartment");
    };

    return SceneStartScreen;

  })(Scene);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SceneTransition911 = (function(_super) {

    __extends(SceneTransition911, _super);

    function SceneTransition911() {
      var _this;
      SceneTransition911.__super__.constructor.apply(this, arguments);
      this.sprite = new BaseElement().withSprite('background/phone_911.png');
      this.addChild(this.sprite);
      _this = this;
      this.setInteractive(true);
      this.loading = false;
    }

    SceneTransition911.prototype.mouseClick = function() {
      return this.game.sceneManager.change("credits");
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
      var _this;
      SceneTransitionCar.__super__.constructor.apply(this, arguments);
      this.sprite = new BaseElement().withSprite('background/radio_broken.png');
      this.addChild(this.sprite);
      this.game.soundManager.playMusic('car-radio');
      _this = this;
      setTimeout((function() {
        return _this.setInteractive(true);
      }), 2000);
    }

    SceneTransitionCar.prototype.mouseClick = function() {
      return this.game.sceneManager.change("credits");
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
      this.startBackground = new PIXI.AssetLoader([GameAssets.toPath('images', 'background/startscreen_loading.png')]);
      this.startBackground.onComplete = function() {
        _this.game.addStartScreen();
        return _this.sourceLoader.load();
      };
      this.startBackground.load();
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
      this.transitionStep = 0.01;
      this.transitionWay = false;
      this.transitionMask = new BaseElement().withSprite('abstract/mask.png');
      this.transitionMask.setWidth(Game.WIDTH);
      this.transitionMask.setHeight(Game.HEIGHT);
      this.transitionMask.zIndex = 100;
      this.transitionMask.alpha = 0;
      this.game.addChild(this.transitionMask);
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
      return this.change(this.source['default']);
    };

    SceneManager.prototype.tick = function() {
      if (this.scene) {
        this.scene.tick();
      }
      if (!this.transitioningTo) {
        return;
      }
      if (this.transitionWay === "appear") {
        if (this.transitionMask.alpha < 1) {
          this.transitionMask.alpha += this.transitionStep;
          if (this.transitionMask.alpha >= 1) {
            this.transitionMask.alpha = 1;
            this.disableScene(this.scene);
            this.scene = this.transitioningTo;
            this.scene.show().alpha = 1;
            this.transitionWay = "disappear";
            return this.game.removeStartScreen();
          }
        }
      } else if (this.transitionWay === "disappear") {
        this.transitionMask.alpha -= this.transitionStep;
        if (this.transitionMask.alpha <= 0) {
          this.transitionMask.alpha = 0;
          this.enableScene(this.scene);
          this.transitioningTo = false;
          return this.transitionWay = false;
        }
      }
    };

    SceneManager.prototype.disableScene = function(scene) {
      if (!scene) {
        return;
      }
      scene.hide().setInteractive(false);
      scene.setX(Game.WIDTH).setY(Game.HEIGHT);
      this.scene = false;
      return this.game.sortLayouts();
    };

    SceneManager.prototype.enableScene = function(scene) {
      this.scene = scene;
      this.scene.show();
      return this.scene.setInteractive(true);
    };

    SceneManager.prototype.change = function(sceneID) {
      var className, scene, sceneSource;
      this.game.inventory.reset();
      if (this.scene) {
        this.scene.setInteractive(false);
      }
      if (this.scene) {
        this.scene.leaving();
      }
      this.game.soundManager.stopMusic();
      this.game.inventory.reset();
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
      this.transitioningTo.start();
      return this.transitionWay = "appear";
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

    TextManager.prototype.onTextRead = function(f) {
      if (!f) {
        f = (function() {});
      }
      this.onTextReadCallback = f;
      return this;
    };

    TextManager.prototype.updateText = function() {
      var text;
      if (this.textIterator >= this.texts.length) {
        this.textIterator = 0;
        if (this.onTextReadCallback) {
          this.onTextReadCallback();
        }
        this.onTextReadCallback = null;
        return this.hide();
      }
      text = this.texts[this.textIterator];
      this.textHolder.setText(text);
      return this;
    };

    return TextManager;

  })(BaseElement);

}).call(this);
