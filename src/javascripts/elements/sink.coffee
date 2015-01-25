class @Sink extends SceneElement
      
  mouseClick: ->

    if @game.inventory.isHandFree()
      @game.textManager.setText("Very neat.")
      return
    super