class @Radio extends SceneElement
      
  mouseClick: ->

    _this = @
    if @game.inventory.isHandFree()
      @game.textManager.onTextRead( -> 
        _this.game.camera.blink()
      ).setText("Better focus on the road.")
      return

    super