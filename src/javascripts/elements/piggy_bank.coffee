class @PiggyBank extends SceneElement
        
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      unless @scene.findElement('georgette').visible
        @game.inventory.use(@)
        return
    
    else if @game.inventory.isHolding('piggyBank') # inspecting
      @game.textManager.setText("A thrifty man.")
      @game.inventory.reset()
      return
    
    super
    