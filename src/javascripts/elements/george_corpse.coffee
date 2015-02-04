class @GeorgeCorpse extends SceneElement
  
  constructor: ->
    super
    @searched = false
      
  mouseClick: ->
    
    
    if @game.inventory.isHandFree()
      @game.textManager.setText(false)
      # unless @searched
      #   @game.textManager.setText("What's that?")
      #   @search()
      #   return
      
    else if @game.inventory.isHolding('carpet')
      if @scene.findElement('georgette').dead
         return @scene.findElement('carpet').hideCorpse(@) 
      
    else if @game.inventory.isHolding('george') # inspecting
      @game.textManager.setText("What happended ?!")
      @game.inventory.reset()
      return
    
    else if @game.inventory.isHolding('knife')
      @game.textManager.setText("Not sure this is what the man needs right now...")
      return 
    
    
    super
    

  search: ->
    @searched = true
    @scene.findElement('businessCard').show()