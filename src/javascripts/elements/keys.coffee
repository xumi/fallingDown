class @Keys extends BaseElement
  
  constructor: ->
    super

  mouseClick: ->    
    
    
    if @game.inventory.isHandFree()
      @game.textManager.setText("His car keys.")
      
    super