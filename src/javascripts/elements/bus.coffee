class @Bus extends BaseElement
      
  constructor: ->
    super
    @zIndex = 1
    @withSprite('background/bus.png')
    @coming = false
    @delay = 10
    @sprite.visible = false
    @i = 0
    
  tick: ->
    return unless @coming
    @sprite.visible = true
    
    @setScale(0.1).setX((Game.WIDTH / 2) - 100  ).setY(-10) if @i is @delay * 0
    @setScale(0.2).setX((Game.WIDTH / 2) - 120  ).setY(-20) if @i is @delay * 1
    @setScale(0.5).setX((Game.WIDTH / 2) - 180  ).setY(-30) if @i is @delay * 2
    @setScale(0.7).setX((Game.WIDTH / 2) - 240  ).setY(-40) if @i is @delay * 3
    @setScale(0.9).setX((Game.WIDTH / 2) - 300  ).setY(-50) if @i is @delay * 4
    @setScale(1.2).setX((Game.WIDTH / 2) - 380  ).setY(-60) if @i is @delay * 5
    @setScale(1.5).setX((Game.WIDTH / 2) - 450  ).setY(-70) if @i is @delay * 6
    @setScale(1.8).setX((Game.WIDTH / 2) - 500  ).setY(-70) if @i is @delay * 7
    if @i is @delay * 8
      @setScale(1.8).setX((Game.WIDTH / 2) - 500  ).setY(-80) 
      @game.sceneManager.change('transitionCarOut')
    @i++
    
  leaving: ->
    @game.soundManager.stopMusic()

  start: ->
   @coming = true
   @game.soundManager.playSound('car-bus_horn')
   _this = @
   setTimeout( ->
     _this.scene.doEmergencyAction()
   ,1000)
   @i = 0