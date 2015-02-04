class @Camera extends BaseElement
  
  
  constructor: (game) ->
    super
    @zIndex = 98
    @eyeTop = new BaseElement().withSprite("camera/eye_top.png")
    @eyeBottom = new BaseElement().withSprite("camera/eye_bottom.png")
    @addChild(@eyeTop)
    @addChild(@eyeBottom)
    
    @game.addChild(@)
    @eyeTop.setY(-Game.HEIGHT)
    @eyeBottom.setY(Game.HEIGHT)
    
    @$State = false
    @blinkStep = 0
    @blinkGoalStep = 0
    @requiredBlink = 0
    
  tick: ->
    @animateBlink() if @blinkState    
      
  animateBlink: ->
    return unless @game.life % 4 == 0
    step = 80
    if @blinkState is 'closing'
      @randBlinkTime()
      @blinkStep++
      @eyeTop.addY(step)
      @eyeTop.setY(0) if @eyeTop.getY() >= 0
      @eyeBottom.addY(-step)
      @eyeBottom.setY(0) if @eyeBottom.getY() < 0
      if @eyeTop.getY() >= 0 and @blinkStep >= @blinkGoalStep
        @blinkState = 'opening'
        @blinkGoalStep = 0 
        @blinkStep = 0
    else
      @eyeBottom.addY(step)
      @eyeTop.addY(-step)
      if @eyeTop.getY() < -Game.HEIGHT # End of the animation
        @requiredBlink--
        if @requiredBlink <= 0 then @blinkState = false  else @blinkState = 'closing'
        
    
  blink: (amount) ->
    @requiredBlink = if isNaN(amount) then 1 else amount
    @blinkState = 'closing'
    @blinkStep = 0
    
  randBlinkTime: ->
    @blinkGoalStep = 5 + Math.random() * 30
