class @Carpet extends SceneElement
  
  constructor: ->
    super
    @occupied = false
    _this = @
    # setTimeout( (-> _this.hideCorpse()), 500)  #DEBUG
      
  mouseClick: ->

    if @game.inventory.isHandFree()
      @game.textManager.setText("Perfectly clean.")

    else if @game.inventory.isHolding("lighter")
      if @scene.findElement('georgette').dead
        @scene.lightFire()
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
    # @game.inventory.useItem.hide()
    
    
    @scene.findElement('george').hide()
    @sprite = new BaseElement().withSprite('elements/apartment-carpet_with_body.png')
    @sprite.setX(-498).setY(-123)
    @addChild(@sprite)
    
    @game.textManager.setText("This is not very efficient.")
    #TODO: change sprite