class @SceneTransitionApartement extends Scene
    
  constructor: ->
    super
    
  start: ->
    super
    _this = @
    if Game.MUTE
      _this.game.sceneManager.change('car')
    else
      setTimeout(->
        _this.game.soundManager.playSound('car-car_starting')
        setTimeout( -> 
          _this.game.sceneManager.change('car')
        , 6000 )
      , 2000)
    