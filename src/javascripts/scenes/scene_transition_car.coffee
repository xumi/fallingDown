class @SceneTransitionCar extends Scene
    
  constructor: ->
    super
    
  start: ->
    super
    _this = @
    
    @startRadioMsg() #DEBUG
    
    
    # unless Game.MUTE
    #   # setTimeout((-> _this.game.soundManager.playSound('car-radio')) , 3000 )
    #   setTimeout((-> _this.game.soundManager.playMusic('misc-heartbear_regular')) , 3000 )
    #   setTimeout((-> _this.startRadioMsg()) , 10000 )
    #
    # else
    #   console


  startRadioMsg: ->
    
    @playRadioLoop()

  playRadioLoop: ->
    _this = @
    _this.game.soundManager.playSound('car-radio')
    timer = 2000+Math.random()*7000 
    setTimeout(->
      _this.playRadioLoop()
    ,timer)
    
    
    