class @Painting extends SceneElement
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      #ALTERNATIVE TEXT
      texts = ["What a fine piece of art.", "Nice touch."]
      @game.textManager.setText(texts[0])
    
    super
    