class @GameElement extends ObjectContainer

  constructor: (game) ->
    super
    @game         = game
    @sprite       = null
    @scene        = null
    @id           = null
    @helper       = null
    
    @clicked      = false
    @clickedState = 0

  start: ->
    console.log('started:', @)
    
  tick: ->

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
      
      
    
  setInteractive: (state) ->
    super
    _this = @
    @sprite.setInteractive(true) if @sprite
    @addHelper() if state and not @helper
    
  withSprite: (path) ->
    @sprite = new Sprite(GameAssets.getImage(path))
    @addChild(@sprite)
    _this = @
    @sprite.mouseover = -> _this.mouseOver()
    @sprite.mouseout  = -> _this.mouseOut()
    @sprite.click     = -> _this.mouseClick()
    @
    
  addHelper: ->
    @helper = new Sprite(GameAssets.getImage('abstract/helper.png'))
    @placeHelper()
    @helper.alpha = 0
    @addChild(@helper)
    
  placeHelper: ->
    @helper.setX(@sprite.width / 2 - @helper.width / 2)
    @helper.setY(- @helper.height / 2)
    
  showHelper: -> @helper.alpha = .8 if @helper
  hideHelper: -> @helper.alpha = 0 if @helper
  
  setScene: (scene) ->
    @scene = scene
    
  mouseOver:  ->
    @showHelper()

  mouseOut:   ->
    @hideHelper()

  mouseClick: ->
    @clicked = true
  
  addX: (dx) -> @setPosition(@position.x+dx, @position.y)
  addY: (dy) -> @setPosition(@position.x, @position.y+dy)
  
  setID: (id) ->
    @id = id
  
  setScale: (r) ->
    @scale.x = r
    @scale.y = r
    @    
    
  getPosition: (p) ->
    {
      x: @getX(),
      y: @getY()
    }

  setPosition: (p) ->
    @position.x = p.x
    @position.y = p.y
    @
    
  getX:       -> return @position.x
  getY:       -> return @position.y  
  setX: (x)   -> @setPosition({"x":x, "y":@getY()})
  setY: (y)   -> @setPosition({"x": @getX(), "y":y})