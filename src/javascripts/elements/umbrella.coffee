class @Umbrella extends BaseElement
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      texts = ["It's useless inside."]
      @game.textManager.setText(texts[0])
      
    super
    