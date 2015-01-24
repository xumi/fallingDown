class @SceneCar extends Scene
  
  
  constructor: ->
    super
    @game.soundManager.playMusic('music-car')
    
    @road = new Road(@game)
    @road.zIndex = 0
    @addChild(@road)
    @game.textManager.setText(false)
    
    @wheel = new Wheel(@game)
    @wheel.setX(408).setY(310)
    @addChild(@wheel)
    
  start: ->
    super
    @hideEmergencyControls()
  
  hideEmergencyControls: ->
    @findElement('turnLeft').hide()
    @findElement('turnRight').hide()
    @findElement('accelerate').hide()
    @findElement('brake').hide()
    
  showEmergencyControls: ->
    element.hide() for element in @elements.children
    @game.inventory.reset()
    @findElement('turnLeft').show().showHelper()
    @findElement('turnRight').show().showHelper()
    @findElement('accelerate').show().showHelper()
    @findElement('brake').show().showHelper()
    
  tick: ->
    @road.tick()
    @wheel.tick()
    
