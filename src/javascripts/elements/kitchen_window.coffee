class @KitchenWindow extends SceneElement
      
  mouseClick: ->
    
    super if @scene.onFire
    
    if @game.inventory.isHandFree()
      @game.textManager.setText([
        "The night is dark.",
        "And full of terror.",
        "I read it somewhere."
      ])
    
    else if @game.inventory.isHolding("lighter")
      if @scene.findElement('georgette').dead
        @scene.lightCurtains()
      else
        @game.textManager.setText("Why would I do that?")
      return
      
    super
