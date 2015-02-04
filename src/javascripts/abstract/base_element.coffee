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
    @rebind()
  
        
  withSprite: (path) ->
    @spritePath = path
    @setSprite(new Sprite(GameAssets.getImage(path)))
    
  setSprite: (sprite) ->
    @sprite = sprite
    @addChild(@sprite)
    @
    
  tick: ->
    

  # ------------------------------------------------------------------------------------------
  # INTERACTIONS
  # ------------------------------------------------------------------------------------------
  
  rebind: ->
    _this = @
    @mouseover        = -> _this.mouseOver()
    @mouseout         = -> _this.mouseOut()
    @click            = -> _this.mouseClick()
    @touchstart       = -> _this.mouseOver()
    @touchend         = -> _this.mouseOut()
    @touchendoutside  = -> _this.mouseOut()
    @tap              = -> _this.mouseClick()
    @
  
  setInteractive: (state) ->
    super
    # @buttonMode = state
    @
    
  mouseOver:  ->
  mouseOut:   ->
  mouseClick: ->
    
  # ------------------------------------------------------------------------------------------
  # MISC
  # ------------------------------------------------------------------------------------------
  
  setSize: (size) ->
    @sprite.setSize(size) if @sprite
    super
    
  getWidth: -> if @sprite then @sprite.getWidth() else super
  getHeight: -> if @sprite then @sprite.getHeight() else super
  
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