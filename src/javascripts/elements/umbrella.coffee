class @Umbrella extends SceneElement
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      #ALTERNATIVE TEXT
      texts = ["It's useless inside.", "It's not raining outside."]
      @game.textManager.setText(texts[0])
      
    super
    