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
    