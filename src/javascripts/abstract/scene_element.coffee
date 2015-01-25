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
    super
    _this = @
    if state
      @addHelper() if not @helper
    else
      @hideHelper()
      @hideText()
    @
    
  withHitBox: (options) ->
    @hitbox = new Sprite(GameAssets.getImage('abstract/debug.png'))
    @addChild(@hitbox)
    @hitbox
    @hitbox.setSize(options)
    @hitbox.setX(options.x) if options.x
    @hitbox.setY(options.y) if options.y
    @placeText().placeHelper()
    @hitbox.alpha = if Game.DEV_ENV then 0.3 else 0
    
  # ------------------------------------------------------------------------------------------
  # HELPER
  # ------------------------------------------------------------------------------------------
  
  addHelper: ->
    return unless @useHelper
    @helper = new Sprite(GameAssets.getImage('abstract/helper.png'))
    @placeHelper()
    @helper.alpha = 0
    @addChild(@helper)
    
  placeHelper: ->
    return @ unless @hitbox and @helper
    @helper.setX(@hitbox.getX() + (@hitbox.width / 2 - @helper.width / 2))
    @helper.setY(@hitbox.getY() - @helper.height / 2)
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
      GameSounds.play('interactive') if @clickedState is 0
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
    return @ unless @currentText
    @currentText.setX(@hitbox.getX() + (@hitbox.width / 2 - @currentText.width / 2))
    @currentText.setY(@hitbox.getY() - @currentText.height*1.5)
    @
    
  showText: -> @currentText.alpha = .9 if @currentText
  hideText: -> @currentText.alpha = 0 if @currentText
  
  # ------------------------------------------------------------------------------------------
  # INTERACTIONS
  # ------------------------------------------------------------------------------------------
    
  mouseOver:  ->
    super
    return @hideHelper().hideText() if @game.textManager.visible 
    @showHelper() if @hitbox and @helper and @hitbox.buttonMode
    @showText() if @hitbox and @hitbox.buttonMode
    @game.inventory.on(@)
    @over = true

  mouseOut:   ->
    super
    return @hideHelper().hideText() if @game.textManager.visible
    @hideHelper() if @hitbox and @helper and @hitbox.buttonMode
    @hideText() if @hitbox and @hitbox.buttonMode
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