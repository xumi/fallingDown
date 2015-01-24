class @TrinketBowl extends BaseElement
      
  mouseClick: ->

    
    if @game.inventory.isHandFree()
      @game.textManager.setText("Nothing.")
      
    super