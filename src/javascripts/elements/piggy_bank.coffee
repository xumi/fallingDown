class @PiggyBank extends SceneElement
  
  constructor: ->
    super
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      unless @scene.findElement('georgette').visible
        @game.textManager.setText("A thrifty man.")
        return
    
    super
    