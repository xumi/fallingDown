class @SceneApartment extends Scene
    
  start: ->
    super
    _this = @
    @game.soundManager.playMusic('music-apartment-bonito_windchime')

    # @findElement('carpet').hideCorpse(@findElement('george')) #DEBUG
    # @lightCarpet()    #DEBUG    
    # @lightCurtains()  #DEBUG
    # @lightCouch()     #DEBUG
        
  leaving: ->
    super
    @game.soundManager.stopMusic()
    
  lightFire: ->
    @onFire = true
    @game.inventory.reset()
    @game.textManager.setText(["Ok, better leave this place now.", "Quick."])
    @findElement('lighter').hide()
  
  lightCarpet: ->
    @elements.addChild( new Flame(@game).setScale(0.5).setX(800).setY(305) )
    @elements.addChild( new Flame(@game).setScale(0.3).setX(930).setY(340) )
    @elements.addChild( new Flame(@game).setScale(0.2).setX(900).setY(350) )
    @sortLayouts()
    @lightFire()

  lightCurtains: ->
    @elements.addChild( new Flame(@game).setScale(0.1).setX(920).setY(100) )
    @elements.addChild( new Flame(@game).setScale(0.3).setX(923).setY(100) )
    @elements.addChild( new Flame(@game).setScale(0.2).setX(922).setY(140) )
    @sortLayouts()
    @lightFire()

  lightCouch: ->
    @elements.addChild( new Flame(@game).setScale(0.5).setX(600).setY(550) )
    @elements.addChild( new Flame(@game).setScale(1).setX(600).setY(550) )
    @elements.addChild( new Flame(@game).setScale(0.2).setX(530).setY(420) )
    @elements.addChild( new Flame(@game).setScale(0.3).setX(470).setY(510) )
    @sortLayouts()
    @lightFire()
      
  tick: ->
    super
    return unless @onFire
    for element in @children
      element.tick() if element.tick
  