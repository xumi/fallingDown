class @Carpet extends BaseElement
      
  mouseClick: ->
    super
    # @game.textManager.setText("Messy!")
    @game.camera.blink()