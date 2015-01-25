class @Keys extends SceneElement
  
  constructor: ->
    super

  mouseClick: ->    
    
    if @game.inventory.isHandFree()
      @game.textManager.setText("His car keys.")
      return @game.inventory.use(@)
      
    super