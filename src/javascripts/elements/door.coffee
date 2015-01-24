class @Door extends BaseElement
  
  constructor: ->
    super
    @knockSoundVisual = new KnockSound(@game)
    @addChild(@knockSoundVisual)
    
      
  mouseClick: ->
    super
    
    if @game.inventory.isHandFree()
      if @neighborVisited
        
      else
        @game.textManager.setText("I cannot leave him leave that.")
    
    # return if @goingOut
    # @goingOut = true
    # @game.sceneManager.change('transitionApartmentOut')
    # if @game.inventory.isHandFree()
    # @knock()
    
  tick: ->
    @knockSoundVisual.tick()
    
  knock: ->
    @neighborVisited = true
    @knockSoundVisual.start()