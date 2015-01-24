class @Painting extends BaseElement
      
  mouseClick: ->
    super
    @game.textManager.setText("What a fine piece of art.")