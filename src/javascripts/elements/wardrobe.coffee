class @Wardrobe extends BaseElement
      
  mouseClick: ->
    super
    @game.textManager.setText("No time for that!")
    @game.soundManager.playSound('apartment-wardrobe')