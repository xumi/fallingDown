class @SceneApartment extends Scene
    
    
  start: ->
    super
    _this = @
    @game.soundManager.playMusic('music-apartment-bonito_windchime')
        
  leaving: ->
    super
    @game.soundManager.stopMusic()
    @game.soundManager.playSound('apartment-walking')