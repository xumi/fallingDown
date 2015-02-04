class @EntranceDrawer extends SceneElement
  
  constructor: ->
    super
    @zIndex = 5
    @searched = false
    @opened = false
    @openedSprite = new BaseElement().withSprite('elements/apartment-drawer_open.png')
    @addChild(@openedSprite)
    @openedSprite.hide()
    
  mouseClick: ->
    
    if @game.inventory.isHandFree()
      unless @opened
        @game.soundManager.playSound('apartment-drawer')        
        @game.textManager.setText("It's empty.") unless @searched
        @open()
      else
        @close()
    
    else
      super
  
  open: ->
    @searched = true
    @openedSprite.show()
    @opened = true
    
  close: ->
    @openedSprite.hide()
    @opened = false
    
    