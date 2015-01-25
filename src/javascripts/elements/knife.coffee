class @Knife extends SceneElement
      
  constructor: ->
    super
    @grabbed = false
    
    
  mouseClick: ->
    _this = @
    
    if @game.inventory.isHandFree()
      unless @grabbed
        @grabbed = true
        @game.textManager.setText([
          "Did I just grab a weapon used in a crime?",
          "Am I really THAT dumb?",
          "Yes I am!"
        ]).onTextRead( ->
          _this.scene.findElement('door').knock()
        )
      else
        @game.inventory.use(@)
        return
        

    else if @game.inventory.isHolding('george')
      @game.textManager.setText("Well, even if I try really hard, it will not look like a suicide...")
      return
      
    
    
    
    super
    