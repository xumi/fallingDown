class @SceneTransitionApartement extends Scene
  
  
  constructor: ->
    super
    console.log('apartment object created')
    
  start: ->
    super
    _this = @
    setTimeout(->
      _this.game.soundManager.playSound('car-car_starting')
      setTimeout( -> 
        _this.game.sceneManager.change('car')
      , 6000 )
    , 2000)
    