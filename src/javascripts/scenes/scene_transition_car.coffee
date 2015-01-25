class @SceneTransitionCar extends Scene
    
  constructor: ->
    super
    @sprite = new BaseElement().withSprite('background/radio_broken.png')
    @addChild(@sprite)
    @game.soundManager.playMusic('car-radio')
    @setInteractive(true)

  mouseClick: ->
    @game.sceneManager.change("credits")