class @SceneCredits extends Scene
  
  constructor: ->
    super
    @sprite = new BaseElement().withSprite('background/credits.png')
    @sprite.setWidth(Game.WIDTH).setHeight(Game.HEIGHT)
    @addChild(@sprite)
    @game.soundManager.playMusic('credits-arpeggio5')