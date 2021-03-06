class @SceneCar extends Scene
  
  
  constructor: ->
    super
    @game.soundManager.playMusic('music-car-arpeggio4')
    
    @delayBus = 60*30 # seconds
    
    @road = new Road(@game)
    @road.zIndex = 0
    @addChild(@road)
    @game.textManager.setText(false)
    
    @wheel = new Wheel(@game)
    @wheel.setX(408).setY(310)
    @addChild(@wheel)
    
    @bus = new Bus(@game)
    @addChild(@bus)
    
    @i = 0
    
  start: ->
    super
    @hideEmergencyControls()
    _this = @
    
  startBus: ->
    @showEmergencyControls()
    @bus.start()
  
  doEmergencyAction: ->
    return if @crashed
    _this = @
    @crashed = true
    @game.soundManager.playSound('car-brake')
    setTimeout( ->
      _this.game.soundManager.playSound('car-car_accident')      
    ,1000)
  
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
    @bus.tick()
    @wheel.tick()
    @i++ unless @game.textManager.visible
    if @i is @delayBus
      @startBus()
    
