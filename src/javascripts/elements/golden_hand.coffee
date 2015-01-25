class @GoldenHand extends BaseElement
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      @game.textManager.setText("Shinny.")

    
    super
    