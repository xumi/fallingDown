class @SceneApartment extends Scene
    
    
  start: ->
    super
    _this = @
    @game.soundManager.playMusic('music-apartment-bonito_windchime')
        
  leaving: ->
    super
    @game.soundManager.stopMusic()
    
  lightFire: ->
    @onFire = true
    @game.inventory.reset()
    @game.textManager.setText(["Ok, better leave this place now.", "Quick."])
    @findElement('lighter').hide()
  
  lightCarpet: ->
    @addChild( new Flame(@game).setScale(0.5).setX(700).setY(330) )
    @addChild( new Flame(@game).setScale(0.2).setX(900).setY(350) )
    element.zIndex = 3 for element in @children
    @sortLayouts()
    @lightFire()

  lightCouch: ->
    @addChild( new Flame(@game).setScale(0.5).setX(600).setY(550) )
    @addChild( new Flame(@game).setScale(1).setX(600).setY(550) )
    @addChild( new Flame(@game).setScale(0.2).setX(530).setY(420) )
    @addChild( new Flame(@game).setScale(0.3).setX(470).setY(510) )
    element.zIndex = 3 for element in @children
    @sortLayouts()
    @lightFire()
      
  tick: ->
    super
    return unless @onFire
    for element in @children
      element.tick() if element.tick
  