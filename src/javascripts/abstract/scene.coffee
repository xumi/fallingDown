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
    @background = new SceneBackground(@game, @source.background)
    @addChild(@background)
  
  loadElements: ->
    return unless @source.elements

    @addChild(@elements)
    @elements.zIndex = 3
    
    for e in @source.elements
      element = @loadElement(e)
      element.setID(e.id)
      element.setScene(@)
      element.withSprite(e.sprite)    if e.sprite
      element.withHitBox(e.hitbox)    if e.hitbox
      element.visible = false         if e.hidden
      element.setTitle(e.title)       if e.title
      element.setDefaultText(e.title) if e.title
      element.setPosition(e.position)
      @elements.addChild(element)
    
    for element in @elements.children
      element.start() if element.start
      
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
    super
    @elements.sortLayouts()
    @