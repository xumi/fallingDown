class @Wardrobe extends SceneElement
      
  constructor: ->
    super
    @opened = false
    @occupied = false
    @openedSprite = new BaseElement().withSprite('elements/apartment-wardrobe_open.png')
    @openedSprite.setX(-20).setY(-200)
    @openedSprite.hide()
    @addChild(@openedSprite)
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      if @occupied
        @game.textManager.setText("This will buy me some time.")
        return
      else 
        if @opened then @close() else @open()
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
    return @ if @occupied
    @opened = true
    @openedSprite.show()
    @setHitBox({"x":0, "y":-150, "width":200, "height":300})
    @placeHelper().placeText()
    @scene.findElement('wardrobeGoldenHand').show().setInteractive(true)
    @game.soundManager.playSound('apartment-wardrobe')
    
  close: ->
    @openedSprite.hide()
    @setHitBox({"x":0, "y":0, "width":60, "height":100})
    @opened = false
    @scene.findElement("wardrobeGoldenHand").hide().setInteractive(false)
  
  hideCorpse: ->
    @occupied = true
    corpse = @game.inventory.useItem
    corpse.hide().setInteractive(false)
    corpse.addY(2000) #crappy bug
    @game.inventory.reset()
    @close()
    @game.textManager.setText("This will buy me some time.")
    