class @SceneStartScreen extends Scene
    
  constructor: ->
    super
    
    @sprite = new BaseElement().withSprite('background/startscreen.png')
    @sprite.setWidth(Game.WIDTH).setHeight(Game.HEIGHT)
    @addChild(@sprite)
    _this = @
    @setInteractive(true)
    @loading = false

  mouseClick: ->
    @game.sceneManager.change("apartment")
      
    
  start: ->
    super
    _this = @