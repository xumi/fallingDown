class @Door extends BaseElement
  
  constructor: ->
    super
    @knockSoundVisual = new KnockSound(@game)
    @addChild(@knockSoundVisual)
    
      
  mouseClick: ->
    super
    return if @goingOut
    # @goingOut = true
    # @game.sceneManager.change('transitionApartmentOut')
    
    @knock()
    
  tick: ->
    @knockSoundVisual.tick()
    
  knock: ->
    @knockSoundVisual.start()