class @Georgette extends SceneElement
  
  constructor: ->
    super
    @dead = false
    @crazyTimeout = null
    @zIndex = 2
    
    @middle = 480
    @placed = false

    @stateNormal      = new BaseElement(@game).withSprite('elements/apartment-georgette.png')

    @stateCrazy      = new BaseElement(@game).withSprite('elements/apartment-georgette-crazy-1.png')    
    @currentCrazyTexture = true
    @stateCrazy1 = GameAssets.getFrame('elements/apartment-georgette-crazy-1.png')
    @stateCrazy2 = GameAssets.getFrame('elements/apartment-georgette-crazy-2.png')
    
    @stateDeadFell    = new BaseElement(@game).withSprite('elements/apartment-georgette-dead-fell.png')
    @stateDeadKnife   = new BaseElement(@game).withSprite('elements/apartment-georgette-dead-knife.png')
    @stateDeadPiggied = new BaseElement(@game).withSprite('elements/apartment-georgette-dead-piggied.png')

    
    @addChild(@stateNormal)
    @addChild(@stateCrazy.hide())
    @addChild(@stateDeadFell.hide())
    @addChild(@stateDeadKnife.hide())
    @addChild(@stateDeadPiggied.hide())
    
    
  start: ->
    # @show() #DEBUG
    # @enter() #DEBUG
    
  enter: ->
    _this = @
    @show()
    
  goCrazy: ->
    @crazy = true
    @goMiddle()
  
  goMiddle: ->
    @setX(@middle).setY(140)
    @
  
  tick: ->
    super
    if @visible and not @placed
      if @game.life % 20 is 0
        if @getX() < @middle
          @addX(20)
          @addY(20)
        else
          @placed = true
          @goCrazy()  
    
    if @crazy and not @dead
      
      if @placed
        @stateNormal.hide()
        @stateCrazy.show()
        if @game.life % 10 is 0
          if @currentCrazyTexture
            @stateCrazy.sprite.setTexture(@stateCrazy1)
          else
            @stateCrazy.sprite.setTexture(@stateCrazy2)
          @currentCrazyTexture = not @currentCrazyTexture
      
      else
        
      
        
  die: ->
    return @ if @dead
    clearTimeout(@crazyTimeout)
    @dead = true
    @goMiddle()
    @setY(280).setX(510)
    @stateNormal.hide()
    @stateCrazy.hide()
    if @game.inventory.isHolding('piggyBank')
      @stateDeadPiggied.show()
      @game.soundManager.playSound('apartment-piggy_bank_breaking')
    else if @game.inventory.isHolding('knife')
      @stateDeadKnife.show()
      @game.soundManager.playSound('apartment-stabbing')
    else
      @stateDeadFell.show()
      @game.soundManager.playSound('apartment-fall')
    @setHitBox({"x":0, "y":-10, "width":240, "height":90})
    @game.inventory.reset()
    
        

  mouseClick: ->
    
    if @game.inventory.isHandFree()
      if @dead
        @game.inventory.use(@)
        return
      else
        @game.textManager.setText("She saw too much, she will call the cops. Nobody will believe me.")
        return
      
    else if @game.inventory.isHolding('georgette')
      if @dead
        @game.textManager.setText("She will probably shut up now.")
        @game.inventory.reset()
        return

    else if @game.inventory.isHolding('carpet')
      @scene.findElement('carpet').hideCorpse(@) if @dead        
      
    else if @game.inventory.isHolding('lighter')
      unless @dead
        @game.textManager.setText("I don't want her to scream louder.") 
        @game.inventory.reset()
        return
    
    else if @game.inventory.isHolding('knife')
      unless @dead
        @scene.findElement('knife').hide()
        @game.textManager.setText("Sorry.")
        @die()
      else
        @game.textManager.setText("She is dead enough, I think.")
      return
      
    else if @game.inventory.isHolding('piggyBank')
      unless @dead
        @scene.findElement('piggyBank').hide()
        @game.textManager.setText("Sorry.")
        @die()
      else
        @game.textManager.setText("She is dead enough, I think.")
      return
    
    super
    
    
