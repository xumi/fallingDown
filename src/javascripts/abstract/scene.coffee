class @Scene extends BaseElement
  
  
  constructor: (game, source) ->
    @zIndex = 0
    super
    @source           = source
    @backgrounds      = []
    @backgroundSpeed  = 1
    @elements         = []
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
    @setInteractive(false)
    
  loadMusic: ->
    @musicName = @source.music if @source.music
    
  loadOptions: ->
    @textColor = @source.textColor if @source.textColor
  
  stateChanged: ->
    e.update() for e in @source.elements
    
  loadBackgrounds: ->
    return unless @source.background
    bgs = if (@source.background instanceof Array) then @source.background else [@source.background]
    for bg in bgs
      @backgrounds.push(new Sprite(GameAssets.getImage(bg), Game.WIDTH, Game.HEIGHT))
    @backgroundSpeed = parseInt(@source.backgroundSpeed) if @source.backgroundSpeed
    @addChild(@backgrounds[0])
  
  loadElements: ->
    return unless @source.elements
    for e in @source.elements
      element = @loadElement(e)
      if e.sprite then element.withSprite(e.sprite) else element.withHitBox()
      element.setSize(e.size) if e.size
      element.setScene(@)
      element.setID(e.id)
      element.setPosition(e.position)
      element.setDefaultText(e.text) if e.text
      @elements.push(element)
      @addChild(element)
      
  setInteractive: (state) ->
    element.setInteractive(state) for element in @elements
    super
      
  loadElement: (e) ->
    if e.object 
      if window[e.object]
        element = new window[e.object](@game)
      else
        console.error('Element Class ', e.object, 'is not defined!')
    else # This is a generic object
      element = new BaseElement(@game)
      
    
  findElement: (id) ->
    found = null
    for element in @elements
      found = element if element.id is id
      break if found
    found
        
  tick: ->
    element.tick() for element in @elements

    # if @backgroundSpeed > 1 and @game.life % @backgroundSpeed is 0
      #console.log('change background')
    
      
      