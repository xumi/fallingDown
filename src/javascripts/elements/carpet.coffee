class @Carpet extends SceneElement
  
  constructor: ->
    super
    @occupied = false
    _this = @
    @zIndex = 1
    @sprite = new BaseElement().withSprite('elements/apartment-carpet_with_body.png')
    @sprite.hide()
    @addChild(@sprite)
      
  mouseClick: ->

    if @game.inventory.isHandFree()
      if @occupied
        @game.textManager.setText("That's a pretty big burrito.")
        return
      else
        
    else if @game.inventory.isHolding('carpet')
      unless @occupied
        @game.textManager.setText("Perfectly clean.")
        @game.inventory.reset()
        return
        
        
    else if @game.inventory.isHolding("lighter")
      if @scene.findElement('georgette').dead
        @scene.lightCarpet()
      else
        @game.textManager.setText("Why would I do that?")
      return
    

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
  
  hideCorpse: (corpse) ->
    if @occupied
      @game.textManager.setText("It's ridiculous enough, I guess.")
      @game.inventory.reset()
      return
    @occupied = true
    corpse = @game.inventory.useItem unless corpse
    if corpse
      corpse.hide().setInteractive(false)
      corpse.addY(2000) #crappy bug
    @game.inventory.reset()
    @sprite.show()
    @setHitBox({"x":130, "y":80, "width": 480, "height": 70 })
    @placeHelper()
    @placeText()
    @game.textManager.setText("This is not very efficient.")
    @scene.sortLayouts()