class @SceneTransitionCar extends Scene
    
  constructor: ->
    super
    @sprite = new BaseElement().withSprite('background/radio_broken.png')
    @addChild(@sprite)
    @game.soundManager.playMusic('car-radio')
    _this = @
    setTimeout( (-> _this.setInteractive(true) ), 2000)

  mouseClick: ->
    @game.sceneManager.change("credits")