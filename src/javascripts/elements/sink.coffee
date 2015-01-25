class @Sink extends BaseElement
      
  mouseClick: ->

    if @game.inventory.isHandFree()
      @game.textManager.setText("Very neat.")
      return
    super