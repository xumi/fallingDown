class @KnockSound extends BaseElement
      
  constructor: ->
    super
    @withSprite('background/knock1.png')
    @state1 = GameAssets.getFrame('background/knock1.png')
    @state2 = GameAssets.getFrame('background/knock2.png')
    @knocking = false
    @delay = 10
    @sprite.visible = false
    @setX(-650).setY(-200) # weird positioning
    
    @i = 0
    
  tick: ->
    return unless @knocking
    @sprite.visible = true
    if @i is @delay
      @sprite.setTexture(@state1)
      @game.soundManager.playSound('apartment-knock')
    @sprite.setTexture(@state2) if @i is @delay * 2
    @sprite.setTexture(@state1) if @i is @delay * 3
    if @i is @delay * 4
      @sprite.setTexture(@state2)
      @i = -@delay
    @i++

  start: ->
    @knocking = true
    @i = 0
   
  stop: ->
    @knocking = false
    @game.soundManager.stopSound()
    @hide()
    
   