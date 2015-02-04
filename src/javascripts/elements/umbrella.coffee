class @Umbrella extends SceneElement
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      @game.inventory.use(@)
      return
      
    else if @game.inventory.isHolding('umbrella') # inspecting
      @game.textManager.setText("It's useless inside.")
      @game.inventory.reset()
      return
      
    super
    