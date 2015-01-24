class @SceneCar extends Scene
  
  
  constructor: ->
    super
    @game.soundManager.playMusic('music-car')
    
  tick: ->
    # console.log('tick')
    
