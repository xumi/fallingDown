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
      if @hitbox
        @hitbox.setInteractive(state)
        @hitbox.mouseover = -> _this.mouseOver()
        @hitbox.mouseout  = -> _this.mouseOut()
        @hitbox.click     = -> _this.mouseClick()
        @hitbox.buttonMode = true
        @hitbox.defaultCursor = "crosshair"
      else
        @mouseover = -> _this.mouseOver()
        @mouseout  = -> _this.mouseOut()
        @click     = -> _this.mouseClick()
        @buttonMode = true
        @defaultCursor = "crosshair"  
    else
      @buttonMode = false
      if @hitbox
        @hitbox.buttonMode = false
        @defaultCursor = "default"
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
  
  sortLayouts: ->
    @children.sort((a,b) ->
      return -1 if (a.zIndex < b.zIndex)
      return 1 if (a.zIndex > b.zIndex)
      0
    )
    @