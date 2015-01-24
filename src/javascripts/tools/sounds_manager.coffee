class @GameSounds
  
  @PATH = '/assets/audio/'
  
  constructor: (game) ->
    @sound = null
    @music = null
    @defaultFormats = ['mp3']
    @defaultOptions = {"formats": @defaultFormats}

    _this = @
    @sourceLoader = new PIXI.JsonLoader('/src/json/assets.json')
    @sourceLoader.on('loaded', (event) -> _this.onRead(event.content.json))
    @sourceLoader.load()
    
  onRead: (json) ->
    return unless json.sounds
    @createSound(path) for path in json.sounds #crappy preload
    
  createSound: (name) ->
    new buzz.sound(GameSounds.PATH+name, @defaultOptions)
  
  playSound: (name, callback) ->
    return if Game.MUTE
    @stopSound()
    delete(@sound)
    @sound = @createSound(name)
    @sound.bind("ended", -> callback()) if callback
    @sound.play()
    
  playMusic: (name, callback) ->
    return if Game.MUTE
    @stopMusic()
    delete(@music)
    @music = @createSound(name)
    @music.bind("ended", -> callback()) if callback
    @music.fadeIn().loop().play()
    
  stopSound: ->
    @sound.stop() if @sound
    
  fadeOutSound: ->
    @sound.fadeOut() if @sound

  stopMusic: ->
    @music.stop() if @music
  
  fadeOutMusic: ->
    @music.fadeOut() if @music