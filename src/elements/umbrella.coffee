class @Umbrella extends BaseElement
      
  mouseClick: ->
    super
    @game.textManager.setText("It's not raining outside.")
