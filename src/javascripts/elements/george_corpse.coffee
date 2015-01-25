class @GeorgeCorpse extends SceneElement
  
  constructor: ->
    super
    @searched = false
      
  mouseClick: ->
    
    
    if @game.inventory.isHandFree()
      @game.textManager.setText(false)
      unless @searched
        @game.textManager.setText("What's that?")
        @search()
        return
      
    if @game.inventory.isHolding('knife')
      @game.textManager.setText("Not sure this is what the man needs right now...")
      return 
    
    
    super
    

  search: ->
    @searched = true
    @scene.findElement('businessCard').show()