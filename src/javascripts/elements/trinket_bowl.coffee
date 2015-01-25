class @TrinketBowl extends BaseElement
      
  constructor: ->
    super
    @searched = false 
      
  mouseClick: ->

    if @game.inventory.isHandFree()
      unless @searched
        # @game.soundManager.playSound('')
        @game.textManager.setText("A ligther, might be handy.")
        @scene.findElement('lighter').show()
        @search()
        return
      if @scene.onFire
        @game.textManager.setText("Car keys, that's what I need.")
        @scene.findElement("keys").show()
        return
    
      
    super
    
  search: ->
    @searched = true