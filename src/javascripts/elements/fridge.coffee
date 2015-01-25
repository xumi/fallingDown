class @Fridge extends SceneElement
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      @game.textManager.setText("I'm not hungry.")
      return
    
    super
