class @PiggyBank extends BaseElement
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      unless @scene.findElement('georgette').visible
        @game.textManager.setText("A thrifty man.")
        return
    
    super
    