class @TrinketBowl extends SceneElement
      
  constructor: ->
    super
    @searched = 0
      
  mouseClick: ->

    if @game.inventory.isHandFree()
      if @searched is 0
        # @game.soundManager.playSound('')
        @game.textManager.setText("A lighter, might be handy.")
        @scene.findElement('lighter').show()
        @searched = 1
        return
      if @searched is 1 and @scene.onFire
        @game.textManager.setText("Car keys, that's what I need.")
        @scene.findElement("keys").show()
        @searched = 2
        return
    
      
    super
    
  search: ->
    @searched = true