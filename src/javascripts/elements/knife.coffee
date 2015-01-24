class @Knife extends BaseElement
      
  mouseClick: ->
    _this = @
    
    if @game.inventory.isHolding('george')
      @game.textManager.setText("Well, even if I try really hard, it will not look like a suicide...")
      return
      
    if @game.inventory.isHandFree()
      @game.textManager.setText([
        "Did I just grabbed a weapon used in a crime?",
        "Am I really THAT dumb?",
        "Yes I am!"
      ]).onTextRead( -> 
        _this.scene.findElement('door').knock()
      )
    
    
    super
    