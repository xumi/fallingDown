class @TextManager extends BaseElement
  
  constructor: (game) ->
    super
    @game = game
    @zIndex = 99
    @onTextReadCallback = ->
    @build()
    
  build: ->
    
    @mask = new Sprite(GameAssets.getImage('abstract/textMask.png'))
    @mask.alpha = 0.5
    @mask.height = Game.HEIGHT
    @mask.width = Game.WIDTH
    @addChild(@mask)
    
    @dialogBox = new BaseElement(@game)
    @addChild(@dialogBox)
        
    @background = new BaseElement(@game).withSprite('abstract/textbox.png')
    @dialogBox.addChild(@background)
    
    @dialogBox.setX((Game.WIDTH - @background.getWidth()) / 2)
    @dialogBox.setY(Game.HEIGHT - @background.getHeight() - 60)
    
    style = {}
    @texts = []
    @textHolder = new Text("", style)
    @textHolder.setX(20).setY(20)
    @textIterator = 0
    @setText(false)
    @dialogBox.addChild(@textHolder)
    
    @game.addChild(@)
    @setInteractive(true)
    
  
  mouseClick: ->
    super
    @game.textManager.next()
    @game.inventory.use(null)
  
  setText: (t) ->
    texts = []
    texts = t if t instanceof Array
    texts = [t] if typeof(t) is "string"
    return @hide() unless texts instanceof Array
    @show()
    @texts = texts
    @textIterator = 0
    @updateText()
    @
    
  next: ->
    @textIterator++
    @updateText()
    
  hide: ->
    super
    @nextButton.setInteractive(false) if @nextButton

  show: ->
    super
    @nextButton.setInteractive(true) if @nextButton
    
  onTextRead: (f) ->
    f = (->) if not f
    @onTextReadCallback = f
    @
  
  updateText: ->
    if @textIterator >= @texts.length
      @textIterator = 0
      @onTextReadCallback() if @onTextReadCallback
      @onTextReadCallback = null
      return @hide()
      
    text = @texts[@textIterator]
    hasMoreText = @textIterator <= @texts.length
    if @nextButton
      if hasMoreText then @nextButton.show() else @nextButton.hide()
    
    @textHolder.setText(text)
    @