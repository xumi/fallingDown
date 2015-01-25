class @BaseElement extends ObjectContainer

  constructor: (game) ->
    super
    @game         = game
    @zIndex       = 1
    @title        = "Something"
    @sprite       = null
    @scene        = null
    @id           = null
    @helper       = null
    @defaultText  = null
    @currentText  = null
    @textHolder   = null
    @clicked      = false
    @clickedState = 0
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
    @sprite.setInteractive(state) if @sprite
    if state
      @addHelper() if not @helper
      return unless @sprite
      @buttonMode = true
      @sprite.buttonMode = true
      @sprite.defaultCursor = "crosshair"
    else
      @buttonMode = false
      @sprite.buttonMode = false if @sprite
      @hideHelper()
      @hideText()
    @
    
  withHitBox: ->
    sprite = new Sprite(GameAssets.getImage('abstract/debug.png'))
    @setSprite(sprite)
    sprite.width = 20
    sprite.height = 20
    
    sprite.alpha = if Game.DEV_ENV then 0.3 else 0
    
  withSprite: (path) ->
    @setSprite(new Sprite(GameAssets.getImage(path)))
    
    
  setSprite: (sprite) ->
    @sprite = sprite
    @addChild(@sprite)
    _this = @
    @sprite.mouseover = -> _this.mouseOver()
    @sprite.mouseout  = -> _this.mouseOut()
    @sprite.click     = -> _this.mouseClick()
    @
    
    
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
    return unless @sprite
    @helper.setX(@sprite.width / 2 - @helper.width / 2)
    @helper.setY(- @helper.height / 2)
    
  showHelper: -> @helper.alpha = .8 if @helper
  hideHelper: -> @helper.alpha = 0 if @helper
  
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
    @currentText.setX(@sprite.width / 2 - @currentText.width / 2)
    @currentText.setY(- @currentText.height*1.5)
    @hideText()
    
  showText: -> @currentText.alpha = .9 if @currentText
  hideText: -> @currentText.alpha = 0 if @currentText
  
  # ------------------------------------------------------------------------------------------
  # INTERACTIONS
  # ------------------------------------------------------------------------------------------
    
  mouseOver:  ->
    @showHelper() if @sprite and @helper and @sprite.buttonMode
    @showText() if @sprite and @sprite.buttonMode
    @game.inventory.on(@)
    @over = true

  mouseOut:   ->
    @hideHelper() if @sprite and @helper and @sprite.buttonMode
    @hideText() if @sprite and @sprite.buttonMode
    
    @game.inventory.on(null)
    @over = false

  mouseClick: ->
    @clicked = true
    @game.interactionsManager.useOn(@)
    @game.inventory.use(@)
    
  
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