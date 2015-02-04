class @Lighter extends SceneElement
  
  constructor: ->
    super

  mouseClick: ->

    if @game.inventory.isHandFree()
      return @game.inventory.use(@)
      
    else if @game.inventory.isHolding('lighter') # inspecting
      if @scene.findElement('georgette').dead
        @game.textManager.setText("Burn.")
      else
        @game.textManager.setText("I don't smoke.")
      @game.inventory.reset()
      return
    
      
    super