class @Wardrobe extends BaseElement
      
  constructor: ->
    super
    @opened = false
    @occupied = false
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      unless @opened
        @open()
      return
    
    else if @game.inventory.isHolding("george")
      unless @opened
        @game.textManager.setText("I should probably check it out first.")
        return
        
      if @scene.findElement('georgette').dead
        @hideCorpse()
        return

    else if @game.inventory.isHolding("georgette")
      if @scene.findElement('georgette').dead
        unless @opened
          @game.textManager.setText("I should probably check it out first.")
          return
        @hideCorpse()
        return
    super
    
  open: ->
    @opened = true
    @scene.findElement('wardrobeGoldenHand').show()
    @game.soundManager.playSound('apartment-wardrobe')
    
  close: ->
    @scene.findElement("wardrobeGoldenHand").hide()  
  
  
  hideCorpse: ->
    @occupied = true
    @game.inventory.useItem.hide()
    @game.textManager.setText("This will buy me some time.")
    @close()
    #TODO: change sprite