class @Georgette extends SceneElement
  
  constructor: ->
    super
    @dead = false
      

  mouseClick: ->
    
    if @game.inventory.isHandFree()
      if @dead
        @game.textManager.setText("She will probably shut up now.")
      else
        @game.textManager.setText("She saw too much, she will call the cops. Nobody will believe me.")
        return
    
    #
    if @game.inventory.isHolding('knife')
      @scene.findElement('knife').hide()
      @game.textManager.setText("Sorry.")
      @die()
      return

    if @game.inventory.isHolding('piggyBank')
      @scene.findElement('piggyBank').hide()
      @game.textManager.setText("Sorry.")
      @die()
      return
    
    super
    
  die: ->
    @dead = true
    
