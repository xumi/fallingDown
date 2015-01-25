class @SceneTransition911 extends Scene
    
  constructor: ->
    super
    
    @sprite = new BaseElement().withSprite('background/phone_911.png')
    @addChild(@sprite)
    _this = @
    @setInteractive(true)
    @loading = false

  mouseClick: ->
    @game.sceneManager.change("credits")