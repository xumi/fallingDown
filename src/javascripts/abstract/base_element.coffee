class @BaseElement extends ObjectContainer

  constructor: (game) ->
    super
    @game         = game
    @zIndex       = 1
    @sprite       = null
    @scene        = null
    @id           = null
    @clicked      = false
    @clickedState = 0
        
  withSprite: (path) ->
    @setSprite(new Sprite(GameAssets.getImage(path)))
    
    
  setSprite: (sprite) ->
    @sprite = sprite
    @addChild(@sprite)
    _this = @
    @
    
  tick: ->
    

  # ------------------------------------------------------------------------------------------
  # INTERACTIONS
  # ------------------------------------------------------------------------------------------
  
  setInteractive: (state) ->
    super
    _this = @
    if state
      if @sprite
        @sprite.setInteractive(state)
        @sprite.mouseover = -> _this.mouseOver()
        @sprite.mouseout  = -> _this.mouseOut()
        @sprite.click     = -> _this.mouseClick()
      else
        @mouseover = -> _this.mouseOver()
        @mouseout  = -> _this.mouseOut()
        @click     = -> _this.mouseClick()
      @buttonMode = true
      @defaultCursor = "crosshair"
      if @sprite
        @sprite.buttonMode = true
        @sprite.defaultCursor = "crosshair"
    else
      @buttonMode = false
      @sprite.buttonMode = false if @sprite
    @
    
  mouseOver:  ->
  mouseOut:   ->
  mouseClick: ->
    
    
  
  # ------------------------------------------------------------------------------------------
  # MISC
  # ------------------------------------------------------------------------------------------
  
  setSize: (size) ->
    if @sprite
      @sprite.width = size.width
      @sprite.height = size.height
    else
      @width = size.width
      @height = size.height
    @
    
  
  getWidth: -> if @sprite then @sprite.width else @width
  getHeight: -> if @sprite then @sprite.height else @height
  
  hide: ->
    @visible = false
    @wasInteractive = @interactive
    @setInteractive(false)
    @

  show: ->
    @visible = true
    @setInteractive(true) if @wasInteractive
    @

  toggle: ->
    @visible = not @visible
    @
  
  setScene: (scene) ->
    @scene = scene
    
  setTitle: (title) ->
    @title = title
  
  setID: (id) ->
    @id = id