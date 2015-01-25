class @GoldenHand extends SceneElement
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      @game.textManager.setText("Shinny.")

    
    super
    