class @GeorgeCorpse extends BaseElement
      
  mouseClick: ->
    
    
      
    if @game.inventory.isHolding('knife')
      @game.textManager.setText("Well, I don't think it need more!")
      return 
    
    if @game.inventory.isHandFree()
      @game.textManager.setText("Fuck... What can I do with that?")
    
    super
    
