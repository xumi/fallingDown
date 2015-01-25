class @EntranceDrawer extends SceneElement
  
  constructor: ->
    super
    @opened = false
    @openedSprite = new BaseElement().withSprite('elements/apartment-drawer_open.png')
    @addChild(@openedSprite)
    @openedSprite.hide()
    
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      unless @opened
        @game.soundManager.playSound('apartment-drawer')
        @game.textManager.setText("It's empty.")
        @open()
      else
        @close()
    
    else
      super
  
  open: ->
    #TODO?
    @openedSprite.show()
    @opened = true
    
  close: ->
    #TODO?
    @openedSprite.hide()
    @opened = false
    
    