class @Georgette extends SceneElement
  
  constructor: ->
    super
    @dead = false
    @crazyTimeout = null
    
    @middle = 480
    @placed = false

    @stateNormal      = new BaseElement(@game).withSprite('elements/apartment-georgette.png')
    @stateCrazy1      = new BaseElement(@game).withSprite('elements/apartment-georgette-crazy-1.png')
    @stateCrazy2      = new BaseElement(@game).withSprite('elements/apartment-georgette-crazy-2.png')
    @stateDeadFell    = new BaseElement(@game).withSprite('elements/apartment-georgette-dead-fell.png')
    @stateDeadKnife   = new BaseElement(@game).withSprite('elements/apartment-georgette-dead-knife.png')
    @stateDeadPiggied = new BaseElement(@game).withSprite('elements/apartment-georgette-dead-piggied.png')

    
    @addChild(@stateNormal)
    @addChild(@stateCrazy1.hide())
    @addChild(@stateCrazy2.hide())
    @addChild(@stateDeadFell.hide())
    @addChild(@stateDeadKnife.hide())
    @addChild(@stateDeadPiggied.hide())
    
    
  start: ->
    @show()
    @enter()
    
  enter: ->
    _this = @
    @show()
    # @crazyTimeout = setTimeout( (-> _this.goCrazy()), 3000)
    
  goCrazy: ->
    @crazy = true
    @goMiddle()
  
  goMiddle: ->
    @setX(@middle).setY(140)
    @
  
  tick: ->
    super
    unless @placed
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
        @stateCrazy1.show()
        if @game.life % 10 is 0
          @stateCrazy1.toggle()
          @stateCrazy2.toggle()
      
      else
        
      
        
  die: ->
    return @ if @dead
    clearTimeout(@crazyTimeout)
    @dead = true
    @goMiddle()
    @addY(180).addX(50)
    @stateNormal.hide()
    @stateCrazy1.hide()
    @stateCrazy2.hide()
    if @game.inventory.isHolding('piggyBank')
      @stateDeadPiggied.show()
      @game.soundManager.playSound('apartment-piggy_bank_breaking')
    else if @game.inventory.isHolding('knife')
      @stateDeadKnife.show()
      @game.soundManager.playSound('apartment-stabbing')
    else
      @stateDeadFell.show()
      @game.soundManager.playSound('apartment-fall')
    @hitbox.setX(0).setY(-30).setWidth(240).setHeight(110)
    @game.inventory.reset()
    
        

  mouseClick: ->
    
    if @game.inventory.isHandFree()
      if @dead
        @game.textManager.setText("She will probably shut up now.")
        @game.inventory.use(@)
        return
      else
        @game.textManager.setText("She saw too much, she will call the cops. Nobody will believe me.")
        return
    
    #
    if @game.inventory.isHolding('knife')
      unless @dead
        @scene.findElement('knife').hide()
        @game.textManager.setText("Sorry.")
        @die()
      else
        @game.textManager.setText("She is dead enough, I think.")
      return

    if @game.inventory.isHolding('piggyBank')
      unless @dead
        @scene.findElement('piggyBank').hide()
        @game.textManager.setText("Sorry.")
        @die()
      else
        @game.textManager.setText("She is dead enough, I think.")
      return
    
    super
    
    
