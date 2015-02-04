class @SceneStartScreen extends Scene
    
  constructor: ->
    super
    
    @sprite = new BaseElement().withSprite('background/startscreen.png')
    @sprite.setWidth(Game.WIDTH).setHeight(Game.HEIGHT)
    @addChild(@sprite)
    _this = @
    @setInteractive(true)
    @loading = false
    @buttonMode = true

  mouseClick: ->
    @game.sceneManager.change("apartment")