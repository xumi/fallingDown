class @PiggyBank extends SceneElement
        
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      unless @scene.findElement('georgette').visible
        @game.textManager.setText("A thrifty man.")
        @game.inventory.use(@)
        return
    
    super
    