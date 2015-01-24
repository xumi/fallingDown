class @Road extends BaseElement
      
  constructor: ->
    super
    
    @state1 = new BaseElement(@game).withSprite('background/road1.png')
    @state2 = new BaseElement(@game).withSprite('background/road2.png')
    @state2.visible = false
    @addChild(@state1)
    @addChild(@state2)
    @factor = 3
    
  mouseClick: ->
    @stop()
  
  slowDown: -> @factor = 8
  stop: -> @stopped = true
    
  tick: ->
    super
    return if @stopped
    if @game.life%3 is 0
      @state1.visible = not @state1.visible
      @state2.visible = not @state2.visible