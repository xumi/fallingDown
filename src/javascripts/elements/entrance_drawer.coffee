class @EntranceDrawer extends BaseElement
      
  mouseClick: ->
    super
    @game.textManager.setText("Nothing.")
    @game.soundManager.playSound('apartment-drawer')