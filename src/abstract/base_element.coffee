class @BaseElement extends ObjectContainer

  constructor: (game) ->
    super
    @game         = game
    @sprite       = null
    @scene        = null
    @id           = null
    @helper       = null
    @defaultText  = null
    @currentText  = null
    @textContent  = null
    @clicked      = false
    @clickedState = 0

  start: ->
    console.log('started:', @)
    
  tick: ->
    @animateHelper()

  update: ->
      

    
  setInteractive: (state) ->
    super
    _this = @
    @sprite.setInteractive(true) if @sprite
    if state 
      @addHelper() if not @helper
      return unless @sprite
      @sprite.buttonMode = true
      @sprite.defaultCursor = "crosshair"
    else
      @sprite.buttonMode = false if @sprite
      @hideHelper()
      @hideText()
      
    
    
  withSprite: (path) ->
    @sprite = new Sprite(GameAssets.getImage(path))
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
    
  setText: (t) ->
    @textContent = t
    style = {font:"20px Arial", fill:@scene.textColor}
    if not @currentText
      @currentText = new Text(t, style) 
      @addChild(@currentText)
    @currentText.setText(@textContent)
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
    @over = true

  mouseOut:   ->
    @hideHelper() if @sprite and @helper and @sprite.buttonMode
    @hideText() if @sprite and @sprite.buttonMode
    @over = false

  mouseClick: ->
    @clicked = true
  
  # ------------------------------------------------------------------------------------------
  # MISC
  # ------------------------------------------------------------------------------------------
  
  hide: ->
    @visible = false
    @

  show: ->
    @visible = true
    @

  toggle: ->
    @visible = not @visible
    @
  
  setScene: (scene) ->
    @scene = scene
  
  setID: (id) ->
    @id = id