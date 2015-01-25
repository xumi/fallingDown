class @Carpet extends SceneElement
  
  constructor: ->
    super
    @occupied = false
    _this = @
    
    @sprite = new BaseElement().withSprite('elements/apartment-carpet_with_body.png')
    @sprite.hide()
    @addChild(@sprite)
    
    # setTimeout( (-> _this.hideCorpse()), 2000)  #DEBUG
      
  mouseClick: ->

    if @game.inventory.isHandFree()
      if @occupied
        @game.textManager.setText("That a pretty big burrito.")
        return
      else
        @game.textManager.setText("Perfectly clean.")
        

    # Disabled (depth size with flames)
    # else if @game.inventory.isHolding("lighter")
    #   if @scene.findElement('georgette').dead
    #     @scene.lightCarpet()
    #   else
    #     @game.textManager.setText("Why would I do that?")
    #   return
    

    else if @game.inventory.isHolding("lighter")
      if @scene.findElement('georgette').dead
        return super
      else
        @game.textManager.setText("Why would I do that?")
      return

    else if @game.inventory.isHolding("george")
      if @scene.findElement('georgette').dead
        @hideCorpse()
        return

    else if @game.inventory.isHolding("georgette")
      if @scene.findElement('georgette').dead
        @hideCorpse()
        return
      
    super
  
  hideCorpse: ->
    @occupied = true
    @game.inventory.useItem.hide().setInteractive(false)
    @game.inventory.reset()
    @sprite.show()
    @hitbox.setSize({"width": 480, "height": 100}).setPosition({"x":130, "y":50 })
    @placeHelper()
    @placeText()
    @game.textManager.setText("This is not very efficient.")
    #TODO: change sprite