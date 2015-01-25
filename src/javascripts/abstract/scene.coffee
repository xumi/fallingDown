class @Scene extends BaseElement
  
  
  constructor: (game, source) ->
    @zIndex = 0
    super
    @source           = source
    @backgrounds      = []
    @backgroundSpeed  = 1
    @elements         = new BaseElement()
    @musicName        = null
    @textColor        = "white"
    @textStroke       = "black"
    

  start: ->  
    @loadOptions()
    @loadMusic()
    @loadBackgrounds()
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
    
  loadBackgrounds: ->
    return unless @source.background
    _this = @
    bgs = if (@source.background instanceof Array) then @source.background else [@source.background]
    for bg in bgs
      background = new BaseElement(@game).withSprite(bg)
      @backgrounds.push(background)
    @backgroundSpeed = parseInt(@source.backgroundSpeed) if @source.backgroundSpeed
    @addChild(@backgrounds[0])
  
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
  
      