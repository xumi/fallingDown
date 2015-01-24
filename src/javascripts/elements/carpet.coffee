class @Carpet extends BaseElement
      
  mouseClick: ->
    super
    # @game.textManager.setText("Messy!")
    @game.sceneManager.change("car")