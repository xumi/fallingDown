class @GoldenHand extends SceneElement
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      @game.textManager.setText("Shiny.")
      @game.inventory.use(@)
    
    super
    