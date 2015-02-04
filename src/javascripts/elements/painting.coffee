class @Painting extends SceneElement
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      @game.inventory.use(@)
      return
  
    else if @game.inventory.isHolding('painting') # inspecting
      @game.textManager.setText("What a fine piece of art.")
      @game.inventory.reset()
      return
    
  
    super
    