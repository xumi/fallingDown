class @SceneCar extends Scene
  
  
  constructor: ->
    super
    @game.soundManager.playMusic('music-car')
    
    @road = new Road(@game)
    @road.zIndex = 0
    @addChild(@road)
    
    
  tick: ->
    @road.tick()
    
