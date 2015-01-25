class @Lighter extends SceneElement
  
  constructor: ->
    super

  mouseClick: ->

    if @game.inventory.isHandFree()
      return @game.inventory.use(@)      
      
    super