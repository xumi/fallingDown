class @Radio extends SceneElement
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      @game.textManager.setText("Better focus on the road.")
      return

    super