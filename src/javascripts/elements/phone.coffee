class @Phone extends BaseElement
      
  mouseClick: ->
    
    
    if @game.inventory.isHandFree()
      @game.textManager.setText("Hello")
      
    super