class @SceneElement extends BaseElement

  constructor: (game) ->
    super
    @title
    @helper       = null
    @title        = "Something"
    @defaultText  = null
    @currentText  = null
    @textHolder   = null
    @useHelper    = true
    @usable       = true

  start: ->
    
  tick: ->
    @animateHelper()

  update: ->
  
  noHelper: ->
    @helper.hide() if @helper
    @helper = null
    @useHelper = false
    @

  setInteractive: (state) ->
    _this = @
    if @hitbox
      @hitbox.buttonMode = state
      @hitbox.setInteractive(state)
    else 
      super
    if state      
      @addHelper() if not @helper
    else
      @hideHelper()
      @hideText()
    @
    
  withHitBox: (options) ->
    _this = @
    @hitbox = new BaseElement().withSprite('abstract/debug.png')
    @addChild(@hitbox)
    @hitbox.alpha = if Game.DEV_ENV then 0.3 else 0
    @setHitBox(options)
    @hitbox.setInteractive(true)
    @hitbox.mouseOver        = -> _this.mouseOver()
    @hitbox.mouseOut         = -> _this.mouseOut()
    @hitbox.mouseClick       = -> _this.mouseClick()
    @placeText()
    @placeHelper()
      
  setHitBox: (options) ->
    @hitbox.setWidth(options.width)    unless isNaN(options.width)
    @hitbox.setHeight(options.height)  unless isNaN(options.height)
    @hitbox.setX(options.x)            unless isNaN(options.x)
    @hitbox.setY(options.y)            unless isNaN(options.y)
    @placeHelper()
    @placeText()
    @
    
  # ------------------------------------------------------------------------------------------
  # HELPER
  # ------------------------------------------------------------------------------------------
  
  addHelper: ->
    return unless @useHelper
    @helper = new BaseElement().withSprite('abstract/helper.png')
    @addChild(@helper)
    @placeHelper()
    @helper.alpha = 0
    
    
  placeHelper: ->
    return @ unless @hitbox and @helper
    @helper.setX(@hitbox.getX() + (@hitbox.getWidth() / 2 - @helper.getWidth() / 2))
    @helper.setY(@hitbox.getY())
    @helper.zIndex = 2
    @sortLayouts()
    @
    
  showHelper: ->
    @helper.alpha = .8 if @helper
    @
    
  hideHelper: ->
    @helper.alpha = 0 if @helper
    @
  
  animateHelper: ->
    if @clicked
      @clickedState++
      # GameSounds.play('interactive') if @clickedState is 0
      @helper.setScale(1.2) if @clickedState > 1
      @helper.setScale(1.3) if @clickedState > 2
      @helper.setScale(1.5)   if @clickedState > 3
      if @clickedState is 5
        @helper.setScale(1)
        @clickedState=0
        @clicked=false
      @placeHelper()
  
  # ------------------------------------------------------------------------------------------
  # TEXT
  # ------------------------------------------------------------------------------------------
    
  setDefaultText: (t) ->
    @defaultText = t
    @setText(@defaultText)
    
  setText: (t, style) ->
    @textHolder = t
    unless style
      style = {
        font: "20px Arial",
        fill: @scene.textColor,
        stroke: @scene.textStroke,
        strokeThickness: 7
      }
    if not @currentText
      @currentText = new Text(t, style) 
      @addChild(@currentText)
    @currentText.setText(@textHolder)
    @currentText.setStyle(style)
    @placeText()
    @hideText()
    
  placeText: ->
    return @ unless @hitbox and @currentText
    @currentText.setX(@hitbox.getX() + (@hitbox.getWidth() / 2 - @currentText.getWidth() / 2))
    @currentText.setY(@hitbox.getY() - @currentText.getHeight())
    @
    
  showText: -> @currentText.alpha = .9 if @currentText
  hideText: -> @currentText.alpha = 0 if @currentText
  
  # ------------------------------------------------------------------------------------------
  # INTERACTIONS
  # ------------------------------------------------------------------------------------------
    
  mouseOver:  ->
    super
    return @hideHelper().hideText() if @game.textManager.visible
    @showHelper() if @hitbox and @helper and @hitbox.interactive
    @showText() if @hitbox and @hitbox.interactive
    @game.inventory.on(@)
    @over = true

  mouseOut:   ->
    super
    return @hideHelper().hideText() if @game.textManager.visible
    @hideHelper() if @hitbox and @helper and @hitbox.interactive
    @hideText() if @hitbox and @hitbox.interactive
    @game.inventory.on(null)
    @over = false

  mouseClick: ->
    super
    return if @game.textManager.visible 
    @clicked = true
    if @game.inventory.isHandFree()
      @game.inventory.use(@)
    else
      @game.interactionsManager.useOn(@)
  
  # ------------------------------------------------------------------------------------------
  # MISC
  # ------------------------------------------------------------------------------------------
  
  setSize: (size) ->
    if @hitbox
      @hitbox.width = size.width
      @hitbox.height = size.height
    else
      super
    @
    
  
  # getWidth: -> if @sprite then @sprite.getWidth() else super
  # getHeight: -> if @sprite then @sprite.getHeight() else super
  
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