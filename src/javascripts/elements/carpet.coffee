class @Carpet extends SceneElement
  
  constructor: ->
    super
    @occupied = false
      
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
    @game.inventory.useItem.hide()
    @game.textManager.setText("This is not very efficient.")
    #TODO: change sprite