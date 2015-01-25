class @Couch extends SceneElement
  
  constructor: ->
    super
    @opened = false
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      @game.textManager.setText("Not exactly the best time to rest.")
      return
    
    
    else if @game.inventory.isHolding("lighter")
      if @scene.findElement('georgette').dead
        @scene.lightFire()
      else
        @game.textManager.setText("Why would I do that?")
      return

    
    else if @game.inventory.isHolding("knife")
      @game.textManager.setText("No need to cut it.")
      return
    #TODO?
    #   unless @opened
    #     @open()
    #     @game.textManager.setText("What is that?")
    #   return
    
    
    super
    
  open: ->
    @opened = true
    #DRUG VISIBLE