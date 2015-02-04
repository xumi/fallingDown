class @GoldenHand extends SceneElement
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      @game.inventory.use(@)
      return
      
    else if @game.inventory.isHolding('wardrobeGoldenHand') # inspecting
      @game.textManager.setText("Shiny.")
      @game.inventory.reset()
      return
    
    
    super
    