class @Flame extends BaseElement
      
  constructor: ->
    super
    
    @state1 = new BaseElement(@game).withSprite('elements/apartment-flame01.png')
    @state2 = new BaseElement(@game).withSprite('elements/apartment-flame02.png')
    @state2.visible = false
    @addChild(@state1)
    @addChild(@state2)
    @factor = 5
  
    
  tick: ->
    if @game.life % @factor is 0
      @state1.visible = not @state1.visible 
      @state2.visible = not @state2.visible 
    