class @Scene extends BaseElement
  
  
  constructor: (game, source) ->
    @zIndex = 0
    super
    @source           = source
    @background       = null
    @elements         = new BaseElement()
    @musicName        = null
    @textColor        = "white"
    @textStroke       = "black"
    

  start: ->  
    @loadOptions()
    @loadMusic()
    @loadBackground()
    @loadElements()
    # @game.soundManager.playMusic(@musicName) if @musicName
  
  leaving: ->
    @game.inventory.reset()
    @setInteractive(false)
    
  loadMusic: ->
    @musicName = @source.music if @source.music
    
  loadOptions: ->
    @textColor = @source.textColor if @source.textColor
  
  stateChanged: ->
    e.update() for e in @source.elements
    
  loadBackground: ->
    return unless @source.background
    _this = @
    bgs = if (@source.background instanceof Array) then @source.background else [@source.background]
    @background = new BaseElement(@game).withSprite(@source.background)
    @background.setInteractive(true)
    @background.mouseClick = -> 
      _this.game.inventory.reset()
    @backgroundSpeed = parseInt(@source.backgroundSpeed) if @source.backgroundSpeed
    @addChild(@background)
  
  loadElements: ->
    return unless @source.elements

    @addChild(@elements)
    @elements.zIndex = 3
    
    for e in @source.elements
      element = @loadElement(e)
      if e.sprite
        element.withSprite(e.sprite)
      if e.hitbox
        element.withHitBox(e.hitbox)
      element.setScene(@)
      element.setID(e.id)
      element.visible = false if e.hidden
      element.setTitle(e.title) if e.title
      element.setPosition(e.position)
      element.setDefaultText(e.title) if e.title
      @elements.addChild(element)
      
  setInteractive: (state) ->
    element.setInteractive(state) for element in @elements.children
    super
      
  loadElement: (e) ->
    if e.object 
      if window[e.object]
        element = new window[e.object](@game)
      else
        console.error('Element Class ', e.object, 'is not defined!')
    else # This is a generic object
      element = new SceneElement(@game)
      
    
  findElement: (id) ->
    found = null
    for element in @elements.children
      found = element if element.id is id
      break if found
    found
        
  tick: ->
    element.tick() for element in @elements.children
  
  addChild: (element) ->
    super
    element.setScene(@) if element.setScene
    @sortLayouts()
  
  sortLayouts: ->
    # return  #buggy, dafuq
    @children.sort((a,b) ->
      return -1 if (a.zIndex < b.zIndex)
      return 1 if (a.zIndex > b.zIndex)
      0
    )
    @
  
      