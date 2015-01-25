class @TextManager extends BaseElement
  
  constructor: (game) ->
    super
    @game = game
    @zIndex = 99
    
    @background = new BaseElement(@game).withSprite('abstract/textbox.png')
    @addChild(@background)
    @setX((Game.WIDTH - @background.getWidth()) / 2)
    @setY(Game.HEIGHT - @background.getHeight() - 60)
    @game.addChild(@)
    
    @onTextReadCallback = ->
    
    # @addNextButton()
    
    
    style = {}
    @texts = []
    @textHolder = new Text("", style)
    @textHolder.setX(20).setY(20)
    @textIterator = 0
    @setText(false)
    @addChild(@textHolder)
    
    
  addNextButton: ->  
    @nextButton = new BaseElement(@game)
    @nextButton.withSprite('abstract/text_next.png')
    @nextButton.noHelper()
    @addChild(@nextButton)
    @nextButton.setX(@background.getWidth() - @nextButton.getWidth() - 20)
    @nextButton.setY(@background.getHeight() - 20)
    _this = @
    @nextButton.setInteractive(true).mouseClick = -> _this.next()
  
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