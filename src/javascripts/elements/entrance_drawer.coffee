class @EntranceDrawer extends BaseElement
  
  constructor: ->
    super
    @opened = false
      
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      
      unless @opened
        @game.soundManager.playSound('apartment-drawer')
        @game.textManager.setText("It's empty.")
        @open()
    
    else
      super
  
  open: ->
    #TODO?
    @opened = true
    
    