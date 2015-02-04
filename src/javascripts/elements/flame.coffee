class @Flame extends BaseElement
      
  constructor: ->
    super
    
    @withSprite('elements/apartment-flame01.png')
    @state1 = GameAssets.getFrame('elements/apartment-flame01.png')
    @state2 = GameAssets.getFrame('elements/apartment-flame02.png')
    
    @factor = 5
    @stateChanger = true
  
    
  tick: ->
    if @game.life % @factor is 0
      @sprite.setTexture(@state1) if @stateChanger
      @sprite.setTexture(@state2) unless @stateChanger
      @stateChanger = not @stateChanger
    