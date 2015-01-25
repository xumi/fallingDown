class @Georgette extends SceneElement
  
  constructor: ->
    super
    @dead = false
      

  mouseClick: ->
    
    if @game.inventory.isHandFree()
      if @dead
        @game.textManager.setText("She will probably shut up now.")
        @game.inventory.use(@)
        return
      else
        @game.textManager.setText("She saw too much, she will call the cops. Nobody will believe me.")
        return
    
    #
    if @game.inventory.isHolding('knife')
      unless @dead
        @scene.findElement('knife').hide()
        @game.textManager.setText("Sorry.")
        @die()
      else
        @game.textManager.setText("She is dead enough, I think.")
      return

    if @game.inventory.isHolding('piggyBank')
      unless @dead
        @scene.findElement('piggyBank').hide()
        @game.textManager.setText("Sorry.")
        @die()
      else
        @game.textManager.setText("She is dead enough, I think.")
      return
    
    super
    
  die: ->
    @dead = true
    @game.inventory.reset()
    
